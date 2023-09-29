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
    console.log(response.data);
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

export const googleLoginEndpoint = async()=> {
  try {
    const response = await base.get(`/google/login`);
    return response.data;
  } catch (error) {
    return error;
  }
}

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
    console.log(response.data.assets);
    return response.data;
  }
};

export const createFavouriteEndpoint = async ({
  ids,
  jwt,
}: {
  ids: string[];
  jwt?: string;
}) => {
  const payload = {
    ids: ids,
  };
  const headers = {
    Authorization: `Bearer ${jwt}`,
  };
  try {
    const response = await base.post(`/user_favourites/favourites`, payload, {
      headers,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error adding to favourites", error);
    return error;
  }
};

export const removeFavouriteEndpoint = async ({
  ids,
  jwt,
}: {
  ids: string[];
  jwt?: string;
}) => {
  const payload = {
    ids: ids,
  };
  const headers = {
    Authorization: `Bearer ${jwt}`,
  };
  try {
    const response = await base.put(`/user_favourites/favourites`, payload, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.error("Error removing favourites", error);
    return error;
  }
};

export const checkFavouritesEndpoint = async ({
  id,
  jwt,
}: {
  id: string;
  jwt?: string;
}) => {
  const headers = {
    Authorization: `Bearer ${jwt}`,
  };
  try {
    const response = await base.get(`/user_favourites/favourites/${id}`, {
      headers,
    });
    return response.data.is_favourite;
  } catch (error) {
    console.error("Error checking if post is favourite", error);
    return error;
  }
};


