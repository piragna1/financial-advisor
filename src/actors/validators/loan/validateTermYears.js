export function validateTermYears(termYears) {
  if (typeof termYears !== "number" || isNaN(termYears))
    throw new Error("termYears must be a valid number");
}