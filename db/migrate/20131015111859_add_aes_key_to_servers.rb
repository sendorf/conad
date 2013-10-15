class AddAesKeyToServers < ActiveRecord::Migration
  def change
		add_column :servers, :aes_key, :string
	end
end
