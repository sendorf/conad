class ApplicationController < ActionController::Base

	before_filter :set_locale

  include ActionText

  protect_from_forgery

  def default_url_options(options={})
    { locale: I18n.locale == :en ? '' : I18n.locale }
  end

	def set_locale
    if params[:locale] && I18n.available_locales.include?(params[:locale].to_sym) 
      I18n.locale = params[:locale]
    else
      I18n.locale = :en
    end
	end

  private

    def extract_locale_from_accept_language_header
      request.env['HTTP_ACCEPT_LANGUAGE'].scan(/^[a-z]{2}/).first
    end

end
