export const decodeGoogleSpecialCharacters = (text) => {
  // Decode HTML entities
  text = text?.replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(dec));
  // Decode common special characters
  const specialCharacters = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&apos;': "'",
    // Add more special characters as needed
  };
  for (const [encoded, decoded] of Object.entries(specialCharacters)) {
    const regex = new RegExp(encoded, 'g');
    text = text?.replace(regex, decoded);
  }
  return text;
};
