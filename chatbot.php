<?php

// OpenAI API Key (Replace with your own)
$api_key = "YOUR_OPENAI_API_KEY";

// Get user message from the frontend
$user_message = $_POST['message'] ?? '';

// Check if message is empty
if (empty($user_message)) {
    echo json_encode(["response" => "Please enter a message."]);
    exit;
}

// OpenAI API request
$url = "https://api.openai.com/v1/chat/completions";

$data = [
    "model" => "gpt-4",
    "messages" => [
        ["role" => "system", "content" => "You are a helpful AI assistant specializing in web hosting queries."],
        ["role" => "user", "content" => $user_message]
    ],
    "max_tokens" => 200
];

$options = [
    "http" => [
        "header"  => "Content-type: application/json\r\nAuthorization: Bearer " . $api_key,
        "method"  => "POST",
        "content" => json_encode($data)
    ]
];

$context = stream_context_create($options);
$response = file_get_contents($url, false, $context);

// Return AI response
if ($response) {
    $responseData = json_decode($response, true);
    echo json_encode(["response" => $responseData['choices'][0]['message']['content']]);
} else {
    echo json_encode(["response" => "Error: Unable to fetch response."]);
}

?>
