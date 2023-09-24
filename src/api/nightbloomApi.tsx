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
    try {
        const response = await base.post(`/account/login`, payload);
        return response.data;
    } catch (error: any) {
        if (error.response) {
            console.error("Error logging in user:", error);
            return error.response.data;
        } else {
            return error;
        }
    }
};

export const logoutEndpoint = async ({ jwt }: { jwt?: string }) => {
    const headers = {
        Authorization: `Bearer ${jwt}`,
        Refresh: `Bearer ${jwt}`,
    };
    if (!jwt) {
        try {
            const response = await base.get(`/account/logout`);
            return response.data;
        } catch (error: any) {
            if (error.response) {
                console.error("Error logging out user:", error);
                return error.response.data;
            } else {
                return error;
            }
        }
    } else {
        try {
            const response = await base.get(`/account/logout`, { headers });
            return response.data;
        } catch (error: any) {
            if (error.response) {
                console.error("Error logging out user:", error);
                return error.response.data;
            } else {
                return error;
            }
        }
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
    try {
        const response = await base.post(`/account/register`, payload, {
            headers,
        });
        console.log(response.data);
        return response.data;
    } catch (error: any) {
        if (error.response) {
            console.error("Error during registration:", error);
            return error.response.data;
        } else {
            return error;
        }
    }
};

export const userFavouritesEndpoint = async ({ jwt }: { jwt?: string }) => {
    const headers = {
        Authorization: `Bearer ${jwt}`,
    };
    if (!jwt) {
        const response = await base.get(`/user_favourites/favourites`);
        return response.data;
    } else {
        const response = await base.get(`/user_favourites/favourites`, {
            headers,
        });
        return response.data;
    }
};
