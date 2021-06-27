class TopicsController < ApplicationController
  include GithubIssues

  def index
    begin
      @topics = Topic.search(
        query_text: params[:q],
        page: params[:page]
      )
    rescue => e
      @topics = []
      Rails.logger.debug("Topics error: #{e}")
    end
  end

  def show
    @topic = Topic.find_by(source_id: params[:id])
  end
end
