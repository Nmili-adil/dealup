<?php
/**
 * Copy this file to config.php on the server and fill in the SMTP credentials.
 * config.php is gitignored — credentials never live in the repository.
 */

return [
    'smtp' => [
        'host'       => 'smtp.example.com',
        'port'       => 587,          // 587 with 'tls' (STARTTLS), 465 with 'ssl'
        'encryption' => 'tls',        // 'tls' | 'ssl' | 'none'
        'username'   => '',           // SMTP login
        'password'   => '',           // SMTP password / app password
        'timeout'    => 15,
    ],

    // Envelope sender. Must be a mailbox the SMTP account is allowed to send as,
    // otherwise most providers reject the message.
    'from' => [
        'email' => 'no-reply@dealup.ma',
        'name'  => 'Dealup Website',
    ],

    // Where the leads land.
    'to' => [
        'email' => 'contact@dealup.ma',
        'name'  => 'Dealup',
    ],

    // Browsers that may call this endpoint. The site is served from a different
    // origin than the API, so every allowed site origin must be listed here.
    'allowed_origins' => [
        'https://dealup.ma',
        'https://www.dealup.ma',
        'http://localhost:3000',
    ],
];
