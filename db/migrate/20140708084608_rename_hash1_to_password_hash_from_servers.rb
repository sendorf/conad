class RenameHash1ToPasswordHashFromServers < ActiveRecord::Migration
  def change
    rename_column :servers, :hash1, :pasword_hash
  end
end
