class TopicsController < ApplicationController
  include GithubIssues

  def index
    # SyncGithubIssuesChannel.broadcast_to(
    #   User.find(9),
    #   title: 'New things!',
    #   body: 'All the news fit to print'
    # )
    # ActionCable.server.broadcast "test_9", { title: 'DHH', content: 'Rails is just swell' }

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
