module ApplicationHelper
  include Application::Head
  include Application::Topics

  def render_session_component(component_name, attributes)
    attributes.merge!({
      currentUser: {
        username: current_user&.username
      }
    })
    react_component(component_name, attributes)
  end
end
