import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  { files: ["components/admin/bay-planner/Planner.tsx"], rules: { "react-hooks/preserve-manual-memoization": "off" } },
  { files: ["components/admin/bay-planner/pdf.ts"], rules: { "prefer-const": "off" } },
  { files: ["app/admin/invoices/**/*.tsx", "app/api/admin/invoices/**/*.ts", "components/admin/invoices/**/*.tsx", "lib/invoices/**/*.ts"], rules: { "@typescript-eslint/no-explicit-any": "off", "@typescript-eslint/no-unused-vars": "off" } },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
