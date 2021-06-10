class TopicsController < ApplicationController
  include GithubIssues

  @@sync_count = 0

  def index
    if @@sync_count < 100
      @@sync_count += 1
      Github::SyncIssuesJob.perform_later(page: 1)
    end

    @issues = fetch_github_issues

    render json: @@sync_count
  end
end
