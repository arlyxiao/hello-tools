class TopicsController < ApplicationController
  include GithubIssues

  def index
    Github::SyncIssuesJob.perform_later(page: 1)

    @issues = fetch_github_issues

    render json: @issues
  end
end
