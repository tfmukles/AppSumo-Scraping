import products from "@/app/data.json";

export const getCategories = () => {
  const categories = new Set();
  const subCategories = new Set();
  products.forEach((product) => {
    categories.add(product.taxonomy.category?.value_enumeration);
    subCategories.add(product.taxonomy.subcategory?.value_enumeration);
  });

  const categoriesArray = Array.from(categories);
  const subCategoriesArray = Array.from(subCategories);

  return {
    categories: categoriesArray.map((category) => {
      return {
        label: category as string,
        products: products.filter(
          (product) => product.taxonomy.category?.value_enumeration === category
        ),
      };
    }),
    subCategories: subCategoriesArray.map((subcategory) => {
      return {
        label: subcategory as string,
        products: products.filter(
          (product) =>
            product.taxonomy.subcategory?.value_enumeration === subcategory
        ),
      };
    }),
  };
};
