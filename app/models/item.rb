class Item < ApplicationRecord
  validates :name, presence: true
  validates :description, presence: true
  validates :price, presence: true, numericality: true
  belongs_to :user
  belongs_to :category
  has_many :bookings
  has_many :reviews, dependent: :destroy
  has_many :users, through: :bookings
  has_one_attached :photo
  geocoded_by :address
  after_validation :geocode, if: :will_save_change_to_address?

include PgSearch::Model
  pg_search_scope :global_search,
    against: [:name, :description],
    associated_against: {
      category: [:name]
    },
    using: {
      tsearch: { prefix: true }
    }
end
