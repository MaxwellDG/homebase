# HomeBase

A website meant to be used as a 'homepage' that aids productivity. 

## Description 
I no longer wanted to be bombarded with all the ads, news headlines, and various other suggestions that plague the standard 'homepage'. Consequently, I created a homepage that contains none of the above. Instead of all the clutter, now the main focus is starting the task at hand. "Collections" of websites are present, that upon being clicked, open the predetermined set of websites in their own tabs. In addition, the local weather is present and the coordinated can be set to the user's liking.

The website is not just for personal use, and a simple account can be created to save one's data. The account is saved in a database server, as well an in local storage.

## Demo

### Simple Account Registration


Only a name a password are required for registration. This is simply to have a reference to your desired settings in the database.

### Customizable Collections

Users can create their own Collection and/or alter the defaults. The "+" opens a field for adding a url, while the "-" enables deletion. 

### Location

The user's coordinates are sent as a GET request to the darksky.net API. Pertinent data is extracted from the response and added to the display for the user.

