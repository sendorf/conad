class Server < ActiveRecord::Base

  attr_accessible :description, :name, :password, :url, :user, :password_confirmation

  attr_accessor :password

  validates_presence_of :name
  validates_presence_of :url
  validates_presence_of :user
  validates  :password,
             :presence => true,
             :confirmation => true,
             :on => :create

  has_many :connections

  def password
    AES.decrypt(self.hash, self.hash2)
  end

  def password=(new_password)
    @key = AES.key
    @password = AES.encrypt(new_password, @key)
    self.hash = @password
    self.hash2 = @key
  end

end
