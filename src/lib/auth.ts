import { pb } from "./pb";

export const authenticateUser = async (username: string, password: string): Promise<Boolean> => {
  try {
    await pb.collection("users").authWithPassword(username, password);
  } catch (_) {
    return false;
  }
  return pb.authStore.isValid;
};

export function logout() {
  pb.authStore.clear();
}

export const isAuthenticated = (): boolean => {
  return pb.authStore.isValid;
};
