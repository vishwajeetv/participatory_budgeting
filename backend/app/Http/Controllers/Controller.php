<?php namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesCommands;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;

abstract class Controller extends BaseController {

	use DispatchesCommands, ValidatesRequests;


    public function generateResponse($status, $message, $body)
    {
        return response([
            'header' => array(
                'status' => $status,
                'message' => $message
            ),
            'body' =>
                $body
        ], 200)
            ->header('Content-Type', 'json');

    }

    public function respond($flag, $message, $data, $errors)
    {
        if ($flag) {
            return $this->generateResponse(
                'success',
                $message,
                $data
            );
        } else {
            return $this->generateResponse(
                'error',
                $message,
                $errors
            );
        }
    }

}
