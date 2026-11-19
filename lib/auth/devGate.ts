export const DEV_AUTH_COOKIE = "studygrove-dev-auth";
export const DEV_AUTH_SESSION_KEY = "studygrove.devAuth";

const COOKIE_MAX_AGE = 60 * 60 * 24 * 30;

export function markDevGateAuthenticated(): void {
  if (typeof document === "undefined") return;
  document.cookie = `${DEV_AUTH_COOKIE}=1; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
  try {
    sessionStorage.setItem(DEV_AUTH_SESSION_KEY, "1");
  } catch {
    // ignore quota / private mode
  }
}

export function clearDevGateAuthenticated(): void {
  if (typeof document === "undefined") return;
  document.cookie = `${DEV_AUTH_COOKIE}=; path=/; max-age=0; SameSite=Lax`;
  try {
    sessionStorage.removeItem(DEV_AUTH_SESSION_KEY);
  } catch {
    // ignore
  }
}

export function isDevGateAuthenticatedClient(): boolean {
  if (typeof document === "undefined") return false;
  try {
    if (sessionStorage.getItem(DEV_AUTH_SESSION_KEY) === "1") return true;
  } catch {
    // ignore
  }
  return document.cookie.split(";").some((c) => c.trim().startsWith(`${DEV_AUTH_COOKIE}=1`));
}