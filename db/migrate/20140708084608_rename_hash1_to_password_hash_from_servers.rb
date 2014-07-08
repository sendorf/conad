class RenameHash1ToPasswordHashFromServers < ActiveRecord::Migration
  def change
    rename_column :servers, :hash1, :password_hash
  end
end
