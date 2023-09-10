export interface ILoginResponse {
    success: boolean;
    access_token: string;
}

export interface ICurrentUserResponse {
    email?: string;
    id?: string;
    error_message?: string;
}
