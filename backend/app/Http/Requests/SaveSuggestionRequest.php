<?php namespace App\Http\Requests;

use App\Http\Requests\Request;

class SaveSuggestionRequest extends Request {

	/**
	 * Determine if the user is authorized to make this request.
	 *
	 * @return bool
	 */
	public function authorize()
	{
		return true;
	}

	/**
	 * Get the validation rules that apply to the request.
	 *
	 * @return array
	 */
	public function rules()
	{
        return [
			'citizen.email' => 'email | required',
			'citizen.name' => 'required',
			'citizen.mobile' => 'required',
			'citizen.address' => 'required',
            'work_id' => 'required',
            'division_id' => 'required',
            'area' => 'required',
            'suggestion' => 'required',
            'work_purpose' => 'required',
        ];
	}

}
