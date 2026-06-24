import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  
  if (id === "NOT_FOUND") {
    return NextResponse.json({
      "code": "RETURN_NOT_FOUND",
      "message": "No encontramos la devolución solicitada.",
      "details": {
        "id": "fa28193a-0000-0000-0000-99128384cf22"
      }
    }, { status: 404 });
  }

  return NextResponse.json({
    "id": id !== "1" ? id : "fa28193a-8c9b-4d12-ae21-99128384cf22",
    "shipmentId": "771a3910-cba1-4b12-9c3f-ee90bb183da2",
    "reason": "El equipo presenta fallas de encendido directas de fábrica.",
    "status": "pending",
    "requestedAt": "2026-05-29T16:00:00Z",
    "refundAmount": 1599.99
  }, { status: 200 });
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    return NextResponse.json({
      "id": params.id !== "1" ? params.id : "fa28193a-8c9b-4d12-ae21-99128384cf22",
      "status": body.status || "approved",
      "updatedAt": "2026-05-29T16:45:00Z"
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
}
