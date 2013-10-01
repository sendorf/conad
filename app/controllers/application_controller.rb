class ApplicationController < ActionController::Base

	before_filter :set_locale
  before_filter :set_servers



  protect_from_forgery

	def set_locale
  	I18n.locale = :es
	end

  def set_servers
    @servers = Server.all
  end

end
