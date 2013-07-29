module LayoutHelper
  def title(page_title, options = {})
    options = {:show_title => true}.merge(options)
    @show_title = options[:show_title]
    @content_for_title = page_title.to_s
    @content_for_subtitle = options[:subtitle].to_s
  end

  def get_title(default_title="")
    @content_for_title.present? ? @content_for_title : default_title
  end

  def get_subtitle
    @content_for_subtitle
  end

  def show_subtitle?
    @content_for_subtitle.present?
  end

  def show_title?
    @show_title && @content_for_title.present?
  end

  def get_sidebar
    @content_for_sidebar
  end

  def sidebar(&block)
    @content_for_sidebar = capture &block
  end

  def has_sidebar?
    @content_for_sidebar.present?
  end

end
