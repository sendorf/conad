class WelcomeController < ApplicationController

	def index
	  @date = params[:month] ? Date.parse(params[:month]) : Date.today
	end

end
