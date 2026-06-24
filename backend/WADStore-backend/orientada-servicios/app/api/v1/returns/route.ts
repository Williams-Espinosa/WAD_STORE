import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    "data": [
      {
        "id": "fa28193a-8c9b-4d12-ae21-99128384cf22",
        "shipmentId": "771a3910-cba1-4b12-9c3f-ee90bb183da2",
        "reason": "El equipo presenta fallas de encendido directas de fábrica.",
        "status": "pending"
      }
    ],
    "meta": {
      "page": 1,
      "limit": 10,
      "total": 1,
      "totalPages": 1
    }
  }, { status: 200 });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    if (body.shipmentId === "NOT_DELIVERED") {
      return NextResponse.json({
        "code": "RETURN_NOT_ALLOWED",
        "message": "Solo se permiten devoluciones sobre envíos entregados.",
        "details": {
          "shipmentId": "El envío asociado se encuentra con estatus 'shipped'. No se permite abrir reclamos hasta que se marque como 'delivered'."
        }
      }, { status: 409 });
    }
    
    if (body.refundAmount !== undefined && body.refundAmount < 0) {
      return NextResponse.json({
        "code": "INVALID_REFUND_AMOUNT",
        "message": "El monto de reembolso debe ser mayor o igual a cero.",
        "details": {
          "refundAmount": "No es posible procesar un saldo de reembolso con valor menor a 0.00."
        }
      }, { status: 422 });
    }
    
    return NextResponse.json({
      "id": "fa28193a-8c9b-4d12-ae21-99128384cf22",
      "shipmentId": body.shipmentId || "771a3910-cba1-4b12-9c3f-ee90bb183da2",
      "reason": body.reason || "El equipo presenta fallas de encendido directas de fábrica.",
      "status": "pending",
      "requestedAt": "2026-05-29T16:00:00Z",
      "refundAmount": body.refundAmount || 0.00
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
}
