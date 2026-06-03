import { DataProvider } from "react-admin";

const API_URL = import.meta.env.VITE_JSON_SERVER_URL;

const httpClient = (url: string, options?: RequestInit) =>
  fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...options,
  }).then((res) => {
    if (!res.ok) throw new Error(res.statusText);
    return res.json();
  });

export const dataProvider: DataProvider = {
  getList: (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const query = new URLSearchParams({
      page: String(page - 1),
      size: String(perPage),
      sort: field,
      dir: order.toLowerCase(),
    });
    for (const [key, value] of Object.entries(params.filter)) {
      if (value !== undefined && value !== null && value !== "") {
        query.append(key, String(value));
      }
    }
    return httpClient(`${API_URL}/${resource}?${query}`).then((json) => ({
      data: json.data,
      total: json.total,
    }));
  },

  getOne: (resource, params) =>
    httpClient(`${API_URL}/${resource}/${params.id}`).then((json) => ({
      data: json.data,
    })),

  getMany: (resource, params) =>
    Promise.all(
      params.ids.map((id) =>
        httpClient(`${API_URL}/${resource}/${id}`).then(
          (json) => json.data,
        ),
      ),
    ).then((data) => ({ data })),

  getManyReference: (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const query = new URLSearchParams({
      page: String(page - 1),
      size: String(perPage),
      sort: field,
      dir: order.toLowerCase(),
      [params.target]: String(params.id),
    });
    return httpClient(`${API_URL}/${resource}?${query}`).then((json) => ({
      data: json.data,
      total: json.total,
    }));
  },

  create: (resource, params) =>
    httpClient(`${API_URL}/${resource}`, {
      method: "POST",
      body: JSON.stringify(params.data),
    }).then((json) => ({ data: json.data })),

  update: (resource, params) =>
    httpClient(`${API_URL}/${resource}/${params.id}`, {
      method: "PUT",
      body: JSON.stringify(params.data),
    }).then((json) => ({ data: json.data })),

  updateMany: (resource, params) =>
    Promise.all(
      params.ids.map((id) =>
        httpClient(`${API_URL}/${resource}/${id}`, {
          method: "PUT",
          body: JSON.stringify(params.data),
        }).then((json) => json.data.id as number),
      ),
    ).then((data) => ({ data })),

  delete: (resource, params) =>
    httpClient(`${API_URL}/${resource}/${params.id}`, {
      method: "DELETE",
    }).then((json) => ({ data: json.data })),

  deleteMany: (resource, params) =>
    Promise.all(
      params.ids.map((id) =>
        httpClient(`${API_URL}/${resource}/${id}`, {
          method: "DELETE",
        }).then((json) => json.data.id as number),
      ),
    ).then((data) => ({ data })),
};
