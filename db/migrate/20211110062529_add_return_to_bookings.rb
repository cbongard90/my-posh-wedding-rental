class AddReturnToBookings < ActiveRecord::Migration[6.1]
  def change
    add_column :bookings, :return, :date
  end
end
