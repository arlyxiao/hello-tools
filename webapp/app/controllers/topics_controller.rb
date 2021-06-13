class TopicsController < ApplicationController
  include GithubIssues

  def index
    @topics = Topic.order(:id).page params[:page]
  end

  def show
    @markdown = Redcarpet::Markdown.new(
      Redcarpet::Render::HTML,
      fenced_code_blocks: true,
      autolink: true,
      prettify: true
    )
    @topic = Topic.find(params[:id])
  end
end
