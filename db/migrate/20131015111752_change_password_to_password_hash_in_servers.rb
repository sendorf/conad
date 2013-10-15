class ChangePasswordToPasswordHashInServers < ActiveRecord::Migration
  def change
		rename_column :servers, :password, :password_hash
	end
end
