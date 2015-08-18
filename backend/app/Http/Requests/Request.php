<?php namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

abstract class Request extends FormRequest {

    public function response(array $errors)
    {
        return response(
            $errors
        , 422)
            ->header('Content-Type', 'json');

    }
}
