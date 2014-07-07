# Laravel AngularJS SPA
Single Page Application built with AngularJS for frontend consuming RESTful backend services built with Laravel 4

## Dependencies
### Composer Dependencies
1. Laravel Framework 4.2
2. Larryfour : Laravel migrations generator (for generating migrations from database)

### Bower Dependencies
1. AngularJS 1.2.19 and its modules
2. UI-bootstrap (Bootstrap Directives for AngularJS)
3. jQuery
4. Twitter Bootstrap

## Generators
1. PHP artison CLI for Laravel 4
2. Yeomen Generator for AngularJS

## Installation
1. Install Composer, NodeJS (If not installed)
2. Install Bower and Grunt globally (`npm install -g bower`, `npm install -g grunt`) if not installed.
3. Use `composer install` to install laravel and other composer dependencies
4. Install NodeJs local dependancies (`npm install`)
5. Install Bower dependanices (`bower install`)
6. Configure app/config/database.php and app/config/local/database.php files
7. Use PHP Artisan CLI for creating database tables using migrations (`php artisan migrate`)
8. Seed the database (`php artisan db:seed`)
9. Done! You can check the app in localhost/hrms/app/ (default email: admin@admin.com, password: admin)

