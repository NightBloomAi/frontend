type CurrentSessionResponse = {
    email: string;
    id: string;
}

type SignInResponse = {
    success: boolean,
    access_token: string,
}

type RefreshTokenResponse = {
    success: boolean,
    access_token: string,
}

type UserSession = {
    id: string,
    email: string,
    exp: number | undefined,
    jwt: string | undefined,
}

type DecodedJwt = {
    sub: string,
    token_uuid: string,
    exp: number,
    iat: number,
    nbf: number
}

type UserProfileRes = {
    user_id: string,
    username: string,
}

export type { CurrentSessionResponse, DecodedJwt, SignInResponse, UserSession, RefreshTokenResponse, UserProfileRes }
