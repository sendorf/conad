class CalendarsController < ApplicationController

	def show
	  	@date = params[:month] ? DateTime.parse(params[:month],"%Y-%m-%d") : DateTime.now
	  	@connections
	end

end
