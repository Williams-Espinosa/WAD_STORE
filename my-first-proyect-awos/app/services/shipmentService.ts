import { Shipment } from "@/types/shipment";

const API_URL = "http://127.0.0.1:3001/api/v1";

export async function getShipments(page: number = 1, limit: number = 10): Promise<Shipment[]> {
    const response = await fetch(`${API_URL}/shipments?page=${page}&limit=${limit}`, {
        cache: "no-store",
    });
    if (!response.ok) throw new Error("Error al obtener envíos");
    const json = await response.json();
    return json.data;
}

export async function getShipment(id: string): Promise<Shipment> {
    const response = await fetch(`${API_URL}/shipments/${id}`, {
        cache: "no-store",
    });
    if (!response.ok) throw new Error("Error al obtener el envío");
    return response.json();
}

export async function createShipment(shipment: Omit<Shipment, "id">): Promise<Shipment> {
    const response = await fetch(`${API_URL}/shipments`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(shipment),
    });
    if (!response.ok) throw new Error("Error al crear el envío");
    return response.json();
}

export async function updateShipmentStatus(id: string, status: string): Promise<Shipment> {
    const response = await fetch(`${API_URL}/shipments/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
    });
    if (!response.ok) throw new Error("Error al actualizar el estado del envío");
    return response.json();
}