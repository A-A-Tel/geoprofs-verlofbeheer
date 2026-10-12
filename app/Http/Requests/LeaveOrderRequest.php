<?php

namespace App\Http\Requests;

use App\RoleLevel;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class LeaveOrderRequest extends FormRequest
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
            'start_on' => 'required|date_format:Y-m-d\TH:i:s.v\Z',
            'end_on' => 'nullable|date_format:Y-m-d\TH:i:s.v\Z',
        ];
    }
}
