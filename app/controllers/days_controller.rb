class DaysController < ApplicationController

  def show
    @servers = Server.all.sort
    @day = DateTime.parse(params[:day],"%Y-%m-%d")
    if params[:server_id] 
      @server = Server.find(params[:server_id]) 
    end
  end



end