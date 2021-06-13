class TopicsController < ApplicationController
  include GithubIssues

  def index
    @topics = Topic.order(:id).page params[:page]
  end

  def show
    @topic = Topic.find(params[:id])
  end
end
