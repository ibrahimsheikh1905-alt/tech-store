export function getProductPrice(product, selectedVariantId = null) {
  if (!product) return 0;

  // ================= VARIANT BASED =================
  if (Array.isArray(product.variants) && product.variants.length > 0) {
    // 🔹 Selected variant price
    if (selectedVariantId) {
      const variant = product.variants.find(
        (v) =>
          v._id?.toString() === selectedVariantId?.toString() ||
          v.sku === selectedVariantId
      );

      if (variant?.price && !isNaN(variant.price)) {
        return Number(variant.price);
      }
    }

    // 🔹 Fallback → lowest variant price
    const prices = product.variants
      .map((v) => Number(v.price))
      .filter((p) => !isNaN(p) && p > 0);

    if (prices.length > 0) {
      return Math.min(...prices);
    }
  }

  // ================= SIMPLE PRODUCT =================
  return Number(product.price) || 0;
}