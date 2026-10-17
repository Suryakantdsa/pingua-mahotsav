// src/restApp/apiClient.ts

export interface ServiceMethods<T = any> {
  find: (params?: { query?: Record<string, any> }) => Promise<{ data: T[]; total: number; skip?: number; limit?: number }>;
  get: (id: string) => Promise<T>;
  create: (data: Record<string, any>) => Promise<T>;
  patch: (id: string, data: Record<string, any>) => Promise<T>;
  update: (id: string, data: Record<string, any>) => Promise<T>;
  remove: (id: string) => Promise<{ success: boolean; message?: string }>;
}

const apiClient = {
  service: (endpoint: string): ServiceMethods => {
    const baseUrl = `/api/${endpoint.replace(/^\//, "")}`;

    return {
      find: async (params) => {
        const urlParams = new URLSearchParams();
        if (params?.query) {
          Object.entries(params.query).forEach(([k, v]) => {
            if (v !== undefined && v !== null && v !== "") {
              urlParams.append(k, String(v));
            }
          });
        }
        const queryString = urlParams.toString();
        const res = await fetch(`${baseUrl}${queryString ? `?${queryString}` : ""}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.error || err.message || `Failed to fetch from ${endpoint}`);
        }
        const result = await res.json();
        if (Array.isArray(result)) {
          return { data: result, total: result.length };
        }
        return result;
      },

      get: async (id: string) => {
        const res = await fetch(`${baseUrl}/${id}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.error || err.message || `Failed to get ${id}`);
        }
        return res.json();
      },

      create: async (data: Record<string, any>) => {
        const res = await fetch(baseUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.error || err.message || "Failed to create record");
        }
        return res.json();
      },

      patch: async (id: string, data: Record<string, any>) => {
        const res = await fetch(`${baseUrl}/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.error || err.message || "Failed to update record");
        }
        return res.json();
      },

      update: async (id: string, data: Record<string, any>) => {
        const res = await fetch(`${baseUrl}/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.error || err.message || "Failed to update record");
        }
        return res.json();
      },

      remove: async (id: string) => {
        const res = await fetch(`${baseUrl}/${id}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        });
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.error || err.message || "Failed to delete record");
        }
        return res.json();
      },
    };
  },
};

export default apiClient;
