<?php

namespace App\Http\Requests;

use App\RoleLevel;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class LeaveCreateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $user = auth()->user();
        if ($user == null) {
            return false;
        }

        return $user->hasRoleLevel(RoleLevel::Employee);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'type' => 'required|exists:leave_types,id',
            'reason' => 'required|string|min:1|max:1024',
            'start_on' => 'required|date|after_or_equal:today',
            'end_on' => 'nullable|date|after_or_equal:start_on',
        ];
    }
}
