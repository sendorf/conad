class ServersController < ApplicationController

	def new
		@server = Server.new
	end

end
