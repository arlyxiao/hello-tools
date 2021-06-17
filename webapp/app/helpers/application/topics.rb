module Application
  module Topics
    def render_markdown(content)
      markdown = Redcarpet::Markdown.new(
        Redcarpet::Render::HTML,
        fenced_code_blocks: true,
        autolink: true,
        prettify: true
      )
      markdown.render(content).html_safe
    end

    def render_time(time)
      "#{time_ago_in_words(time)} ago"
    end
  end  
end
