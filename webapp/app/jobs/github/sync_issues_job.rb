module Github

  class SyncIssuesJob < ApplicationJob
    queue_as :default
  
    def perform(user:, repo:, page:)
      page ||= 1
      token = user.github_token

      while true
        data = GithubIssue.where(
          repo: repo,
          page: page
        )

        if data.exists?
          p 'Before update new issue'
          # return if Time.now - data.first.updated_at < 30.minutes

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

      ActiveRecord::Base.connection.execute("Delete from topics")
      GithubIssue.all.map do |page|
        issue_data = JSON.parse(page.json_data)
        issue_data.each do |issue|
          Topic.create(
            user: user,
            repo: repo,
            title: issue['title'],
            content: issue['body'],
            created_at: issue['created_at']
          )
        end
      end

    end
  end

end
