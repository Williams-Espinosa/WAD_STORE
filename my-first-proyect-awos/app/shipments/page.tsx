import { getShipments } from "@/services/shipmentService";
import ShipmentCard from "@/components/ShipmentCard";
import Link from "next/link";

export default async function ShipmentsPage() {
    const shipments = await getShipments();

    return (
        <main className="min-h-screen bg-black text-white p-8 space-y-12">
            <div className="flex items-center justify-between border-b border-white pb-4">
                <h1 className="text-4xl font-bold">Envíos</h1>
                <Link href="/" className="text-white hover:underline opacity-80 hover:opacity-100">
                    Volver al inicio
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {shipments.map((shipment) => (
                    <Link key={shipment.id} href={`/shipments/${shipment.id}`} className="block">
                        <ShipmentCard shipment={shipment} />
                    </Link>
                ))}
            </div>
        </main>
    );
}
