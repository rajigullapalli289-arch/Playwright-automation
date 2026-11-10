require('dotenv').config({ quiet: true });

function required(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `Missing environment variable ${name}. Copy .env.example to .env and fill it in, or set it in your shell or CI secrets.`
    );
  }
  return value;
}

module.exports = {
  // Same email on every site
  get email() { return required('APP_EMAIL'); },
  // rahulshettyacademy.com/client
  get clientPassword() { return required('CLIENT_PASSWORD'); },
  // eventhub.rahulshettyacademy.com
  get eventhubPassword() { return required('EVENTHUB_PASSWORD'); },
};
