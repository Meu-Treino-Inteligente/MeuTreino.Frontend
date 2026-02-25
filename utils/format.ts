/**
 * Formata valor numérico como preço no padrão brasileiro: R$ 1.234,56
 * (R$ na frente, ponto para milhares, vírgula para decimais)
 * Aceita number, string ou null.
 */
export function formatPrice(value: number | string | null | undefined): string {
  if (value === null || value === undefined) return "R$ 0,00";
  const num = typeof value === "string" ? parseFloat(value) : value;
  if (Number.isNaN(num)) return "R$ 0,00";
  const fixed = num.toFixed(2);
  const [intPart, decPart] = fixed.split(".");
  const intWithDots = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `R$ ${intWithDots},${decPart}`;
}
