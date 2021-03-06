module Github

  class SyncIssuesJob < ApplicationJob
    queue_as :default

    def perform(user:, repo:, page: 1)
      begin
        sync_on_github_issues(
          user: user,
          repo: repo,
          page: page
        )

        sync_on_topics(
          user: user,
          repo: repo
        )

        notify_client(user)
      rescue => e
        Rails.logger.debug("Sync error: #{e}")
      end
    end


    private

    def sync_on_github_issues(user:, repo:, page:)
      page ||= 1
      token = user.github_token

      while true
        data = GithubIssue.where(
          repo: repo,
          page: page
        )

        if data.exists?
          p 'Try to fetch...'
          issues = GithubServices::FetchIssues.new(
            token: token,
            repo: repo,
            page: page
          ).call

          if issues.blank?
            break
          end

          p 'Update issues:'
          current_issue = data.first
          current_issue.user = user
          current_issue.json_data = issues
          current_issue.save
        else
          issues = GithubServices::FetchIssues.new(
            token: token,
            repo: repo,
            page: page
          ).call

          if issues.blank?
            break
          end

          GithubIssue.find_or_initialize_by(repo: repo, page: page).tap do |issue|
            issue.user = user
            issue.json_data = issues
            issue.save
          end
        end

        p "#{repo} page #{page} synced done"

        page += 1
      end
    end

    def sync_on_topics(user:, repo:)
      # ActiveRecord::Base.connection.execute("Delete from topics")
      GithubIssue.where(repo: repo).map do |page|
        p 'Push to topics'
        issue_data = JSON.parse(page.json_data)
        issue_data.each do |issue|
          Topic.find_or_initialize_by(source_id: issue['id']).tap do |topic|
            topic.user = user
            topic.repo = repo
            topic.title = issue['title']
            topic.content = issue['body']
            topic.label_text = issue['labels'].map { |label| label['name'] }.join(', ')
            topic.created_at = issue['created_at']
            topic.updated_at = Time.now
            topic.save
          end
        end
      end
    end

    def notify_client(user)
      SyncGithubIssuesChannel.broadcast_to(
        user,
        done: true
      )
    end

  end

end
