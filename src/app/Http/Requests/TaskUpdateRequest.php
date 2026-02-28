<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TaskUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:50'],
            'description' => ['nullable', 'string', 'max:255'],
            'status' => ['required'],
        ];
    }

    public function messages()
    {
        return [
            'title.required' => "タイトルを入力してください",
            'title.max' => "タイトルは50文字以内で入力してください",
            'description.max' => "説明は255文字以内で入力してください",
        ];
    }
}
