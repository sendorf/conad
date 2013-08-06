class CalendarsController < ApplicationController

	def show
	  	@date = params[:month] ? DateTime.parse(params[:month],"%Y-%m-%d") : DateTime.now
	  	@connections
	end

	def index
		@connections
	  @date = params[:month] ? DateTime.parse(params[:month],"%Y-%m-%d") : DateTime.now
	end

end
