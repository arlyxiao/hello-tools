module GithubServices
  class FetchIssues

    def initialize(token:, repo:, page:)
      @token = token
      @repo = repo
      @page = page
    end

    def call
      begin
        uri = URI("https://api.github.com/repos/#{@repo}/issues")
        params = { page: @page }
        uri.query = URI.encode_www_form(params)

        req = Net::HTTP::Get.new(uri)
        req['Authorization'] = "Bearer #{@token}"
        req["Accept"] = "application/json"

        http = Net::HTTP.new(uri.host, uri.port)
        http.use_ssl = true

        res = http.request(req)

        Rails.logger.debug("Fetch done: #{res}")

        return nil unless res.is_a?(Net::HTTPSuccess)

        begin
          parsed = JSON.parse(res.body)
          if parsed.length == 0
            raise 'No issues'
          end
        rescue JSON::ParserError => e
          Rails.logger.warn "Fetching issues error: #{e}"
          return nil
        end

        return res.body
      rescue => e
        Rails.logger.warn "Fetching issues error: #{e}"
      end

      nil
    end
  end
end
