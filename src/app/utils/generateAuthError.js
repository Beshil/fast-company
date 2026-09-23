export function generateAuthError(message) {
  switch (message) {
    case 'INVALID_LOGIN_CREDENTIALS':
    case 'EMAIL_NOT_FOUND':
    case 'INVALID_PASSWORD':
      return 'Email или пароль введены некорректно'
    case 'EMAIL_EXISTS':
      return 'Пользователь с таким Email уже существует'
    default:
      return 'Не удалось выполнить вход или регистрацию. Проверьте данные и попробуйте ещё раз.'
  }
}
