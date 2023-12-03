type SearchRes = {
    hits: Hit[];
    page: number;
};

type CategoriesRes = {
    categories: string[]
}

type Hit = {
    width: any;
    generation_time: string;
    reference_job_id: string;
    prompt: string;
    full_command: string;
    height: number;
    category: string;
};

type ImageDetailRes = {
    asset: {
        category: string;
        full_command: string;
        generation_time: string;
        generation_time_unix: number;
        height: number;
        id: string;
        image_paths: string[];
        kind: string;
        prompt: string;
        reference_job_id: string;
        width: number;
    };
    source: string;
};

type FavImageDetail = {
    category: string;
    full_command: string;
    generation_time: string;
    generation_time_unix: number;
    height: number;
    id: string;
    image_paths: string[];
    kind: string;
    prompt: string;
    reference_job_id: string;
    width: number;
    favourited_at_unix: number;
};

type FavImageDetailRes = {
    assets: FavImageDetail[];
    source: string;
};

type CheckFavRes = {
    is_favourite: boolean;
}

export type { SearchRes, Hit, ImageDetailRes, FavImageDetail, CategoriesRes, FavImageDetailRes, CheckFavRes };