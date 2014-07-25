class ServersController < ApplicationController

	def new
		@server = Server.new
		@servers = Server.all.sort
	end

	def edit
		@server = Server.find(params[:id])
		@servers = Server.all.sort
		@edit = true
	end

	def create
		@server = Server.new(server_params)
		if @server.save
			flash[:success] = successfully_created_text Server
			redirect_to root_path
		else
			flash[:danger] = could_not_create_text Server
			redirect_to new_server_path(@server)
		end
	end

	def update

		@server = Server.find(params[:id])

		params[:server].delete(:password) if params[:server][:password].blank?

		if @server.update_attributes(server_params)
			flash[:success] = successfully_updated_text Server
			redirect_to root_path

		else
			flash[:danger] = could_not_update_text Server
			redirect_to edit_server_path(@server)
		end
	end

	def destroy
		@server = Server.find(params[:id])

		if (Connection.server_connections(@server).delete_all) &&  (@server.destroy)
			flash[:success] = successfully_deleted_text Server
			redirect_to root_path
		else
			flash[:danger] = could_not_delete_text Server
			redirect_to edit_server_path(@server)
		end
	end

	private 
		
		def server_params
			params.require(:server).permit(:name, :description, :url, :user, :id, :password)
		end

end
