<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreImageRequest extends FormRequest
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
            'name' => 'required|string|max:255',
            'vibe' => 'required|string|max:255',
            'image' => 'required|file|image|max:2048', // 2MB 限制
        ];
    }

    /**
     * Get custom error messages for validation.
     */
    public function messages(): array
    {
        return [
            'name.required' => '圖片名稱是必填的',
            'vibe.required' => '圖片描述是必填的',
            'image.required' => '請選擇要上傳的圖片',
            'image.image' => '上傳的檔案必須是圖片格式',
            'image.max' => '圖片檔案大小不能超過 2MB',
        ];
    }
}
