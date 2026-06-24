import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: { params: { id: string, itemId: string } }) {
  try {
    const body = await req.json();
    
    if (body.productName) {
      return NextResponse.json({
        "code": "FIELD_NOT_UPDATABLE",
        "message": "Algunos campos no pueden modificarse después de su creación.",
        "details": {
          "productName": "No se permite modificar el nombre original del producto devuelto por PATCH."
        }
      }, { status: 422 });
    }
    
    return NextResponse.json({
      "id": params.itemId !== "1" ? params.itemId : "33129bbb-fa12-4c21-ba31-ff99283182aa",
      "condition": body.condition || "damaged",
      "notes": body.notes || "Actualización QA: Se corrobora daño físico severo en caja de origen.",
      "updatedAt": "2026-05-29T17:15:00Z"
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
}
