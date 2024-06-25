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
    dates,
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
      </TableCell>
      <TableCell>
        <p>{public_name}</p>
      </TableCell>
      <TableCell>
        <p>${price}</p>
      </TableCell>
      <TableCell>
        <p>{new Date(dates.start_date).toLocaleString()}</p>
      </TableCell>
      <TableCell>
        <p>{card_description}</p>
      </TableCell>
      <TableCell>
        <p className="whitespace-nowrap">
          {taxonomy.category?.value_enumeration}
        </p>
      </TableCell>
      <TableCell>
        <p className="whitespace-nowrap">
          {taxonomy.subcategory?.value_enumeration}
        </p>
      </TableCell>
    </TableRow>
  );
}
