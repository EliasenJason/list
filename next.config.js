/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  env: {
    FIREBASE_DATABASE_URL: 'https://lists-app-6313a-default-rtdb.firebaseio.com/',
    FIREBASE_API_KEY: "AIzaSyCCtL7yEr29W0t6DCZKoFUfn2B6tX0ha1E",
    FIREBASE_AUTH_DOMAIN: "lists-app-6313a.firebaseapp.com",
    FIREBASE_PROJECT_ID: "lists-app-6313a",
    FIREBASE_STORAGE_BUCKET: "lists-app-6313a.appspot.com",
    FIREBASE_MESSAGING_SENDER_ID: "24697872591",
    FIREBASE_APP_ID: "1:24697872591:web:5fcba90582c77647d857ba",
    FIREBASE_MEASUREMENT_ID: "G-TRBQ0CC7MP",
  }
}

module.exports = nextConfig
