class ApplicationController < ActionController::Base

	before_filter :set_locale

  include ActionText

  protect_from_forgery

	def set_locale
  	I18n.locale = :es
	end

end
