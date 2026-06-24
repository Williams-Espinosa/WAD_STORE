export interface Shipment {
    id: string;
    customerId: string;
    address: string;
    carrier: string;
    trackingNumber: string;
    status: string;
}