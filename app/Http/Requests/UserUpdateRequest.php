<?php

namespace App\Http\Requests;

use App\RoleLevel;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UserUpdateRequest extends FormRequest {

    public function rules(): array
    {
        return [
            'first_name' => 'sometimes|max:32',
            'last_name' => 'sometimes|max:32',
            'email' => 'sometimes|email|unique:users,email',
            'phone_number' => 'sometimes|max:16',
            'citizen_service_number' => 'sometimes|max:9',
            'started_service_on' => 'sometimes|date',
            'annual_leave_days' => 'sometimes|int|min:0|max:255',
            'password' => 'sometimes',
            'role_id' => ['sometimes', Rule::enum(RoleLevel::class)],
            'supervisor_id' => 'sometimes|exists:users,id',
            'department_id' => 'sometimes|exists:departments,id',
        ];
    }
}
