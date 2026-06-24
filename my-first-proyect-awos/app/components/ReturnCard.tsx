import { Return } from "@/types/return";

interface Props {
data: Return;
}

export default function ReturnCard({ data }: Props) { 
return (
    <div className="border border-white rounded-lg p-6 hover:bg-white hover:text-black transition-colors duration-200">
        <h2 className="font-bold text-xl mb-4">
            Return #{data.id}
        </h2>

        <p className="mb-2">
            <strong>Shipment:</strong> {data.shipmentId}
        </p>

        <p className="mb-2">
            <strong>Reason:</strong> {data.reason}
        </p>

        <p>
            <strong>Status:</strong> {data.status}
        </p>
    </div>
);
}