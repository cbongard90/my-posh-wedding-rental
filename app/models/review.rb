class Review < ApplicationRecord
  belongs_to :item
  validates :comment, :rating, presence: true
  validates :rating,  inclusion: { in: (0..5) }, numericality: true
end
