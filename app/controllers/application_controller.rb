class ApplicationController < ActionController::Base

	before_filter :set_locale

  include ActionText

  protect_from_forgery

	def set_locale
  	if I18n.available_locales.include?(extract_locale_from_accept_language_header)
      I18n.locale = extract_locale_from_accept_language_header
    else
      I18n.locale = :en
    end
	end

  private

    def extract_locale_from_accept_language_header
      request.env['HTTP_ACCEPT_LANGUAGE'].scan(/^[a-z]{2}/).first
    end

end
