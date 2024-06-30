import { TProduct } from "@/app/type";
import { Dispatch, SetStateAction } from "react";

export default function Category({
  title,
  categories,
  setSelectedCategory,
  selectedCategory,
}: {
  title: string;
  categories: { label: string; products: TProduct[] }[];
  selectedCategory:
    | {
        label: string;
        products: TProduct[];
      }
    | undefined;
  setSelectedCategory: Dispatch<
    SetStateAction<
      | {
          label: string;
          products: TProduct[];
        }
      | undefined
    >
  >;
}) {
  return (
    <div className="px-2">
      <h2 className="text-lg font-semibold">
        {title}({categories.length})
      </h2>
      <ul className="space-y-3 capitalize mt-3 ">
        {categories.map((category, index) => {
          if (!category.label) {
            return null;
          }

          return (
            <li
              key={category.label + "_" + index}
              className={`cursor-pointer flex justify-between ${
                selectedCategory?.label === category.label &&
                selectedCategory !== undefined
                  ? "text-green-500"
                  : ""
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              <p className="text-inherit">{category.label}</p>
              <span>
                (<strong>{category.products.length}</strong>)
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
