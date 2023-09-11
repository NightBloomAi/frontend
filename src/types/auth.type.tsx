export interface ILoginResponse {
    success: boolean;
    access_token: string;
    error_message?: string;
}

export interface ICurrentUserResponse {
    email?: string;
    id?: string;
    error_message?: string;
}

export interface ISession {
    jwt: string;
    signedIn: boolean;
    id?: string;
    email?: string;
    username?: string;
}

export interface IJwtDecode {
    sub: string;
    token_uuid: string;
    exp: number;
    iat: number;
    nbf: number;
}

export interface ILogoutResponse {
    success?: boolean;
    error_message?: string;
}
