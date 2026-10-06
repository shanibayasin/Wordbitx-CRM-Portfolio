const invalidCredentialsErrors = new Set([
  'credentialssignin',
  'incorrect password',
  'no user found with this email',
  'invalid email or password',
  'please enter an email and password',
]);

export function getSignInErrorMessage(error?: string | null): string {
  if (error && invalidCredentialsErrors.has(error.trim().toLowerCase())) {
    return 'Email or password is incorrect. Please try again.';
  }

  return 'Sign-in is temporarily unavailable. Please try again later or contact your administrator.';
}
