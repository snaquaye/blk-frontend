"use client";
import React from "react";
import Image from "next/image";

import {
  BlocksRenderer,
  type BlocksContent,
} from "@strapi/blocks-react-renderer";
import { getStrapiImageUrl } from "@/lib/strapi";

interface BlockProps {
  children?: React.ReactNode;
  level?: number;
  image?: any;
}

export default function BlockRendererClient({
  content,
}: {
  readonly content: BlocksContent;
}) {
  if (!content) return null;
  return (
    <BlocksRenderer
      content={content}
      blocks={{
        paragraph: (props: BlockProps) => <p className="py-4">{props.children}</p>,
        heading: (props: BlockProps) => {
          const Tag = `h${props.level || 1}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
          return React.createElement(Tag, { className: "py-4 font-extrabold text-[18px]" }, props.children);
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        image: (props: any) => {
          console.log(props.image);
          const imageData = props.image?.data?.attributes || props.image;
          const imageUrl = getStrapiImageUrl(imageData);
          if (!imageUrl) return null;
          return (
            <Image
              src={imageUrl}
              width={imageData.width || 800}
              height={imageData.height || 600}
              alt={imageData.alternativeText || ""}
            />
          );
        },
      }}
    />
  );
}
