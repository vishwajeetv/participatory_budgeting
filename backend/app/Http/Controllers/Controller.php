<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Support\Facades\Mail;

abstract class Controller extends BaseController
{
    use DispatchesJobs, ValidatesRequests;

    public function sendMail($emailData, $template, $subject)
    {
        try {
            Mail::send($template,
                $emailData,
                function ($message) use ($emailData, $subject) {
                    $message->to($emailData['email'])->subject($subject);

                });
            return true;
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return false;
        }
    }

    public function respond($flag, $successMessage, $failMessage, $data, $errors)
    {
        if ($flag) {
            return $this->generateResponse(
                'success',
                $successMessage,
                $data
            );
        } else {
            return $this->generateResponse(
                'error',
                $failMessage,
                $errors
            );
        }
    }

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
}
