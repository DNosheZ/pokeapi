export const TOKEN_KEY = "poke_token";

export function setToken(token: string, storage: "local" | "session" = "local") {
  const store = storage === "local" ? window.localStorage : window.sessionStorage;
  store.setItem(TOKEN_KEY, token);
}

export function getToken() {
  return window.localStorage.getItem(TOKEN_KEY) || window.sessionStorage.getItem(TOKEN_KEY);
}

export function clearToken() {
  window.localStorage.removeItem(TOKEN_KEY);
  window.sessionStorage.removeItem(TOKEN_KEY);
}

export function fakeJwt(username: string) {
  // token simple de ejemplo (no firmado) para cumplir el requisito
  const payload = { sub: username, iat: Date.now() };
  return btoa(JSON.stringify(payload));
}
