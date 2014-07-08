class RemoveHash2FromServers < ActiveRecord::Migration
  def change
    remove_column :servers, :hash2
  end
end
