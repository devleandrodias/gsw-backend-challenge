import { pathsToModuleNameMapper } from "ts-jest";
import { compilerOptions } from "./tsconfig.json";

export default {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ["<rootDir>/src/modules/**/*service.ts"],
  coverageDirectory: "coverage",
  coveragePathIgnorePatterns: ["/node_modules/"],
  coverageProvider: "v8",
  coverageReporters: ["json", "text", "lcov", "clover"],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: "<rootDir>/src",
  }),
  preset: "ts-jest",
  setupFiles: ["dotenv/config"],
  testEnvironment: "node",
  testMatch: ["**/test/**/*.test.ts"],
};
