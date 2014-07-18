class ServersController < ApplicationController

	def new
		@server = Server.new
		@servers = Server.all.sort
	end

	def edit
		@server = Server.find(params[:id])
		@servers = Server.all.sort
	end

	def show
		@servers = Server.all.sort
		@server = Server.find(params[:id])
		@date = params[:month] ? DateTime.parse(params[:month],"%Y-%m-%d") : DateTime.now
	  @connections = Connection.user_connections(@server)
	end

	def create
		@server = Server.new(server_params)
		if @server.save
			redirect_to @server
		else
			redirect_to new_server_path(@server)
		end
	end

	def update

		@server = Server.find(params[:id])

		params[:server].delete(:password) if params[:server][:password].blank?

		if @server.update_attributes(server_params)
			flash[:success] = successfully_updated_text Server
			redirect_to @server

		else
			flash[:danger] = could_not_update_text Server
			redirect_to edit_server_path(@server)
		end
	end

	private 
		
		def server_params
			params.require(:server).permit(:name, :description, :url, :user, :id, :password)
		end

end
