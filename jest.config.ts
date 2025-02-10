import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  clearMocks: true,
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  testMatch: ["**/__tests__/**/*.test.*"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@/assets/(.*)$": "<rootDir>/public/assets/$1",
  },
};

export default createJestConfig(config);
