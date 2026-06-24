import { Shipment } from "@/types/shipment";

interface Props {
    shipment: Shipment;
}

export default function ShipmentCard({ shipment }: Props) {
return (
    <div className="border border-white rounded-lg p-6 hover:bg-white hover:text-black transition-colors duration-200">
        <h2 className="font-bold text-xl mb-4">
        Tracking: {shipment.trackingNumber}
        </h2>

        <p className="mb-2">
        <strong>Carrier:</strong> {shipment.carrier}
        </p>

        <p className="mb-2">
        <strong>Status:</strong> {shipment.status}
        </p>

        <p>
        <strong>Address:</strong> {shipment.address}
        </p>
    </div>
);
}