CERT_DIR="$(cd "$(dirname "$0")/.." && pwd)/.certs"
CRT="$CERT_DIR/localhost.crt"
KEY="$CERT_DIR/localhost.key"

mkdir -p "$CERT_DIR"

if [ -f "$CRT" ] && [ -f "$KEY" ]; then
	echo "SSL certificate already exists in $CERT_DIR. Skipping certificate generation."
	exit 0
fi

echo "Generating self-signed cert "
openssl req -x509 -newkey rsa:2048 -nodes -days 365 \
	-subj "/CN=localhost" -keyout "$KEY" -out "$CRT" || true

chmod 600 "$KEY" 2>/dev/null || true
echo "Wrote $CRT and $KEY"