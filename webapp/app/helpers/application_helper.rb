module ApplicationHelper
  def render_session_component(component_name, attributes)
    attributes.merge!({
      currentUser: {
        username: current_user&.username
      }
    })
    react_component(component_name, attributes)
  end

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
