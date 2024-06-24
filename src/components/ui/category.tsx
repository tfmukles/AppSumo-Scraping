import { TProduct } from "@/app/type";

export default function Category({
  title,
  categories,
}: {
  title: string;
  categories: { label: string; products: TProduct[] }[];
}) {
  return (
    <div className="px-2">
      <h2 className="text-lg font-semibold">
        {title}({categories.length})
      </h2>
      <ul className="space-y-3 capitalize mt-3 ">
        {categories.map((category) => (
          <li
            key={category.label}
            className="cursor-pointer flex justify-between"
          >
            <p>{category.label}</p>
            <span>
              (<strong>{category.products.length}</strong>)
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
