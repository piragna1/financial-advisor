export function validatePrincipal(principal){
    
  if (typeof principal !== "number" || isNaN(principal))
    throw new Error("Principal must be a valid number");

}