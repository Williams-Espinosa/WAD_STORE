import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  return NextResponse.json({
    "data": [
      {
        "id": "33129bbb-fa12-4c21-ba31-ff99283182aa",
        "productName": "Audífonos Gamer Inalámbricos",
        "quantity": 1,
        "condition": "damaged"
      }
    ]
  }, { status: 200 });
}

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    return NextResponse.json({
      "id": "33129bbb-fa12-4c21-ba31-ff99283182aa",
      "returnId": params.id !== "1" ? params.id : "fa28193a-8c9b-4d12-ae21-99128384cf22",
      "productName": body.productName || "Audífonos Gamer Inalámbricos",
      "quantity": body.quantity || 1,
      "condition": body.condition || "damaged",
      "notes": body.notes || "Viene con el auricular derecho roto de fábrica."
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
}
