<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;

Route::post('/login', function (Request $request) {
    if (!Auth::attempt($request->only('email', 'password'))) {
        return response()->json(['message' => 'login gagal'], 401);
    }

    $request->session()->put('TEST_SESSION', 'OK');
    $request->session()->regenerate();

    return response()->json([
        'message' => 'login sukses',
        'session_id' => session()->getId(),
    ]);
});

Route::get('/cek-session', function () {
    return response()->json([
        'session' => session()->all(),
        'user' => auth()->user(),
    ]);
});
