"use client";

import { TProduct } from "@/app/type";
import { TableCell, TableRow } from "@/components/ui/table";
import Image from "next/image";
export default function Product(product: TProduct) {
  const {
    id,
    media_url,
    get_absolute_url,
    public_name,
    price,
    card_description,
    taxonomy,
  } = product;

  return (
    <TableRow
      key={id}
      className="cursor-pointer"
      onClick={() => {
        const absoluteUrl = get_absolute_url; // Assuming get_absolute_url is defined somewh  ere
        window.open(`https://appsumo.com${absoluteUrl}`, "_blank");
      }}
    >
      <TableCell>
        <Image
          className="object-cover rounded-lg mx-auto"
          width={250}
          height={100}
          src={media_url}
          alt={"product-img"}
        />
        <p className="text-2xl text-center font-semibold mt-3">
          {public_name}
          <sup className="text-sm font-normal">(${price})</sup>
        </p>
      </TableCell>
      <TableCell>
        <p className="text-lg font-medium">{card_description}</p>
      </TableCell>
      <TableCell className="text-lg font-medium whitespace-nowrap">
        <p>{taxonomy.category?.value_enumeration}</p>
      </TableCell>
      <TableCell className="text-lg font-medium whitespace-nowrap">
        <p>{taxonomy.subcategory?.value_enumeration}</p>
      </TableCell>
    </TableRow>
  );
}
