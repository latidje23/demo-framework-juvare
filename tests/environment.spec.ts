import { test, expect } from "@playwright/test";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { getBaseUrl, loadEnvironment } from "../utils/environment";
import { getDemoCredentials, type DemoAccount } from "./data/users";

test("environment file is optional and the default URL works without it", async () => {
  const environment: NodeJS.ProcessEnv = {};
  const directory = await mkdtemp(join(tmpdir(), "saucedemo-env-"));
  try {
    loadEnvironment(join(directory, ".env"), environment);
    expect(getBaseUrl(environment)).toBe("https://www.saucedemo.com/");
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});

test("environment file provides a URL while process values take precedence", async () => {
  const directory = await mkdtemp(join(tmpdir(), "saucedemo-env-"));
  try {
    const path = join(directory, ".env");
    await writeFile(path, "BASE_URL=https://example.test/\n");
    const fromFile: NodeJS.ProcessEnv = {};
    loadEnvironment(path, fromFile);
    expect(getBaseUrl(fromFile)).toBe("https://example.test/");

    const override: NodeJS.ProcessEnv = { BASE_URL: "https://override.test/" };
    loadEnvironment(path, override);
    expect(getBaseUrl(override)).toBe("https://override.test/");
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});

test("the example file provides the SauceDemo URL", () => {
  const environment: NodeJS.ProcessEnv = {};
  loadEnvironment(resolve(__dirname, "../.env.example"), environment);
  expect(environment.BASE_URL).toBe("https://www.saucedemo.com/");
});

test("the example file provides credentials for each public demo account", () => {
  const environment: NodeJS.ProcessEnv = {};
  loadEnvironment(resolve(__dirname, "../.env.example"), environment);
  const accounts: DemoAccount[] = ["standard", "lockedOut", "problem", "performanceGlitch", "error", "visual"];
  for (const account of accounts) {
    const credentials = getDemoCredentials(account, environment);
    expect(credentials.username).toBeTruthy();
    expect(credentials.password).toBeTruthy();
  }
});

test("process credentials take precedence over values loaded from a file", async () => {
  const directory = await mkdtemp(join(tmpdir(), "saucedemo-credentials-"));
  try {
    const path = join(directory, ".env");
    await writeFile(path, "STANDARD_USER=file-user\nSAUCEDEMO_PASSWORD=file-password\n");
    const environment: NodeJS.ProcessEnv = {
      STANDARD_USER: "process-user",
      SAUCEDEMO_PASSWORD: "process-password",
    };
    loadEnvironment(path, environment);
    expect(getDemoCredentials("standard", environment)).toEqual({
      username: "process-user",
      password: "process-password",
    });
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});

test("missing and empty demo credentials fail with the variable name", () => {
  expect(() => getDemoCredentials("standard", {})).toThrow(/STANDARD_USER/);
  expect(() => getDemoCredentials("standard", { STANDARD_USER: "user" })).toThrow(/SAUCEDEMO_PASSWORD/);
  expect(() => getDemoCredentials("standard", { STANDARD_USER: " ", SAUCEDEMO_PASSWORD: "password" })).toThrow(/STANDARD_USER/);
  expect(() => getDemoCredentials("standard", { STANDARD_USER: "user", SAUCEDEMO_PASSWORD: "" })).toThrow(/SAUCEDEMO_PASSWORD/);
});

test("Playwright uses the resolved base URL", () => {
  expect(test.info().project.use.baseURL).toBe(getBaseUrl());
});

test("invalid base URLs are rejected", () => {
  for (const value of ["", "not-a-url", "file:///tmp", "https://user:password@example.test/"]) {
    expect(() => getBaseUrl({ BASE_URL: value })).toThrow(/BASE_URL/);
  }
});
