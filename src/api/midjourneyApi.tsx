import axios from "axios";

const base = axios.create({
    baseURL: "https://cdn.midjourney.com",
});

export const imageEndpoint = async ({
    reference_job_id,
}: {
    reference_job_id: string;
}) => {
    const response = await base.get(`/${reference_job_id}/0_0.png`);
    return response.data;
};

export const alternateImages = async ({
    reference_job_id,
    ref,
}: {
    reference_job_id: string;
    ref: number;
}) => {
    const response = await base.get(`/${reference_job_id}/0_${ref}.png`);
    return response.data;
};

export const gridImage = async ({
    reference_job_id,
}: {
    reference_job_id: string;
}) => {
    const response = await base.get(`/${reference_job_id}/grid_0.webp`);
    return response.data;
};