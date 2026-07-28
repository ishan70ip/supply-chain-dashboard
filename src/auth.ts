export const DEMO_USERNAME = 'ishan123';
const DEMO_PASSWORD = '12345';

const SESSION_KEY = 'meridian-session';

export function validateCredentials(username: string, password: string): boolean {
  return username.trim() === DEMO_USERNAME && password === DEMO_PASSWORD;
}

export function isAuthenticated(): boolean {
  try {
    return localStorage.getItem(SESSION_KEY) === 'authenticated';
  } catch {
    return false;
  }
}

export function signIn(username: string, password: string): { ok: boolean; error?: string } {
  if (!username.trim() || !password) {
    return { ok: false, error: 'Please enter both username and password.' };
  }
  if (!validateCredentials(username, password)) {
    return { ok: false, error: 'Invalid username or password. Try the demo credentials below.' };
  }
  try {
    localStorage.setItem(SESSION_KEY, 'authenticated');
    localStorage.setItem('meridian-user', username.trim());
  } catch {
    // Storage unavailable (private mode) — still allow the session in memory.
  }
  return { ok: true };
}

export function signOut(): void {
  try {
    localStorage.removeItem(SESSION_KEY);
    localStorage.removeItem('meridian-user');
  } catch {
    // ignore
  }
}

export function currentUser(): string {
  try {
    return localStorage.getItem('meridian-user') || DEMO_USERNAME;
  } catch {
    return DEMO_USERNAME;
  }
}
