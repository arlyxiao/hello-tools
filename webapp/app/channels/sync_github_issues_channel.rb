class SyncGithubIssuesChannel < ApplicationCable::Channel
  def subscribed
    # stream_from 'test_9'
    stream_for User.find(9)
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
