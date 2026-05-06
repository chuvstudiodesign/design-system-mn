import { getBlogCategories } from "./queries";

export function getBlogCategoryStyle(slug: string) {
  const category = getBlogCategories().find((item) => item.slug === slug);

  if (!category) {
    return {
      backgroundColor: "var(--primary)",
      color: "var(--primary-foreground)",
      borderColor: "transparent",
    };
  }

  return {
    backgroundColor: category.colorHex,
    color: category.textColor,
    borderColor: category.colorHex,
  };
}
