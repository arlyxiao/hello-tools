class TopicsController < ApplicationController
  include GithubIssues

  def index
    @issues = Blog.all
  end

  def show
  end
end
