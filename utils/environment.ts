import { config } from "dotenv";

export function loadEnvironment(path: string, environment: NodeJS.ProcessEnv = process.env): void {
  const result = config({ path, processEnv: environment, quiet: true });
  if (result.error && !("code" in result.error && result.error.code === "ENOENT")) {
    throw result.error;
  }
}

export function getBaseUrl(environment: NodeJS.ProcessEnv = process.env): string {
  const value = environment.BASE_URL ?? "https://www.saucedemo.com/";
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    throw new Error("BASE_URL must be an absolute HTTP or HTTPS URL.");
  }
  if ((url.protocol !== "http:" && url.protocol !== "https:") || url.username || url.password) {
    throw new Error("BASE_URL must be an absolute HTTP or HTTPS URL without credentials.");
  }
  return value;
}
