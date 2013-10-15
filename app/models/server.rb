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
    AES.decrypt(self.password_hash, self.aes_key)
  end

  def password=(new_password)

    if self.aes_key
      @password = AES.encrypt(new_password, self.aes_key)
      self.password_hash = @password
    else
      @key = AES.key
      @password = AES.encrypt(new_password, @key)
      self.password_hash = @password
      self.aes_key = @key
    end

  end

end
