<?php


/* Test */
Route::get('/test', 'InvoiceController@testPdf');
Route::get('/test/view', 'InvoiceController@testPdfView');
Route::get('/simple/make/pdf', 'ProjectController@makePdf');

/* General */

Route::get('/', ['as' => 'home', 'uses' => 'HomeController@index']);
Route::get('/project/{id}', 'HomeController@index');
Route::get('/todo/{todoId}', 'HomeController@index');
Route::get('/home', 'HomeController@index');
Route::get('/tasks', 'HomeController@index');
Route::get('/bookkeeping/{id}', 'HomeController@index');
Route::get('/tasks/{id}', 'HomeController@index');

/* API */
Route::resource('/rest/todo', 'TodoController');
Route::resource('/rest/project', 'ProjectController');
Route::resource('/rest/invoice', 'InvoiceController');