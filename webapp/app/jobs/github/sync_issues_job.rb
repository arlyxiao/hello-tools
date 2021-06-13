module Github

  class SyncIssuesJob < ApplicationJob
    queue_as :default
  
    def perform(repo:, page:)
      page ||= 1

      while true
        data = GithubIssue.where(repo: repo, page: page)

        if data.exists?
          p 'Before update new issue'
          # return if Time.now - data.first.updated_at < 30.minutes

          p 'Try to fetch...'
          issues = GithubServices::FetchIssues.new(page: page).call

          if issues.blank?
            return
          end

          p 'Update issues:'
          current_issue = data.first
          current_issue.json_data = issues
          current_issue.save
        else

          issues = GithubServices::FetchIssues.new(page: page).call

          if issues.blank?
            return
          end

          GithubIssue.find_or_initialize_by(repo: repo, page: page).tap do |issue|
            issue.json_data = issues
            issue.save
          end
        end

        p "#{repo} page #{page} synced done"

        page += 1
      end
    end
  end

end
