import { ReturnItem } from "@/types/returnItem";

const API_URL = "http://127.0.0.1:3001/api/v1";

export async function getReturnItems(returnId: string): Promise<ReturnItem[]> {
    const response = await fetch(`${API_URL}/returns/${returnId}/items`, {
        cache: "no-store",
    });
    if (!response.ok) throw new Error("Error al obtener los productos devueltos");
    const json = await response.json();
    return json.data;
}

export async function addReturnItem(returnId: string, item: Omit<ReturnItem, "id" | "returnId">): Promise<ReturnItem> {
    const response = await fetch(`${API_URL}/returns/${returnId}/items`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
    });
    if (!response.ok) throw new Error("Error al agregar producto a la devolución");
    return response.json();
}

export async function updateReturnItem(returnId: string, itemId: string, data: Partial<ReturnItem>): Promise<ReturnItem> {
    const response = await fetch(`${API_URL}/returns/${returnId}/items/${itemId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Error al actualizar el producto devuelto");
    return response.json();
}

export async function deleteReturnItem(returnId: string, itemId: string): Promise<void> {
    const response = await fetch(`${API_URL}/returns/${returnId}/items/${itemId}`, {
        method: "DELETE",
    });
    if (!response.ok) throw new Error("Error al eliminar el producto devuelto");
}