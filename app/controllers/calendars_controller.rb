class CalendarsController < ApplicationController

	def show
	  @servers = Server.all.sort
    @server = @servers.first
	  @date = params[:month] ? DateTime.parse(params[:month],"%Y-%m-%d") : DateTime.now
	  @connections = Connection.all
    @end_date = DateTime.now
    @start_date = @end_date -30.days
	end



end
