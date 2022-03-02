<?php

use App\Http\Controllers\ExploitController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::get('/get-students','App\Http\Controllers\ExploitController@index');
Route::post('/add-student','App\Http\Controllers\ExploitController@store');
Route::get('/edit-student/{id}','App\Http\Controllers\ExploitController@edit');
Route::put('/update-student/{id}','App\Http\Controllers\ExploitController@update');
Route::delete('/delete-student/{id}','App\Http\Controllers\ExploitController@destroy');

Route::post('/uploadimg','App\Http\Controllers\ExploitController@storeimage');
Route::middleware(['Check'])->group(function(){
Route::get('/list','App\Http\Controllers\ExploitController@reverse');
});
Route::get('/deleteimg/{id}','App\Http\Controllers\ExploitController@destroyimg');
//Route::post('/add-student',[ExploitController::class,'store']);
//
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
