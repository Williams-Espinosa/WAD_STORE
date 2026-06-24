import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { shipmentId: string } }) {
  return NextResponse.json({
    "data": [
      {
        "id": "bc8229b4-0c1a-4712-ba21-1192837465af",
        "location": "Centro de Distribución Sureste",
        "description": "El paquete ha arribado al centro de distribución regional.",
        "status": "in_transit",
        "createdAt": "2026-05-29T14:30:00Z"
      }
    ]
  }, { status: 200 });
}

export async function POST(req: Request, { params }: { params: { shipmentId: string } }) {
  try {
    const body = await req.json();
    
    if (body.status === "INVALID") {
      return NextResponse.json({
        "code": "INVALID_TRACKING_STATUS",
        "message": "El estado del rastreo no es válido.",
        "details": {
          "status": "El valor provisto no coincide con las opciones requeridas: in_transit, delayed, delivered."
        }
      }, { status: 422 });
    }
    
    return NextResponse.json({
      "id": "bc8229b4-0c1a-4712-ba21-1192837465af",
      "shipmentId": params.shipmentId !== "1" ? params.shipmentId : "771a3910-cba1-4b12-9c3f-ee90bb183da2",
      "location": body.location || "Centro de Distribución Sureste",
      "description": body.description || "El paquete ha arribado al centro de distribución regional.",
      "status": body.status || "in_transit",
      "createdAt": "2026-05-29T14:30:00Z"
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
}
