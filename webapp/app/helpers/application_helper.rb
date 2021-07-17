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

  def render_tools_component(component_name, attributes)
    attributes.merge!({
      currentUser: {
        username: current_user&.username
      },
      node_server_host: ENV['NODE_SERVER_HOST'],
      node_data_path: ENV['NODE_DATA_PATH']
    })
    react_component(component_name, attributes)
  end
end
