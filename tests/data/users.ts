export type Credentials = {
  username: string;
  password: string;
};

const accountVariables = {
  standard: "STANDARD_USER",
  lockedOut: "LOCKED_OUT_USER",
  problem: "PROBLEM_USER",
  performanceGlitch: "PERFORMANCE_GLITCH_USER",
  error: "ERROR_USER",
  visual: "VISUAL_USER",
} as const;

export type DemoAccount = keyof typeof accountVariables;

function requiredValue(name: string, environment: NodeJS.ProcessEnv): string {
  const value = environment[name];
  if (!value || !value.trim()) {
    throw new Error(`Missing or empty ${name}; configure it in .env or the process environment.`);
  }
  return value;
}

export function getDemoCredentials(
  account: DemoAccount,
  environment: NodeJS.ProcessEnv = process.env,
): Credentials {
  return {
    username: requiredValue(accountVariables[account], environment),
    password: requiredValue("SAUCEDEMO_PASSWORD", environment),
  };
}

export const users = {
  get standard(): Credentials { return getDemoCredentials("standard"); },
  get lockedOut(): Credentials { return getDemoCredentials("lockedOut"); },
  get problem(): Credentials { return getDemoCredentials("problem"); },
  get performanceGlitch(): Credentials { return getDemoCredentials("performanceGlitch"); },
  get error(): Credentials { return getDemoCredentials("error"); },
  get visual(): Credentials { return getDemoCredentials("visual"); },
  invalid: { username: "invalid_user", password: "invalid_password" },
};
