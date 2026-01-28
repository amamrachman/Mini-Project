<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

Route::get('/ping', function () {
    Log::info('Ping endpoint accessed');
    return response()->json(['message' => 'API OK']);
});

Route::post('/login', function (Request $request) {
    Log::info('Login attempt', ['email' => $request->email]);

    $credentials = $request->validate([
        'email' => 'required|email',
        'password' => 'required',
    ]);

    if (!Auth::attempt($credentials)) {
        Log::warning('Failed login attempt', ['email' => $request->email]);
        return response()->json([
            'message' => 'email atau password salah',
        ], 401);
    }

    Log::info('User logged in', ['user_id' => Auth::id()]);
    $request->session()->regenerate();

    return response()->json(['message' => 'Login Berhasil']);
});

Route::post('/logout', function (Request $request) {
    Log::info('User logging out', ['user_id' => Auth::id()]);
    Auth::logout();
    $request->session()->invalidate();
    $request->session()->regenerate();

    return response()->json(['message' => 'Logout berhasil']);
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    Log::info('User data accessed', ['user_id' => Auth::id()]);
    return $request->user();
});
