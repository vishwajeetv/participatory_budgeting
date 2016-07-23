<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::post('user/login', 'UserController@login');
Route::get('city/works', 'CityController@getWorks');
Route::resource('user', 'UserController');
Route::controller('user', 'UserController');
//Route::resource('city', 'CityController');
Route::controller('city', 'CityController');
Route::resource('suggestion', 'SuggestionController');
Route::controller('suggestion', 'SuggestionController');
Route::resource('instance', 'InstanceController');
