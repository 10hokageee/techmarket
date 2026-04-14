import { categoryMap } from "./category";

export const fromSlug = (slug: string) => {
  return categoryMap[slug as keyof typeof categoryMap];
};
