class ApplicationController < ActionController::Base

	before_filter :set_locale
  before_filter :set_server

  protect_from_forgery

	def set_locale
  	I18n.locale = :es
	end

  def set_server
    @current_server = Server.find(1)
  end

end
