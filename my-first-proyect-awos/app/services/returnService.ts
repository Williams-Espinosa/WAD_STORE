import { Return } from "@/types/return";

const API_URL = "http://127.0.0.1:3001/api/v1";

export async function getReturns(page: number = 1, limit: number = 10): Promise<Return[]> {
    const response = await fetch(`${API_URL}/returns?page=${page}&limit=${limit}`, {
        cache: "no-store",
    });
    if (!response.ok) throw new Error("Error al obtener devoluciones");
    const json = await response.json();
    return json.data;
}

export async function getReturn(id: string): Promise<Return> {
    const response = await fetch(`${API_URL}/returns/${id}`, {
        cache: "no-store",
    });
    if (!response.ok) throw new Error("Error al obtener la devolución");
    return response.json();
}

export async function createReturn(data: Omit<Return, "id">): Promise<Return> {
    const response = await fetch(`${API_URL}/returns`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Error al solicitar la devolución");
    return response.json();
}

export async function updateReturnStatus(id: string, status: string): Promise<Return> {
    const response = await fetch(`${API_URL}/returns/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
    });
    if (!response.ok) throw new Error("Error al actualizar el estado de la devolución");
    return response.json();
}