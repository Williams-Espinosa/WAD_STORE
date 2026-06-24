import { Shipment } from "@/types/shipment";
import { getShipmentTracking } from "@/services/trackingService";

const API_URL = "http://localhost:3001/api/v1";

interface Props {
    params: Promise<{ id: string }>;
}

async function getShipmentById(id: string): Promise<Shipment> {
    const response = await fetch(`${API_URL}/shipments/${id}`, {
        cache: "no-store",
    });

    if (!response.ok) {
        throw new Error("Error al obtener el envío");
    }

    return response.json();
}

export default async function ShipmentDetailPage({ params }: Props) {
    const { id } = await params;
    const shipment = await getShipmentById(id);
    const tracking = await getShipmentTracking(id);

    return (
        <main className="min-h-screen bg-black text-white p-8 space-y-12">
            <div className="flex items-center justify-between border-b border-white pb-4">
                <h1 className="text-4xl font-bold">Detalle del envío</h1>
                <a href="/shipments" className="text-white hover:underline opacity-80 hover:opacity-100">
                    Volver a envíos
                </a>
            </div>

            <section>
                <div className="border border-white rounded-lg p-6 space-y-3">
                    <p><strong>ID:</strong> {shipment.id}</p>
                    <p><strong>Cliente:</strong> {shipment.customerId}</p>
                    <p><strong>Dirección:</strong> {shipment.address}</p>
                    <p><strong>Paquetería:</strong> {shipment.carrier}</p>
                    <p><strong>Número de rastreo:</strong> {shipment.trackingNumber}</p>
                    <p><strong>Estado:</strong> {shipment.status}</p>
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-bold mb-6 border-b border-white pb-2 inline-block">
                    Historial de rastreo
                </h2>

                <div className="space-y-4">
                    {tracking.map((item) => (
                        <div key={item.id} className="border border-white rounded-lg p-6 hover:bg-white hover:text-black transition-colors duration-200">
                            <p className="mb-2"><strong>Ubicación:</strong> {item.location}</p>
                            <p className="mb-2"><strong>Descripción:</strong> {item.description}</p>
                            <p className="mb-2"><strong>Estado:</strong> {item.status}</p>
                            {item.createdAt && (
                                <p><strong>Fecha:</strong> {item.createdAt}</p>
                            )}
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}