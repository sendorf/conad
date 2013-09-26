class ApplicationController < ActionController::Base

	before_filter :set_locale
  before_filter :set_servers
  before_filter :set_current_server

  def change_server(server)
    @current_server = server
  end

  protect_from_forgery

	def set_locale
  	I18n.locale = :es
	end

  def set_current_server
    @current_server = Server.find(4)
  end

  def set_servers
    @servers = Server.all
  end

end
