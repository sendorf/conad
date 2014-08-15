class DaysController < ApplicationController

  def show
    @servers = Server.all.sort
    @date = DateTime.parse(params[:day],"%Y-%m-%d")
  end



end