class DaysController < ApplicationController

  def show
    @servers = Server.all.sort
    @date = DateTime.parse(params[:day],"%Y-%m-%d")
    if params[:server_id] 
      @server = Server.find(params[:server_id]) 
    end
  end



end