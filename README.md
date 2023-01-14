Hotel Booking - PHP Laravel React (hotel-booking-php-laravel-react) is a version of example of Laravel and React application for Hotel Reservation (Hotel Booking) created on:
- back end (server side) with PHP and Laravel 9 (PHP framework); Laravel technologies used are: Laravel Breeze with Inertia, Vite that help to integrate back end with front end faster (in this case with React), authentication (out of the box with Laravel Breeze - so can concentrate more on business logic and not need to "reinvent the wheel"), etc..
- front end (client side, browser side) with JavaScript and ReactJS (React.js) that is an JavaScript library; also used React third party open source components: react-select (better DropDown menu need in some forms), react-datepicker (Date picker need in some forms), moment.js (for date formating and date processing with React).
- database: MySQL. 

Installation

Clone the repository:

git clone https://github.com/sweatydev/Laravel-Vue-booking.git

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

Run (compile) front end scripts

Run this command (any change you make to the HTML, CSS, JavaScript code will be reflected immediately in the page you see in your browser):

npm run dev

Then go to http://localhost:8000 from your browser and see the web application.