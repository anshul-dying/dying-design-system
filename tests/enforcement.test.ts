import { test, describe } from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import { ESLint } from "eslint";

describe("Strict Dying Design System Enforcement Suite", () => {
  // Use the root app ESLint configuration file
  const appEslintConfigPath = path.resolve(
    process.cwd(),
    "../../frontend/app/eslint.config.mjs"
  );

  const eslint = new ESLint({
    overrideConfigFile: appEslintConfigPath,
  });

  test("prohibits raw HTML <button> in application code", async () => {
    const code = `import React from 'react';\nexport const Bad = () => <button type="button">Click</button>;\n`;
    const [result] = await eslint.lintText(code, { filePath: "src/app/example.tsx" });

    const messages = result.messages.map((m) => m.message);
    assert.ok(
      messages.some((msg) =>
        msg.includes("Do not use raw <button>. Use Button or IconButton from @mp/dying")
      ),
      `Expected button restriction error, but got: ${JSON.stringify(messages)}`
    );
  });

  test("prohibits raw HTML <input> in application code", async () => {
    const code = `import React from 'react';\nexport const Bad = () => <input type="text" placeholder="name" />;\n`;
    const [result] = await eslint.lintText(code, { filePath: "src/app/example.tsx" });

    const messages = result.messages.map((m) => m.message);
    assert.ok(
      messages.some((msg) =>
        msg.includes("Do not use raw <input>. Use Input from @mp/dying")
      ),
      `Expected input restriction error, but got: ${JSON.stringify(messages)}`
    );
  });

  test("prohibits raw HTML <textarea> in application code", async () => {
    const code = `import React from 'react';\nexport const Bad = () => <textarea defaultValue="notes" />;\n`;
    const [result] = await eslint.lintText(code, { filePath: "src/app/example.tsx" });

    const messages = result.messages.map((m) => m.message);
    assert.ok(
      messages.some((msg) =>
        msg.includes("Do not use raw <textarea>. Use Textarea from @mp/dying")
      ),
      `Expected textarea restriction error, but got: ${JSON.stringify(messages)}`
    );
  });

  test("prohibits raw HTML <select> in application code", async () => {
    const code = `import React from 'react';\nexport const Bad = () => <select><option>Option 1</option></select>;\n`;
    const [result] = await eslint.lintText(code, { filePath: "src/app/example.tsx" });

    const messages = result.messages.map((m) => m.message);
    assert.ok(
      messages.some((msg) =>
        msg.includes("Do not use raw <select>. Use Select from @mp/dying")
      ),
      `Expected select restriction error, but got: ${JSON.stringify(messages)}`
    );
  });

  test("prohibits inline style attributes in application code", async () => {
    const code = `import React from 'react';\nexport const Bad = () => <div style={{ color: "#ffffff", padding: "10px" }}>Text</div>;\n`;
    const [result] = await eslint.lintText(code, { filePath: "src/app/example.tsx" });

    const messages = result.messages.map((m) => m.message);
    assert.ok(
      messages.some((msg) =>
        msg.includes("Inline styles are prohibited in application code")
      ),
      `Expected inline styles restriction error, but got: ${JSON.stringify(messages)}`
    );
  });

  test("prohibits arbitrary Tailwind hex color classes in application code", async () => {
    const code = `import React from 'react';\nexport const Bad = () => <div className="p-4 bg-[#1e1e22] text-[#86868b]">Card</div>;\n`;
    const [result] = await eslint.lintText(code, { filePath: "src/app/example.tsx" });

    const messages = result.messages.map((m) => m.message);
    assert.ok(
      messages.some((msg) =>
        msg.includes("Arbitrary hex classes (e.g. bg-[#...], text-[#...]) are prohibited")
      ),
      `Expected arbitrary hex class error, but got: ${JSON.stringify(messages)}`
    );
  });

  test("prohibits unauthorized competing UI component libraries", async () => {
    const code = `import { Button } from '@mui/material';\nexport const Bad = () => <Button>MUI</Button>;\n`;
    const [result] = await eslint.lintText(code, { filePath: "src/app/example.tsx" });

    const messages = result.messages.map((m) => m.message);
    assert.ok(
      messages.some((msg) =>
        msg.includes("Competing UI libraries are prohibited. Use @mp/dying.")
      ),
      `Expected restricted import error, but got: ${JSON.stringify(messages)}`
    );
  });

  test("allows legitimate @mp/dying component usage with semantic tokens", async () => {
    const code = `import React from 'react';\nimport { Button, Input, Card, Text } from '@mp/dying';\n\nexport const Good = () => (\n  <Card variant="glass" className="p-4 bg-surface text-text-primary">\n    <Text variant="primary">Title</Text>\n    <Input placeholder="Search" />\n    <Button variant="primary">Submit</Button>\n  </Card>\n);\n`;
    const [result] = await eslint.lintText(code, { filePath: "src/app/example.tsx" });

    assert.strictEqual(
      result.errorCount,
      0,
      `Expected 0 errors for valid Dying usage, but got: ${JSON.stringify(result.messages)}`
    );
  });
});
