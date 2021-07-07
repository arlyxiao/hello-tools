class ApplicationController < ActionController::Base
  include SessionsHelper

  before_action :skip_invalid_page_for_search_engine

  def skip_invalid_page_for_search_engine
    error_pages = [
      '/404',
      '/500'
    ]
    if browser.bot?
      if error_pages.include?(request.path)
        head :moved_permanently
      end
    end
  end
end
