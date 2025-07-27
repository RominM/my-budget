export function formatEuro(price) {
  return price.toFixed(2).replace(".", ",") + " €";
}
