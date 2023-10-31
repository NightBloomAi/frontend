type SearchRes = {
    hits: Hit[];
    page: number;
};

type Hit = {
    width: any;
    generation_time: string;
    reference_job_id: string;
    prompt: string;
    full_command: string;
    height: number;
    category: string;
};

type ImageDetail = {
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

export type { SearchRes, Hit, ImageDetail };
