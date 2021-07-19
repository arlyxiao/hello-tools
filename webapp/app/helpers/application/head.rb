module Application
  module Head
    extend ActiveSupport::Concern

    def render_head_title
      data = {
        topics: {
          show: @topic&.title
        }
      }

      default = 'farseek.top - Best tools platform.'
      title = data.try(:[], controller_name.to_sym).try(:[], action_name.to_sym)
      title.blank? ? default : title
    end

    def render_meta_description
      data = {
        topics: {
          show: @topic&.title
        }
      }

      default = <<~HEREDOC.gsub(/\n/, ' ')
        One of the best tools platform. The tools include PDF converter,
        font converter. And you can sync your github issues on the platform.
      HEREDOC
      title = data.try(:[], controller_name.to_sym).try(:[], action_name.to_sym)
      title.blank? ? default : title
    end
  end
end
