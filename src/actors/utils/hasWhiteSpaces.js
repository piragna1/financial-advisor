export function hasWhiteSpaces(input){
    return /\s/.test(input); // includes tabs, newlines, NBSP, etc.
// }
// const testCases = [
//   {
//     label: "✅ No whitespace: plain ASCII",
//     input: "HelloWorld123",
//     expected: false
//   },
//   {
//     label: "✅ No whitespace: accented characters",
//     input: "JoséMaría",
//     expected: false
//   },
//   {
//     label: "✅ No whitespace: emoji string",
//     input: "🔥💡🚀",
//     expected: false
//   },
//   {
//     label: "✅ No whitespace: punctuation",
//     input: "Hello,world!",
//     expected: false
//   },
//   {
//     label: "❌ Contains space in middle",
//     input: "Hello World",
//     expected: true
//   },
//   {
//     label: "❌ Contains leading space",
//     input: " HelloWorld",
//     expected: true
//   },
//   {
//     label: "❌ Contains trailing space",
//     input: "HelloWorld ",
//     expected: true
//   },
//   {
//     label: "❌ Contains multiple spaces",
//     input: "Hello   World",
//     expected: true
//   },
//   {
//     label: "❌ Contains space between emojis",
//     input: "🔥 🚀",
//     expected: true
//   },
//   {
//     label: "❌ Contains space between words with punctuation",
//     input: "Hello, World!",
//     expected: true
//   },
//   {
//     label: "❌ Contains only space",
//     input: " ",
//     expected: true
//   },
//   {
//     label: "✅ Empty string",
//     input: "",
//     expected: false
//   },
//   {
//     label: "❌ Contains tab character (not detected)",
//     input: "Hello\tWorld",
//     expected: false // tab is not a space
//   },
//   {
//     label: "❌ Contains newline character (not detected)",
//     input: "Hello\nWorld",
//     expected: false // newline is not a space
//   },
//   {
//     label: "❌ Contains non-breaking space (Unicode)",
//     input: "Hello\u00A0World",
//     expected: false // not detected by .includes(' ')
//   },
//   {
//     label: "✅ No whitespace: hyphenated name",
//     input: "Jean-Luc",
//     expected: false
//   },
//   {
//     label: "✅ No whitespace: apostrophe name",
//     input: "O'Connor",
//     expected: false
//   }
// ];

// for (const { label, input, expected } of testCases) {
//   const result = hasWhiteSpaces(input);
//   const pass = result === expected;
//   console.log(`${label}:
//     INPUT:${input}  
//     PASS?: ${pass ? "✅ Pass" : `❌ Fail (got ${result})`}`);
// }
