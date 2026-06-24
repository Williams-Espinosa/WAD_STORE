import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { shipmentId: string } }) {
  const { shipmentId } = params;
  
  if (shipmentId === "NOT_FOUND") {
    return NextResponse.json({
      "code": "SHIPMENT_NOT_FOUND",
      "message": "No encontramos este envío. Verifica el identificador e inténtalo nuevamente.",
      "details": {
        "id": "771a3910-0000-0000-0000-ee90bb183da2"
      }
    }, { status: 404 });
  }
  
  if (shipmentId === "FORBIDDEN") {
    return NextResponse.json({
      "code": "FORBIDDEN_ACCESS",
      "message": "No tienes permisos para acceder a este recurso.",
      "details": {
        "scope": "No puedes consultar datos logísticos pertenecientes a guías de terceros."
      }
    }, { status: 403 });
  }

  return NextResponse.json({
    "id": shipmentId !== "1" ? shipmentId : "771a3910-cba1-4b12-9c3f-ee90bb183da2",
    "customerId": "81f1e29c-6b3a-4ef4-9d58-ea8ff0b0df22",
    "address": "Av. Central 123, Tuxtla Gutiérrez, Chiapas",
    "carrier": "DHL",
    "trackingNumber": "TRK-9928112-MX",
    "estimatedDelivery": "2026-06-05T18:00:00Z",
    "status": "shipped",
    "createdAt": "2026-05-29T11:00:00Z"
  }, { status: 200 });
}

export async function PATCH(req: Request, { params }: { params: { shipmentId: string } }) {
  try {
    const body = await req.json();
    return NextResponse.json({
      "id": params.shipmentId !== "1" ? params.shipmentId : "771a3910-cba1-4b12-9c3f-ee90bb183da2",
      "status": body.status || "delivered",
      "updatedAt": "2026-05-29T13:40:00Z"
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
}
