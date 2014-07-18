class ConnectionsController < ApplicationController

  def update_connections
    
    if Server.update_connections
      flash[:success] = successfully_updated_text Connection
      redirect_to root_path
    else
      flash[:danger] = could_not_update_text Connection
      redirect_to root_path
    end
  end

end