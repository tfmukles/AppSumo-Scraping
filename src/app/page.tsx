"use client";

import products from "@/app/data.json";
import { TProduct } from "@/app/type";
import Category from "@/components/ui/category";
import Product from "@/components/ui/product";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getCategories } from "@/lib/getCategory";
import { Dispatch, useMemo, useState } from "react";

type TSort = {
  type: "comments" | "reviews";
  order: -1 | 1;
};

export default function Home() {
  const [sortBy, setSortBy] = useState<TSort>({ type: "comments", order: 1 });

  const { categories, subCategories } = useMemo(() => {
    return getCategories();
  }, []);
  const [selectedCategory, setSelectedCategory] = useState<{
    label: string;
    products: TProduct[];
  }>();
  console.log(sortBy);

  const filteredProducts = (selectedCategory?.products || products).toSorted(
    (a, b) => {
      if (sortBy.type === "comments") {
        if (sortBy.order === 1) {
          return a.commentsTotal - b.commentsTotal;
        }

        return b.commentsTotal - a.commentsTotal;
      }

      if (sortBy.type === "reviews") {
        if (sortBy.order === 1) {
          return a.reviewsTotal - b.reviewsTotal;
        }
        return b.reviewsTotal - a.reviewsTotal;
      }

      return 0;
    }
  );

  return (
    <div className="container mx-auto max-w-[2100px] w-full">
      <div className="row g-4">
        <div className="col-2">
          <div className="space-y-4 sticky top-0 left-0 max-h-screen overflow-y-auto py-5 px-3">
            <Category
              title="Categories"
              // @ts-ignore
              categories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
            <Category
              title="Sub Categories"
              // @ts-ignore
              categories={subCategories}
              setSelectedCategory={setSelectedCategory}
              selectedCategory={selectedCategory}
            />
          </div>
        </div>
        <div className="col-10">
          <TableProduct
            // key={sortBy.type}
            setSortBy={setSortBy}
            sortBy={sortBy}
            // @ts-ignore
            products={filteredProducts}
          />
        </div>
      </div>
    </div>
  );
}

const TableProduct = ({
  products = [],
  setSortBy,
  sortBy,
}: {
  products: TProduct[];
  sortBy: TSort;
  setSortBy: Dispatch<TSort>;
}) => {
  return (
    <Table>
      <TableCaption>List of product from Appsumo.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="min-w-[150px]">Image</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Start Date</TableHead>
          <TableHead className="min-w-[350px]">Description</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Sub Category</TableHead>
          <TableHead className="max-w-40">Best For</TableHead>
          <TableHead>Alternative To</TableHead>
          <TableHead
            onClick={() => {
              setSortBy({
                type: "comments",
                order:
                  sortBy.type === "comments"
                    ? sortBy.order === -1
                      ? 1
                      : -1
                    : 1,
              });
            }}
            className="flex items-center space-x-2"
          >
            <span>Comments</span>
          </TableHead>
          <TableHead
            onClick={() =>
              setSortBy({
                type: "reviews",
                order:
                  sortBy.type === "reviews"
                    ? sortBy.order === -1
                      ? 1
                      : -1
                    : 1,
              })
            }
            className="min-w-[150px]"
          >
            <span>Reviews</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product, index) => (
          // @ts-ignore
          <Product {...product} key={index} />
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">{products.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};
