class ServersController < ApplicationController

	def new
		@server = Server.new
	end

	def edit
		@server = Server.find(params[:id])
	end

	def show
		@server = Server.find(params[:id])
		@date = params[:month] ? DateTime.parse(params[:month],"%Y-%m-%d") : DateTime.now
	  @connections = Connection.all
	end

end
