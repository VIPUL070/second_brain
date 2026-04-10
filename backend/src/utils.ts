export function generateRandom(len: number): string {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  const array = new Uint32Array(len);
  crypto.getRandomValues(array);

  return Array.from(array, (x) => chars[x % chars.length]).join("");
}