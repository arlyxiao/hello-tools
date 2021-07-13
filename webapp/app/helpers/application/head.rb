module Application
  module Head
    extend ActiveSupport::Concern

    def render_meta_description
      data = {
        topics: {
          show: @topic&.title
        }
      }

      default = 'Make your github issues as your personal notes automatically.'
      title = data.try(:[], controller_name.to_sym).try(:[], action_name.to_sym)
      title.blank? ? default : title
    end
  end
end
