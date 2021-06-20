class SyncGithubIssuesChannel < ApplicationCable::Channel
  def subscribed
    # stream_from 'test_9'
    stream_for current_user
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
