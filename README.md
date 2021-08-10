![screen-gif](./public/vue_do_it.gif)

<h1>APP OUT OF COMMISSION AT THIS TIME, PLEASE STAND BY</h1>
<header>
<h4 style=color:#206557ff>My First Vue Application</h4>
</header>
<body>

<p style=color:#206557ff>A simple CRUD To Do List application that utilizes VueJS, HapiJS, NodeJS, and MariaDB.  Other packages utilized in this application include Vue-Router, and VueX, Nodemon, and NanoID.</p>

<p style=color:#206557ff>In order to utilize the application as it is now, you will need to install a few simple tools and have an instance of MariaDB installed.  The following instructions are specific to the development environment that was used to create this project.  Although you can find plenty of documentation on how to install the specific tools you'll need to use this app on any machine, the following notes/instructions will be specific to Manjaro Linux, as that is the environment I use.  Thusly any Arch based distribution can follow along easily, but any tech-savy person with a knowledge of Git, Node, and MySQL should be able to get this running on any machine.</p>

<header>
<h4 style=color:#206557ff>Install NodeJS</h4>
</header>

<p style=color:#206557ff>You'll first need NodeJS and it's package manager, NPM:</p>

<p style=color:#206557ff>From your terminal, enter:</p>

`sudo pacman -S nodejs npm`

<h4 style=color:#206557ff>Install MariaDB:</h4>

<p style=color:#206557ff>You'll need to spin up a MariaDB database that will persist your To Do List, so first you'll need to install MariaDB.
Installing MariaDB has multiple steps and is not as simple as inputting a single command, the following link is provided for your reference in installing MariaDB:</p>

<a style=color:#00ae8cff href="https://wiki.archlinux.org/title/MariaDB">Install MariaDB on Arch Linux</a>

<h5 style=color:#206557ff>After Installation:</h5>

<p style=color:#206557ff>Once MariaDB has been installed, you'll need to create a user and a password, as well as grant that user privileges to read/write from/to the database.  A simple way of creating this is to login to MariaDB as root:</p>

`sudo mariadb`

<p style=color:#206557ff>And create a user and password:</p>

`CREATE USER 'myname' @ 'localhost' IDENTIFIED BY 'mypassword'`

<p style=color:#206557ff>And grant that user all privileges (note that granting all privileges could be insecure, consider deleting user once testing this app is done):</p>

`GRANT ALL PRIVILEGES on *.* TO myname@localhost IDENTIFIED BY 'mypassword';`
`FLUSH PRIVILEGES`

<p style=color:#206557ff>Then we'll need to create a database, and then quit out of mariadb:</p>

`CREATE DATABASE vue_do_it;`
`\q`

<p style=color:#206557ff>This next part is optional, but you may want to start up your database whenever you start your computer, on Linux, this is done easily by entering the following command into your terminal:</p>

`sudo systemctl enable mariadb.service`

<p style=color:#206557ff>Alternatively, you can simply start mariadb by entering the following into your terminal:</p>

`sudo systemctl start mariadb.service`

<p style=color:#206557ff>And that should do it, we're finally ready to install the Vue Do It App:</p>

<h4 style=color:#206557ff>Install Vue Do It:</h4>

<p style=color:#206557ff>Next we'll need to actually download the project. Navigate to a directory you're comfortable with cloning the repository to.</p>

<h5 style=color:#206557ff>Clone the Repository:</h5>

`git clone https://github.com/tomit4/vue_do_it.git`

<h5 style=color:#206557ff>Install Dependencies:</h5>

<p style=color:#206557ff>Navigate to your vue_do_it directory, and from your terminal, enter:</p>

`npm install`

<p style=color:#206557ff>This will automatically install all dependencies necessary to run and test the application.</p>

<h5 style=color:#206557ff>Import The Database</h5>

<p style=color:#206557ff>You'll also need to import the database.  I've provided a vue_do_it.sql file that can be imported like this, just make sure you created the database using the instructions above.  From the vue_do_it directory, simply type into the terminal:</p>

`mariadb -u username -p vue_do_it < vue_do_it_timed.sql`

<h5 style=color:#206557ff>Create a .env-local file:</h5>

<p style=color:#206557ff>For security purposes, creating a .env-local file will pass sensitive login information to the server, first create the file:</p>

`touch .env-local`

<p style=color:#206557ff>And enter the following, each input on its on new line (no punctuation at the end of each line, be sure to put in your own mariadb username and password):</p>

`PORT=3000`
`DB_HOST=localhost`
`DB_USER=myname`
`DB_PASS=mypassword`
`DB_NAME=vue_do_it`

<h5 style=color:#206557ff>Start the Server:</h5>

<p style=color:#206557ff>To start the Servers (both localhost:3000 and localhost:8080 will be needed), simply navigate to your vue_do_it directory, and from your terminal, enter:</p>

`npm run dev`

<p style=color:#206557ff>Open up your favorite browser, and in the address bar type:</p>

`localhost:8080`

<p style=color:#206557ff>And that's it!  Enjoy creating To Do List Items that will persist to a MariaDB Database and display nicely using VueJS!</p>

<font size="2">

_Please note that this project was written by a beginner, it is my best attempt at creating a simple To Do List Application using the tools mentioned above. This project will hopefully be updated in the near future to add more features and clean up the code._
