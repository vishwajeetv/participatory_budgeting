#Participatory budgeting web app
For municipal corporations in India.

A web application for Citizen Participatory Budgeting Management in India.

Live demo - [Participatory Budgeting - Pimpri Chinchwad Municipal Corporation](http://pcmc.participatorybudeting.in)

Built with Laravel 5.1 , AngularJS 1.4, Angular Material (following Google Material Design specifications) and MySQL database

Frontend app is scaffolded using Yeomen generator for Angular

The system is multi-tenant, it uses single database and single backend application, and instance based (multiple) frontends.

The backend is service oriented - it has RESTful web services for every functionality it offers, as a result, the backend heterogeneous interoperability - means, It is easily pluggable with other systems and does not depend upon type of client.

The system is designed to be extensible, so that most of the possible changes and feature requirements can be implemented easily, without much of a change or breaking anything else.

##How to get up and running?

1. `cd backend && mv .env.example .env`
2. edit `.env` file to set your own environment configurations
3. `composer install`
4. `php artisan migrate` to run migrations (you can run `backend/database.sql` manually if migrations do not work)
4. `php artisan serve` to start the backend (or you can configure your web server to `backend/public/index.php`)
4. `cd .. && cd frontend`
5. `npm install && bower install`
6. configure server url and instance id in `frontend/app/scripts/services/constants.js`
7. `grunt serve` to serve frontend app in the browser; `grunt build` to build the production ready web app (available in `frontend/dist`)

For loading zones, administrative divisions data, `zones` table should be used.

For loading suggestions work types, `city functions` table should be used.

`Suggestions` table is denormalized to keep user information along with suggestions data, so as to remove data integrity problems (such as user data is already sent when receipt is generated and emailed, and the same data must persist.)

`Users` can have two different roles, `citizen` and `admin`

<a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png" /></a><br /><span xmlns:dct="http://purl.org/dc/terms/" property="dct:title">Participatory Budgeting Web Application</span> by <a xmlns:cc="http://creativecommons.org/ns#" href="http://www.vishwajeetv.com/" property="cc:attributionName" rel="cc:attributionURL">Vishwajeet Vatharkar</a> is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License</a>.<br />Based on a work at <a xmlns:dct="http://purl.org/dc/terms/" href="https://github.com/vishwajeetv/participatory_budgeting" rel="dct:source">https://github.com/vishwajeetv/participatory_budgeting</a>.