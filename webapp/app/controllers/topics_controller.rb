class TopicsController < ApplicationController
  include GithubIssues

  def index
    query = Topic.order("created_at DESC")
    if params[:q].present?
      query = query.where("lower(title) LIKE ?", "%#{params[:q]}%")
    end

    @topics = query.page(params[:page])
  end

  def show
    @topic = Topic.find(params[:id])
  end
end
