export function isEmail(str: string): boolean {
  return /\S+@\S+\.\S+/.test(str);
}