class Item < ApplicationRecord
  validates :name, presence: true # uniqueness: true
  validates :description, :category, presence: true
  validates :price, presence: true, numericality: true
  belongs_to :user
  has_many :bookings
  has_many :users, through: :bookings
  has_one_attached :photo
  geocoded_by :address
  after_validation :geocode, if: :will_save_change_to_address?
end
