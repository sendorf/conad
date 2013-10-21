class ChangePasswordHashToHash1InServers < ActiveRecord::Migration
   def change
		rename_column :servers, :password_hash, :hash1
	end
end
