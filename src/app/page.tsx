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
import { useState } from "react";

export default function Home() {
  const { categories, subCategories } = getCategories();
  const [selectedCategory, setSelectedCategory] = useState<{
    label: string;
    products: TProduct[];
  }>();

  const filteredProducts = selectedCategory?.products || products;
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
          {/* @ts-ignore */}
          <TableProduct products={filteredProducts} />
        </div>
      </div>
    </div>
  );
}

const TableProduct = ({ products = [] }: { products: TProduct[] }) => {
  return (
    <Table className="">
      <TableCaption>List of product from Appsumo.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="min-w-[150px]">Image</TableHead>
          <TableHead className="w-[300px]">Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Start Date</TableHead>
          <TableHead className="min-w-[400px]">Description</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Sub Category</TableHead>
          <TableHead>Best For</TableHead>
          <TableHead>Alternative To</TableHead>
          <TableHead>Comments</TableHead>
          <TableHead>Reviews</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product, index) => (
          // @ts-ignore
          <Product key={product.id + index} {...product} />
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
