"use client"
import { styles } from "@/components/style-guide/style-guide";
import React from "react";
import {useParams} from 'next/navigation';
import UniqueStyleGallery from "@/components/style-guide/uniqueStyleGallery";

export default function StyleGallery({params}: {params: {slug: string}}) {
    const name=useParams().slug;

    const item = styles.find((style)=> style.name === name)

    const category = item?.name;

    return(
        <main className="container mx-auto px-4 max-w-screen-xl">
            <UniqueStyleGallery item={item} category={category as string}/>
        </main>
    )
}