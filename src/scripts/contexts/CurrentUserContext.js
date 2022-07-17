import { createContext } from "react";

export const CurrentUserContext = createContext();
export function getCurrentUser(data) {
  return data;
}
