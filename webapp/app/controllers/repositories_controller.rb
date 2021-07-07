class RepositoriesController < ApplicationController
  before_action :has_authenticated?

  def index
    @repo_list = current_user.repos.map { |repo| repo.name }
  end

  def save_github_token
    begin
      current_user.github_token = params[:github_token]
      current_user.save

      head :ok
    rescue => e
      head :forbidden
    end
  end

  def create
    repo = current_user.repos.find_or_initialize_by(name: params[:name])
    if repo.save
      head :created
    else
      head :forbidden
    end
  end

  def destroy
    begin
      repo = current_user.repos.find_by(name: params[:name])
      repo.destroy
      head :ok
    rescue => e
      head :forbidden
    end
  end

  def sync_issues
    if params[:name].present?
      Github::SyncIssuesJob.perform_later(
        user: current_user,
        repo: params[:name]
      )
      render json: {}, status: :ok and return
    end

    render json: {}, status: :forbidden
  end
end
