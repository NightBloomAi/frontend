import { styles } from "@/components/style-guide/style-guide";
import React from "react";
import { useParams } from "next/navigation";
import UniqueStyleGallery from "@/components/style-guide/uniqueStyleGallery";

export default function StyleGallery({ params }: { params: { slug: string } }) {
  const name = params.slug;

  const category = name;

  return <UniqueStyleGallery category={category as string} />;
}

export function generateStaticParams() {
  return [
    { slug: "isometric_anime" },
    { slug: "2d_illustration" },
    { slug: "pixel_art" },
    { slug: "oil_painting" },
    { slug: "coloring_book" },
    { slug: "cinematographic" },
    { slug: "analytic_drawing" },
    { slug: "anime_portrait" },
    { slug: "dark_fantasy" },
    { slug: "diagrammatic_drawing" },
    { slug: "diagrammatic_portrait" },
    { slug: "dripping_art" },
    { slug: "double_exposure" },
    { slug: "futuristic" },
    { slug: "graffiti_portrait" },
    { slug: "infographic_drawing" },
    { slug: "iridescent" },
    { slug: "isometric_illustration" },
    { slug: "japanese_ink" },
    { slug: "line_drawing" },
    { slug: "op_art" },
    { slug: "ornamental_watercolor" },
    { slug: "paper_cut" },
    { slug: "paper_quilling" },
    { slug: "pastel_drawing" },
    { slug: "patchwork_collage" },
    { slug: "polaroid_photo" },
    { slug: "stained_glass_portrait" },
    { slug: "tattoo_art" },
    { slug: "typography" },
    { slug: "ukiyo_e" },
    { slug: "watercolor_landscape" },
    { slug: "winter_oil_painting" },
  ];
}
