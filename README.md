# What is this?

A character generator and updater API for DnD. At least that's the hope. It'll be a full working api where you can store, retrieve and update characters. There will be a frontend where you can create a character and do the whole level up process in a simple manner using the api to retrieve the relevant information.

Eg: Filter by class and level to get the number of spells. Filter one further and do it by invocation to hunt for specific spell types.

There will also be a section that will scrape from 5e tools to fill out the api's basic information. This can come later though. At the moment the priority is just making basic models with prisma 2, setting the skeleton. Making sure you can follow all the simple steps of build a character is mission number 1.

NOTE: THIS IS FOR 5E

# What does it use?

Prisma 2 and Apollo.

# How? 

 - copy `prisma/.env.example`, renaming it to `.env`.
 - Edit your connection string in `prisma/.env`. (it uses postgres by default)
 - copy `.env.example` from root, renaming it to `.env`. 
 - Fill in the port you want to use.
 - `npm install` - install dependancies
 - `npx prisma migrate up --experimental` - migrate the database table setup
 - `npx prisma generate` - set up prisma client
 - `node seeds/resources.js` - seed the list of books from 5e tools. (Just an example Seed atm)
 - `npm start` - Start the server. You can access playground at http://localhost:[yourport]

# Thats it????

I'M WORKING ON IT.

# Thoughts?

It's literally the exact same amount of work it would take to write up migrations for postgres manually. The only difference is the oppertunity to work with more than just postgres if you wanted, and also the syntax is ever so slightly nicer. 

There are more commands compared to the first prisma, too. Rather than it being just under one. Though i suppose i could write a package to deal with this a little better. 

It's not been bad, but it's not great either. Definately a *Good* though.

# Why?

Roll20 broke my sheet and i'm mad.
