const config = {
  apiEndpoint: process.env.REACT_APP_FIREBASE_DATABASE_URL || '',
  isFireBase: true
}

export const isConfigured = Boolean(
  config.apiEndpoint && process.env.REACT_APP_FIREBASE_KEY
)

export default config
