class TopicsController < ApplicationController
  include GithubIssues

  def index
    @issues = fetch_github_issues

    render json: @issues
  end
end
