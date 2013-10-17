class ChangeAesKeyToHash2InServers < ActiveRecord::Migration
  def change
		rename_column :servers, :aes_key, :hash2
	end
end
