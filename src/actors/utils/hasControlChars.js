export function hasControlChars(input){
    return /[\x00-\x1F\x7F]/.test(input);
}


const testCases = [
  {
    label: "✅ Clean ASCII string",
    input: "HelloWorld123",
    expected: false
  },
  {
    label: "✅ String with accented characters",
    input: "José María",
    expected: false
  },
  {
    label: "✅ Emoji-only string",
    input: "🔥💡🚀",
    expected: false
  },
  {
    label: "✅ Unicode letters from other scripts",
    input: "字母абвم",
    expected: false
  },
  {
    label: "❌ Contains newline character",
    input: "Hello\nWorld",
    expected: true
  },
  {
    label: "❌ Contains tab character",
    input: "Hello\tWorld",
    expected: true
  },
  {
    label: "❌ Contains carriage return",
    input: "Hello\rWorld",
    expected: true
  },
  {
    label: "❌ Contains backspace",
    input: "Hello\bWorld",
    expected: true
  },
  {
    label: "❌ Contains vertical tab",
    input: "Hello\vWorld",
    expected: true
  },
  {
    label: "❌ Contains form feed",
    input: "Hello\fWorld",
    expected: true
  },
  {
    label: "❌ Contains null character",
    input: "Hello\u0000World",
    expected: true
  },
  {
    label: "❌ Contains escape character",
    input: "Hello\u001BWorld",
    expected: true
  },
  {
    label: "❌ Contains delete character (DEL)",
    input: "Hello\u007FWorld",
    expected: true
  },
  {
    label: "✅ Empty string",
    input: "",
    expected: false
  },
  {
    label: "✅ Whitespace only",
    input: "     ",
    expected: false
  },
  {
    label: "❌ Control character only",
    input: "\x1F",
    expected: true
  },
  {
    label: "❌ Multiple control characters",
    input: "\n\t\r",
    expected: true
  },
  {
    label: "✅ String with hyphen and apostrophe",
    input: "Jean-Luc O'Connor",
    expected: false
  },
  {
    label: "✅ String with punctuation",
    input: "Hello, world!",
    expected: false
  }
];

for (const { label, input, expected } of testCases) {
  const result = hasControlChars(input);
  const pass = result === expected;
  console.log(`${label}: ${pass ? "✅ Pass" : `❌ Fail (got ${result})`}`);
}
