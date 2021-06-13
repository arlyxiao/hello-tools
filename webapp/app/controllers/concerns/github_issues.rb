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
end
