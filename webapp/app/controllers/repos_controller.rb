class ReposController < ApplicationController
  before_action :logged_in_user

  def save_github_token
    current_user.github_token = params[:github_token]
    current_user.save
  end

  def create
    repo = current_user.repos.find_or_initialize_by(name: params[:name])
    if repo.save
      render json: {}, status: :created
    else
      render json: {}, status: :forbidden
    end
  end

  def destroy
    begin
      repo = current_user.repos.find_by(name: params[:name])
      repo.destroy
      render json: {}, status: :ok
    rescue => e
      render json: {}, status: :forbidden
    end
  end

  def sync_issues
    if params[:repo].present?
      token = current_user.github_token
      Github::SyncIssuesJob.perform_later(token: token, repo: params[:name], page: 1)
      render json: {}, status: :ok and return
    end

    render json: {}, status: :forbidden
  end
end
