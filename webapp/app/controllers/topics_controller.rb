class TopicsController < ApplicationController
  include GithubIssues

  def index
    @topics = Topic.order("created_at DESC").page params[:page]
  end

  def show
    @topic = Topic.find(params[:id])
  end
end
