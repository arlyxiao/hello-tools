class TopicsController < ApplicationController
  include GithubIssues

  def index
    begin
      run_sync_when_page_load(current_user)

      @topics = Topic.search(query_text: params[:q], page: params[:page])
    rescue => e
      @topics = []
      Rails.logger.debug("Topics error: #{e}")
    end
  end

  def show
    run_sync_when_page_load(current_user)

    @topic = Topic.find_by(source_id: params[:id])
  end
end
