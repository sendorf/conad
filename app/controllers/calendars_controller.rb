class CalendarsController < ApplicationController

	def show
      @server = Server.all
	  @date = params[:month] ? DateTime.parse(params[:month],"%Y-%m-%d") : DateTime.now
	  @connections = Connection.all
	end

end
