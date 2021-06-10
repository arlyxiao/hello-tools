desc 'Sync github issues'
namespace :github do
  task sync_issues: :environment do
    p 'Try to sync'
    Github::SyncIssuesJob.perform_later(page: 1)
  end
end
