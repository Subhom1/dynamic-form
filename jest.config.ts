// jest.config.mjs
module.exports = {
  testEnvironment: "jsdom",
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": "ts-jest",
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  testPathIgnorePatterns: ["/node_modules/", "/dist/", "/build/"],
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json",
    },
  },
};
// This file is used to configure Jest for the project.
// It sets up the testing environment, module name mappings, and file transformations.
