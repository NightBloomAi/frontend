
import { styles } from "@/components/style-guide/style-guide";
import React from "react";
import { useParams } from "next/navigation";
import UniqueStyleGallery from "@/components/style-guide/uniqueStyleGallery";

export default function StyleGallery({ params }: { params: { slug: string } }) {
    const name = params.slug;

    

    const category = name;

    return <UniqueStyleGallery category={category as string} />;
}
