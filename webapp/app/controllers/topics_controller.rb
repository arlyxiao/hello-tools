class TopicsController < ApplicationController
  include GithubIssues

  def index
    begin
      query = Topic.order("created_at DESC")
      if params[:q].present?
        query = query.where("lower(title) LIKE ?", "%#{params[:q]}%")
      end

      @topics = query.page(params[:page])
    rescue => e
      @topics = []
      Rails.logger.debug("Topics error: #{e}")
    end
  end

  def show
    @topic = Topic.find(params[:id])
  end
end
