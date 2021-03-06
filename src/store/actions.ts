import Axios from "axios";

export async function getCategories({commit}: {commit: Function}) {
    try {
        let response = await Axios.get("/api/category/");
        if (response.data) {
            commit("setCategories", response.data)
            return response.data;
        }
    } catch (error) {
        throw error;
    }
}

export async function postCategory({commit}: {commit: Function}, name: string) {
    try {
        let response = await Axios.post("/api/category/", {
          name: name
        });
        if (response.data) {
          return await getCategories({commit});
        }
    } catch (error) {
        throw error;
    }
}

export async function editCategory({commit}: {commit: Function}, {id, name}: {id: string, name: string}) {
    try {
        let response = await Axios.put(`/api/category/${id}/`, {
            name: name
        });
        if (response.data) {
            return await getCategories({commit});
        }
    } catch (error) {
        throw error;
    }
}

export async function deleteCategory({commit}: {commit: Function}, id: string) {
    try {
        let response = await Axios.delete(`/api/category/${id}/`);
        if (response.data) {
          return await getCategories({commit});
        }
    } catch (error) {
        throw error;
    }
}

export async function getTags({commit}: {commit: Function}) {
    try {
        let response = await Axios.get("/api/tag/");
        if (response.data) {
            commit("setTags", response.data)
            return response.data;
        }
    } catch (error) {
        throw error;
    }
}

export async function postTag({commit}: {commit: Function}, name: string) {
    try {
        let response = await Axios.post("/api/tag/", {
          name: name
        });
        if (response.data) {
          return await getTags({commit});
        }
    } catch (error) {
        throw error;
    }
}

export async function editTag({commit}: {commit: Function}, {id, name}: {id: string, name: string}) {
    try {
        let response = await Axios.put(`/api/tag/${id}/`, {
            name: name
        });
        if (response.data) {
            return await getTags({commit});
        }
    } catch (error) {
        throw error;
    }
}

export async function deleteTag({commit}: {commit: Function}, id: string) {
    try {
        let response = await Axios.delete(`/api/tag/${id}/`);
        if (response.data) {
          return await getTags({commit});
        }
    } catch (error) {
        throw error;
    }
}