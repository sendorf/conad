class RemoveWeekDayMonthDayMonthConnectionLast < ActiveRecord::Migration
  def change
    remove_column :connections, :week_day
    remove_column :connections, :month_day
    remove_column :connections, :month
    remove_column :connections, :connection_last
  end
end
