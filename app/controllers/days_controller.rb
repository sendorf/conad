class DaysController < ApplicationController

  def show
    @servers = Server.all.sort
    @date = params[:day] ? DateTime.parse(params[:day],"%Y-%m-%d") : DateTime.now
  end



end