import axios from "axios";
import Cookies from "js-cookie";

const base = axios.create({
    baseURL: "https://nightbloom.ai/api",
});

export const searchEndpoint = async ({
    page,
    query,
    category,
}: {
    page: number;
    query: string;
    category: string;
}) => {
    const response = await base.get(
        `/search/assets?page=${page}&category=${category}&query=${query}`,
        { withCredentials: true }
    );
    return response.data;
};

export const currentUserEndpoint = async ({ jwt }: { jwt?: string }) => {
    const headers = {
        Authorization: `Bearer ${jwt}`,
    };
    if (!jwt) {
        const response = await base.get(`/account/current_user`);
        return response.data;
    } else {
        const response = await base.get(`/account/current_user`, {
            headers,
        });
        return response.data;
    }
};

export const loginEndpoint = async ({
    email,
    password,
}: {
    email: string;
    password: string;
}) => {
    const payload = {
        email,
        password,
    };
    const response = await base.post(`/account/login`, payload);
    return response.data;
};

export const logoutEndpoint = async ({ jwt }: { jwt?: string }) => {
    const headers = {
        Authorization: `Bearer ${jwt}`,
    };
    if (!jwt) {
        const response = await base.get(`/account/logout`);
        return response.data;
    } else {
        const response = await base.get(`/account/logout`, { headers });
        return response.data;
    }
};

export const refreshTokenEndpoint = async ({ jwt }: { jwt?: string }) => {
    const headers = {
        Authorization: `Bearer ${jwt}`,
    };
    if (!jwt) {
        const response = await base.get(`/account/refresh`);
        return response.data;
    } else {
        const response = await base.get(`/account/refresh`, { headers });
        return response.data;
    }
};

export const registerEndpoint = async ({
    email,
    password,
    jwt,
}: {
    email: string;
    password: string;
    jwt?: string;
}) => {
    const payload = {
        email,
        password,
    };
    const headers = {
        Authorization: `Bearer ${jwt}`,
    };
    const response = await base.post(`/account/register`, payload, { headers });
    return response.data;
};
