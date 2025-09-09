export function hasEmoji(input){
    const emojiRegex =/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E6}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/u;
    return emojiRegex.test(input);
}

const testCases = [
  {
    label: "✅ No emoji: plain ASCII",
    input: "HelloWorld123",
    expected: false
  },
  {
    label: "✅ No emoji: accented characters",
    input: "José María",
    expected: false
  },
  {
    label: "✅ No emoji: punctuation",
    input: "Hello, world!",
    expected: false
  },
  {
    label: "✅ No emoji: Unicode letters",
    input: "字母абвمह",
    expected: false
  },
  {
    label: "✅ No emoji: whitespace only",
    input: "     ",
    expected: false
  },
  {
    label: "✅ No emoji: empty string",
    input: "",
    expected: false
  },
  {
    label: "❌ Contains emoji: single emoticon",
    input: "🔥",
    expected: true
  },
  {
    label: "❌ Contains emoji: multiple emojis",
    input: "🚀🌟💡",
    expected: true
  },
  {
    label: "❌ Contains emoji: mixed with text",
    input: "Launch 🚀 now!",
    expected: true
  },
  {
    label: "❌ Contains emoji: flag sequence",
    input: "🇦🇷",
    expected: true
  },
  {
    label: "❌ Contains emoji: weather symbol",
    input: "☀️",
    expected: true
  },
  {
    label: "❌ Contains emoji: transport symbol",
    input: "✈️",
    expected: true
  },
  {
    label: "❌ Contains emoji: composite emoji",
    input: "👨‍👩‍👧‍👦",
    expected: true
  },
  {
    label: "❌ Contains emoji: emoji with skin tone modifier",
    input: "👍🏽",
    expected: true
  },
  {
    label: "❌ Contains emoji: emoji with variation selector",
    input: "✊🏻",
    expected: true
  },
  {
    label: "✅ No emoji: digit string",
    input: "1234567890",
    expected: false
  },
  {
    label: "✅ No emoji: symbols not in emoji blocks",
    input: "@#$%^&*()",
    expected: false
  },
  {
    label: "❌ Contains emoji: random emoji in middle",
    input: "secure🔥Pass123",
    expected: true
  }
];

for (const { label, input, expected } of testCases) {
  const result = hasEmoji(input);
  const pass = result === expected;
  console.log(`${label}: ${pass ? "✅ Pass" : `❌ Fail (got ${result})`}`);
}
