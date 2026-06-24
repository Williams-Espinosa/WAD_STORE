import { ShipmentTracking } from "@/types/tracking";

const API_URL = "http://127.0.0.1:3001/api/v1";

export async function getShipmentTracking(shipmentId: string): Promise<ShipmentTracking[]> {
    const response = await fetch(`${API_URL}/shipments/${shipmentId}/tracking`, {
        cache: "no-store",
    });
    if (!response.ok) throw new Error("Error al obtener el rastreo del envío");
    const json = await response.json();
    return json.data;
}

export async function addTrackingMovement(shipmentId: string, tracking: Omit<ShipmentTracking, "id" | "shipmentId">): Promise<ShipmentTracking> {
    const response = await fetch(`${API_URL}/shipments/${shipmentId}/tracking`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(tracking),
    });
    if (!response.ok) throw new Error("Error al agregar movimiento de rastreo");
    return response.json();
}

export async function updateTrackingMovement(shipmentId: string, trackId: string, data: Partial<ShipmentTracking>): Promise<ShipmentTracking> {
    const response = await fetch(`${API_URL}/shipments/${shipmentId}/tracking/${trackId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Error al actualizar movimiento de rastreo");
    return response.json();
}