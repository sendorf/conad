class ChangePasswordHashToHashInServers < ActiveRecord::Migration
   def change
		rename_column :servers, :password_hash, :hash
	end
end
