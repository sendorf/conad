class ChartsController < ApplicationController

	def index
		@servers = Server.all.sort
    @server = Server.find(1)
    @end_date = DateTime.now
    @start_date = @end_date -30.days
	end
	
end