module TopicsHelper
  def render_markdown(content)
    markdown = Redcarpet::Markdown.new(
      Redcarpet::Render::HTML,
      fenced_code_blocks: true,
      autolink: true,
      prettify: true
    )
    markdown.render(content).html_safe
  end
end
