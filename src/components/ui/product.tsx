"use client";

import { TProduct } from "@/app/type";
import { TableCell, TableRow } from "@/components/ui/table";
import Image from "next/image";
import { useState } from "react";
import { useInView } from "react-intersection-observer";
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
    attributes,
  } = product;

  const [questions, setQuestions] = useState();
  const [reviews, setReviews] = useState();

  const { ref } = useInView({
    threshold: 0.5,
    onChange: async (inView) => {
      if (inView) {
        // fetch the products if it's in the viewport
        if (!questions) {
          const response = await fetch(
            `https://appsumo.com/api/v2/deals/${id}/questions/?page=1&sort=latest&order=desc&from=0&items_per_page=5`
          );
          const data = await response.json();
          setQuestions(data.meta.total);
        }
      }

      if (!reviews) {
        const response = await fetch(
          `https://appsumo.com/api/v2/deals/${id}/reviews/?page=1&sort=date&order=desc&from=0&items_per_page=5`
        );
        const data = await response.json();
        setReviews(data.meta.total);
      }
    },
  });

  return (
    <TableRow
      ref={ref}
      key={id}
      className="cursor-pointer"
      onClick={() => {
        const absoluteUrl = get_absolute_url; // Assuming get_absolute_url is defined somewh  ere
        window.open(`https://appsumo.com${absoluteUrl}`, "_blank");
      }}
    >
      <TableCell>
        <Image
          className="object-cover rounded mx-auto"
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
      <TableCell>
        <p className="whitespace-nowrap">{attributes.best_for?.join(", ")}</p>
      </TableCell>
      <TableCell>
        <p className="whitespace-nowrap">
          {attributes.alternative_to?.join(", ")}
        </p>
      </TableCell>
      <TableCell>
        <p className="whitespace-nowrap">{questions}</p>
      </TableCell>
      <TableCell>
        <p className="whitespace-nowrap">{reviews}</p>
      </TableCell>
    </TableRow>
  );
}
