Hotel Booking PHP Laravel React (hotel-booking-php-laravel-react) is a version of example of PHP application for Hotel Reservation (Hotel Booking) created on:
- back end (server side) with PHP and Laravel 9 (PHP framework); Laravel technologies used are: Laravel Breeze with Inertia, Vite that help to integrate back end with front end faster (in this case with React), Authentification (out of the box with Laravel Breeze), etc..
- front end (client side, browser side) with JavaScript and ReactJS (React.js) that is an JavaScript library; also used React third party open source components: react-select (better DropDown menu need in some forms), react-datepicker (Date picker need in some forms), moment.js (for date formating and date processing with React).
- database: MySQL. 

Installation

Clone the repository:

git clone https://github.com/albeisoft/hotel-booking-php-laravel-react.git

Then cd into the folder with this command:

cd hotel-booking-php-laravel-react

Then do a composer install:

composer install

Edit .env file with appropriate credential for your database server. Just edit these two parameter(DB_USERNAME, DB_PASSWORD).

Then create a database named "hotel" and then do a database migration using this command:

php artisan migrate

Run server

Run server using this command:

php artisan serve

Then go to http://localhost:8000 from your browser and see the web application.