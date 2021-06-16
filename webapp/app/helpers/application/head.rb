module Application
  module Head
    extend ActiveSupport::Concern
  
    def render_head_title
      data = {
        topics: {
          show: @topic&.title
        }
      }
  
      default = 'Best platform to show your github issues.'
      title = data.try(:[], controller_name.to_sym).try(:[], action_name.to_sym)
      title.blank? ? default : title
    end
  end
end
