class ServersController < ApplicationController

	def new
		@server = Server.new
	end

	def edit
		@server = @current_server
	end

end
