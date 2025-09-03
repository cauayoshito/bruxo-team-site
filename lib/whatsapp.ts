export function waLink(number: string, text: string) {
  const msg = encodeURIComponent(text);
  return `https://wa.me/${number}?text=${msg}`;
}
