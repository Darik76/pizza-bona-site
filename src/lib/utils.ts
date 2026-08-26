export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/** 14.5 → « 14,50 € » */
export function formaterPrix(prix: number): string {
  return `${prix.toFixed(2).replace(".", ",")} €`;
}
