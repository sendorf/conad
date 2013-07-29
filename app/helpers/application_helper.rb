module ApplicationHelper
  def is_ajax?
    request.xhr?
  end
end
