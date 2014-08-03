class CalendarsController < ApplicationController

	def show
	  @servers = Server.all.sort
	  @date = params[:month] ? DateTime.parse(params[:month],"%Y-%m-%d") : DateTime.now
	  @connections = Connection.all
    @end_date = DateTime.new(@date.year, @date.month, -1)
    @start_date = DateTime.new(@date.year, @date.month, 1)
	end



end
