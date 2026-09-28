<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use Illuminate\Http\Response;
use Symfony\Component\HttpFoundation\Response as Codes;

class AuthController extends Controller
{
    public function login(LoginRequest $request): Response {
        $data = $request->validated();
        $success = auth()->attempt($data);

        if ($success) {
            return response(null, Codes::HTTP_NO_CONTENT);
        }
        return response(null, Codes::HTTP_UNAUTHORIZED);
    }
}
