export interface ShipmentTracking {
    id: string;
    shipmentId: string;
    location: string;
    description: string;
    status: string;
    createdAt?: string;
}