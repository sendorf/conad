class CreateServers < ActiveRecord::Migration
  def change
    create_table :servers do |t|
      t.string :name
      t.text :description
      t.string :url
      t.string :user
      t.string :password

      t.timestamps
    end
  end
end
