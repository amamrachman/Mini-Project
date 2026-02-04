<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\TodoController;
use App\Http\Controllers\API\UserController;
use Illuminate\Http\Request;

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/user', function (Request $request){
        return response()->json($request->user());
    });

    Route::prefix('todos')->group(function(){
        Route::get('/', [TodoController::class, 'index']);
        Route::post('/', [TodoController::class, 'store']);
        Route::post('/sync', [TodoController::class, 'sync']);
        Route::put('/{id}', [TodoController::class, 'update']);
        Route::delete('/{id}', [TodoController::class, 'destroy']);
    });
});

