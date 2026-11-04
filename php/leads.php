<?php
/**
 * POST /leads — receives a lead from the website forms and emails it over SMTP.
 * Mirrors src/lib/validation/lead-form-schema.ts; the browser already validated,
 * this validates again because the endpoint is public.
 */

declare(strict_types=1);

require __DIR__ . '/smtp.php';

$configPath = __DIR__ . '/config.php';
if (!is_file($configPath)) {
    respond(500, ['error' => 'server_misconfigured']);
}
$config = require $configPath;

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, $config['allowed_origins'], true)) {
    header('Access-Control-Allow-Origin: ' . $origin);
    header('Vary: Origin');
    header('Access-Control-Allow-Headers: Content-Type');
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Max-Age: 86400');
}

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

if ($method === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($method !== 'POST') {
    header('Allow: POST, OPTIONS');
    respond(405, ['error' => 'method_not_allowed']);
}

$payload = json_decode((string) file_get_contents('php://input'), true);
if (!is_array($payload)) {
    respond(400, ['error' => 'invalid_json']);
}

$lead = validate($payload);
if (isset($lead['error'])) {
    respond(422, $lead);
}

$subject = sprintf('Nouveau lead — %s (%s)', $lead['name'], $lead['source']);
$body = implode("\n", [
    'Nom      : ' . $lead['name'],
    'Email    : ' . $lead['email'],
    'Téléphone: ' . $lead['phone'],
    'Société  : ' . ($lead['company'] !== '' ? $lead['company'] : '—'),
    'Source   : ' . $lead['source'],
    'Reçu le  : ' . date('Y-m-d H:i:s T'),
    'IP       : ' . ($_SERVER['REMOTE_ADDR'] ?? 'unknown'),
]);

try {
    (new Smtp($config['smtp']))->send(
        $config['from'],
        $config['to'],
        $subject,
        $body,
        ['Reply-To' => $lead['email']]
    );
} catch (Throwable $exception) {
    // The message text can carry SMTP credentials context — log it, never return it.
    error_log('[leads] ' . $exception->getMessage());
    respond(502, ['error' => 'delivery_failed']);
}

respond(200, ['ok' => true]);

/**
 * @param array<mixed> $payload
 * @return array{name:string,email:string,phone:string,company:string,source:string}|array{error:string,field:string}
 */
function validate(array $payload): array
{
    $field = static fn(string $key): string => trim((string) ($payload[$key] ?? ''));

    $name = $field('name');
    if (mb_strlen($name) < 2 || mb_strlen($name) > 120) {
        return ['error' => 'invalid_field', 'field' => 'name'];
    }

    $email = $field('email');
    if (filter_var($email, FILTER_VALIDATE_EMAIL) === false || mb_strlen($email) > 254) {
        return ['error' => 'invalid_field', 'field' => 'email'];
    }

    $phone = $field('phone');
    if (mb_strlen($phone) < 6 || mb_strlen($phone) > 30) {
        return ['error' => 'invalid_field', 'field' => 'phone'];
    }

    $company = $field('company');
    if (mb_strlen($company) > 120) {
        return ['error' => 'invalid_field', 'field' => 'company'];
    }

    $source = $field('source');
    if (!in_array($source, ['contact_page', 'book_demo_page', 'homepage_final_cta'], true)) {
        return ['error' => 'invalid_field', 'field' => 'source'];
    }

    return compact('name', 'email', 'phone', 'company', 'source');
}

/** @param array<string,mixed> $body */
function respond(int $status, array $body): never
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($body, JSON_UNESCAPED_UNICODE);
    exit;
}
