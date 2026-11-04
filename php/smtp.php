<?php
/**
 * Minimal SMTP client: connect, authenticate, send one plain-text message.
 * No dependencies — the host only needs openssl for tls/ssl.
 */

declare(strict_types=1);

final class SmtpException extends RuntimeException {}

final class Smtp
{
    /** @var resource */
    private $socket;

    /** @param array{host:string,port:int,encryption:string,username:string,password:string,timeout:int} $config */
    public function __construct(private array $config) {}

    /**
     * @param array{email:string,name:string} $from
     * @param array{email:string,name:string} $to
     * @param array<string,string> $extraHeaders
     */
    public function send(array $from, array $to, string $subject, string $body, array $extraHeaders = []): void
    {
        $this->connect();

        try {
            $this->command('MAIL FROM:<' . $from['email'] . '>', [250]);
            $this->command('RCPT TO:<' . $to['email'] . '>', [250, 251]);
            $this->command('DATA', [354]);
            $this->write($this->buildMessage($from, $to, $subject, $body, $extraHeaders) . "\r\n.");
            $this->expect([250]);
            $this->command('QUIT', [221]);
        } finally {
            if (is_resource($this->socket)) {
                fclose($this->socket);
            }
        }
    }

    private function connect(): void
    {
        $scheme = $this->config['encryption'] === 'ssl' ? 'ssl://' : 'tcp://';
        $socket = @stream_socket_client(
            $scheme . $this->config['host'] . ':' . $this->config['port'],
            $errno,
            $errstr,
            $this->config['timeout'],
            STREAM_CLIENT_CONNECT
        );

        if ($socket === false) {
            throw new SmtpException(sprintf('SMTP connect failed: %s (%d)', $errstr, $errno));
        }

        $this->socket = $socket;
        stream_set_timeout($this->socket, $this->config['timeout']);
        $this->expect([220]);

        $hostname = gethostname() ?: 'localhost';
        $this->command('EHLO ' . $hostname, [250]);

        if ($this->config['encryption'] === 'tls') {
            $this->command('STARTTLS', [220]);
            if (!stream_socket_enable_crypto($this->socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) {
                throw new SmtpException('STARTTLS negotiation failed');
            }
            // The server forgets everything announced before the handshake.
            $this->command('EHLO ' . $hostname, [250]);
        }

        if ($this->config['username'] !== '') {
            $this->command('AUTH LOGIN', [334]);
            $this->command(base64_encode($this->config['username']), [334]);
            $this->command(base64_encode($this->config['password']), [235]);
        }
    }

    /** @param int[] $expected */
    private function command(string $line, array $expected): string
    {
        $this->write($line);
        return $this->expect($expected);
    }

    private function write(string $line): void
    {
        if (fwrite($this->socket, $line . "\r\n") === false) {
            throw new SmtpException('Failed writing to SMTP socket');
        }
    }

    /** @param int[] $expected */
    private function expect(array $expected): string
    {
        $response = '';

        do {
            $line = fgets($this->socket, 515);
            if ($line === false) {
                throw new SmtpException('SMTP connection closed while awaiting a reply');
            }
            $response .= $line;
            // A multiline reply keeps a hyphen after the status code: "250-SIZE".
        } while (isset($line[3]) && $line[3] === '-');

        $code = (int) substr($response, 0, 3);
        if (!in_array($code, $expected, true)) {
            throw new SmtpException('Unexpected SMTP reply: ' . trim($response));
        }

        return $response;
    }

    /**
     * @param array{email:string,name:string} $from
     * @param array{email:string,name:string} $to
     * @param array<string,string> $extraHeaders
     */
    private function buildMessage(array $from, array $to, string $subject, string $body, array $extraHeaders): string
    {
        $headers = [
            'Date' => date('r'),
            'From' => $this->address($from),
            'To' => $this->address($to),
            'Subject' => $this->encodeHeader($subject),
            'Message-ID' => '<' . bin2hex(random_bytes(16)) . '@' . $this->config['host'] . '>',
            'MIME-Version' => '1.0',
            'Content-Type' => 'text/plain; charset=UTF-8',
            'Content-Transfer-Encoding' => '8bit',
        ] + $extraHeaders;

        $lines = [];
        foreach ($headers as $name => $value) {
            $lines[] = $name . ': ' . $value;
        }
        $lines[] = '';

        foreach (explode("\n", str_replace("\r\n", "\n", $body)) as $line) {
            // Dot-stuffing: a lone leading dot would terminate the DATA block.
            $lines[] = str_starts_with($line, '.') ? '.' . $line : $line;
        }

        return implode("\r\n", $lines);
    }

    /** @param array{email:string,name:string} $address */
    private function address(array $address): string
    {
        return $address['name'] === ''
            ? $address['email']
            : $this->encodeHeader($address['name']) . ' <' . $address['email'] . '>';
    }

    private function encodeHeader(string $value): string
    {
        // Strip CR/LF so caller-supplied text can never inject extra headers.
        $value = str_replace(["\r", "\n"], ' ', $value);

        return preg_match('/[^\x20-\x7E]/', $value) === 1
            ? '=?UTF-8?B?' . base64_encode($value) . '?='
            : $value;
    }
}
