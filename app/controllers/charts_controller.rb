class ChartsController < ApplicationController

	def index
		@servers = Server.all.sort
    @server = Server.find(1)
    @date = DateTime.now
	end
	
end