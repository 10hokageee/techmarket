import type { Signboard } from "../types/Signboard";
import { getData } from "../utils/httpClient";

export function getSignboardService() {
  return getData<Signboard[]>('/market/signboards/');
}
