import { Return } from "@/types/return";
import { getReturnItems } from "@/services/returnItemService";

const API_URL = "http://localhost:3001/api/v1";

interface Props {
    params: Promise<{ id: string }>;
}

async function getReturnById(id: string): Promise<Return> {
    const response = await fetch(`${API_URL}/returns/${id}`, {
        cache: "no-store",
    });

    if (!response.ok) {
        throw new Error("Error al obtener la devolución");
    }

    return response.json();
}

export default async function ReturnDetailPage({ params }: Props) {
    const { id } = await params;
    const returnData = await getReturnById(id);
    const items = await getReturnItems(id);

    return (
        <main className="min-h-screen bg-black text-white p-8 space-y-12">
            <div className="flex items-center justify-between border-b border-white pb-4">
                <h1 className="text-4xl font-bold">Detalle de devolución</h1>
                <a href="/returns" className="text-white hover:underline opacity-80 hover:opacity-100">
                    Volver a devoluciones
                </a>
            </div>

            <section>
                <div className="border border-white rounded-lg p-6 space-y-3">
                    <p><strong>ID:</strong> {returnData.id}</p>
                    <p><strong>Envío:</strong> {returnData.shipmentId}</p>
                    <p><strong>Razón:</strong> {returnData.reason}</p>
                    <p><strong>Estado:</strong> {returnData.status}</p>
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-bold mb-6 border-b border-white pb-2 inline-block">
                    Productos devueltos
                </h2>

                <div className="space-y-4">
                    {items.map((item) => (
                        <div key={item.id} className="border border-white rounded-lg p-6 hover:bg-white hover:text-black transition-colors duration-200">
                            <p className="mb-2"><strong>Producto:</strong> {item.productName}</p>
                            <p className="mb-2"><strong>Cantidad:</strong> {item.quantity}</p>
                            <p className="mb-2"><strong>Condición:</strong> {item.condition}</p>
                            {item.notes && (
                                <p><strong>Notas:</strong> {item.notes}</p>
                            )}
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}