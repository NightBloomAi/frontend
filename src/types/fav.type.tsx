export interface IUserFavourites {
    id: string,
    prompt: string,
    full_command: string,
    height: number,
    width: number,
    reference_job_id: string,
    category: string,
    generation_time: string,
    generation_time_unix: number,
    image_paths: string[],
    kind: string,
}