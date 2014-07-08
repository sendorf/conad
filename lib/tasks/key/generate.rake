namespace :key do

	desc "Generates the private key for password storage in the application"
	task :generate do
	key_file = File.join(Rails.root, 'config', 'private_key.aes') #File where the private key is going to be estored.
		if File.exist?(key_file)
			puts ("ERROR: A key already exists, action not taken")
		else
			File.open(key_file, 'w+') do |file|
        file.write AES.key
      end
      puts ("Key created correctly")
		end

	end

end