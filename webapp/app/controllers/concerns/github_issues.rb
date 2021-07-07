module GithubIssues
  extend ActiveSupport::Concern

  def fetch_github_issues
    issues = []
    GithubIssue.all.map do |page|
      issue_data = JSON.parse(page.json_data)
      issue_data.each do |issue|
        issues.append({
          title: issue['title'],
          body: issue['body'],
          created_at: issue['created_at']
        })
      end
    end

    issues
  end

  def need_sync_when_page_load?(user:, repo_name:)
    if !browser.bot? && Rails.env.production?
      data = Topic.where(user: user, repo: repo_name)

      return !data.exists? || Time.now - data.first.updated_at > 60.minutes
    end

    false
  end

  def run_sync_when_page_load(current_user)
    return if current_user.nil?

    current_user.repos.each do |repo|
      if need_sync_when_page_load?(user: current_user, repo_name: repo.name)
        current_user.repos.each do |repo|
          Github::SyncIssuesJob.perform_later(
            user: current_user,
            repo: repo.name
          )
        end
      end
    end
  end
end
