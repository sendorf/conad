class CalendarsController < ApplicationController

	def show
	  	@date = params[:month] ? Date.parse(params[:month],"%Y-%m") : Date.today
	  	@connections
	end

	def index
		@connections
	  	@date = params[:month] ? Date.parse(params[:month],"%Y-%m") : Date.today
	end

end
