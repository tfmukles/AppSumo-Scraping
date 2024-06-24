"use client";

import products from "@/app/data.json";
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
import { useState } from "react";
import { TProduct } from "@/app/type";

const getCategories = () => {
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

export default function Home() {
  const { categories, subCategories } = getCategories();
  const [selectedCategory, setSelectedCategory] = useState<{
    label: string;
    products: TProduct[];
  }>();

  return (
    <div className="container ">
      <div className="row g-4">
        <div className="col-3">
          <div className="space-y-4 sticky top-0 left-0 max-h-screen overflow-y-auto py-5">
            <Category title="Categories" categories={categories} />
            <Category title="Sub Categories" categories={subCategories} />
          </div>
        </div>
        <div className="col-9">
          <Table className="">
            <TableCaption>List of product from Appsumo.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">Image</TableHead>
                <TableHead className="text-center">Description</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Sub Category</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                // @ts-ignore
                <Product key={product.id} {...product} />
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Total</TableCell>
                <TableCell className="text-right">{products.length}</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </div>
    </div>
  );
}
