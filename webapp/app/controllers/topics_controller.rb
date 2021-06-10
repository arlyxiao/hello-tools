class TopicsController < ApplicationController
  def index
    # Octokit.configure do |c|
    #   c.api_endpoint = "https://api.github.com"
    # end
    client = Octokit::Client.new(:access_token => ENV['GITHUB_TOKEN'])
    # client.connection_options[:ssl] = { :verify => false }

    issues = client.issues ENV['GITHUB_REPO']
    render json: issues
  end
end
