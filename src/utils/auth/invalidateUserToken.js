export function invalidateUserToken(token){
    token.signature = 'invalid :P';
    return token;
}



function testInvalidateUserToken() {
  const originalToken = {
    userId: "abc123",
    issuedAt: 1690000000,
    signature: "valid-signature"
  };

  const result = invalidateUserToken(originalToken);

  console.log("🔍 originalToken.signature:", originalToken.signature);
  console.log("🔍 result.signature:", result.signature);
  console.log("🔍 result === originalToken:", result === originalToken);

  const isSignatureInvalid = result.signature === "invalid :P";
  const isSameReference = result === originalToken;
  const isOtherFieldsIntact =
    result.userId === "abc123" && result.issuedAt === 1690000000;

  if (isSignatureInvalid && isSameReference && isOtherFieldsIntact) {
    console.log("✅ invalidateUserToken → passed");
  } else {
    console.error("❌ invalidateUserToken → failed");
    if (!isSignatureInvalid) console.error("  ✘ Signature was not invalidated");
    if (!isSameReference) console.error("  ✘ Returned object is not the same reference");
    if (!isOtherFieldsIntact) console.error("  ✘ Other fields were altered");
  }
}

testInvalidateUserToken();
