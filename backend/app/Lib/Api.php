<?php

namespace App\Lib;

use Illuminate\Http\JsonResponse;

class Api
{
    /**
     * Send a JSON response.
     *
     * @param mixed $data
     * @param int $statusCode
     * @return JsonResponse
     */
    public static function res($data, $message, int $statusCode = 200): JsonResponse
    {
        $response = [
            'status' => true,
            'message' => $message,
            'statusCode' => $statusCode,
        ];
        $response['data'] = $data;
        return response()->json($response, $statusCode);
    }
    public static function resError($message, $data, int $statusCode = 400): JsonResponse
    {
        $response = [
            'status' => false,
            'message' => $message,
        ];
        $response['error'] = $data;
        return response()->json($response, $statusCode);
    }

    public static function validationError($errors, string $message = 'Bad request'): JsonResponse
    {
        return response()->json([
            'status' => 'error',
            'message' => $message,
            'data' => $errors,
            'statusCode' => 400
        ], 400);
    }
}
