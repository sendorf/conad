class CalendarsController < ApplicationController

	def show
	  @servers = Server.all.sort
	  @date = params[:month] ? DateTime.parse(params[:month],"%Y-%m-%d") : DateTime.now
	end



end
