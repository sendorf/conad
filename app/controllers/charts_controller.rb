class ChartsController < ApplicationController

	def index
		@servers = Server.all.sort
	end
	
end