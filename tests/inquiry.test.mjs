import test from "node:test";
import assert from "node:assert/strict";
import { parseInquiry } from "../lib/inquiry.ts";
const input = {
  name: " Ada Kaya ",
  email: "ada@example.org",
  phone: "",
  service: "tasarim",
  location: "Gebze",
  description: "Konut projesi için bilgi.",
};
test("accepts a complete brief, normalizes whitespace and keeps phone optional", () => {
  assert.deepEqual(parseInquiry(input), { ...input, name: "Ada Kaya" });
});
test("rejects malformed, oversized and unsupported input", () => {
  for (const patch of [
    { email: "a@b" },
    { phone: "123" },
    { phone: "-------" },
    { service: "other" },
    { description: " " },
    { location: "a".repeat(151) },
    { name: 12 },
  ]) {
    assert.equal(parseInquiry({ ...input, ...patch }), null);
  }
  for (const invalid of [null, 3, [], {}])
    assert.equal(parseInquiry(invalid), null);
});
