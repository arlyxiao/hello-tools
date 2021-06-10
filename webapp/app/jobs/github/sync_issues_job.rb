module Github

  class SyncIssuesJob < ApplicationJob
    queue_as :default
  
    def perform(page:)
      page ||= 1

      while true
        issues = GithubServices::FetchIssues.new(page: page).call

        if issues.blank?
          # Github::SyncIssuesJob.set(wait: 2.hours).perform_later(page: 1)
          return
        end

        GithubIssue.find_or_initialize_by(page: page).tap do |issue|
          issue.json_data = issues
          issue.save
        end

        p "page #{page} synced done"

        page += 1
      end

      # Github::SyncIssuesJob.set(wait: 2.hours).perform_later(page: 1)
    end
  end

end
