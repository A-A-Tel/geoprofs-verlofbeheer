<?php

namespace App\Http\Requests;

use App\RoleLevel;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UserCreateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $user = auth()->user();
        if (! $user) {
            return false;
        }

        return $user->hasRoleLevel(RoleLevel::OfficeManager);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'first_name' => 'required|max:32',
            'last_name' => 'required|max:32',
            'email' => 'required|email|unique:users,email',
            'phone_number' => 'required|max:16',
            'citizen_service_number' => 'required|max:9',
            'started_service_on' => 'required|date',
            'annual_leave_days' => 'required|int|min:0|max:255',
            'password' => 'required',
            'role_id' => ['required', Rule::enum(RoleLevel::class)],
            'supervisor_id' => 'nullable|exists:users,id',
            'department_id' => 'nullable|exists:departments,id',
        ];
    }
}
