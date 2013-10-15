class Server < ActiveRecord::Base

  before_create :set_aes_key

  attr_accessible :description, :name, :password, :url, :user

  validates_presence_of :name
  validates_presence_of :url
  validates_presence_of :user
  validates :password,
             :presence => true,
             :confirmation => true,
             :if => lambda{ new_record? }

  has_many :connections

  def password=(new_password)

    @password = AES.encrypt(new_password, self.aes_key)
    self.password_hash = @password

  end

  private
    def set_aes_key
      self.aes_key = AES.key
    end

end
