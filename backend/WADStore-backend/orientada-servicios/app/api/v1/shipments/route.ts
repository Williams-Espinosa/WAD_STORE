import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    "data": [
      {
        "id": "771a3910-cba1-4b12-9c3f-ee90bb183da2",
        "customerId": "81f1e29c-6b3a-4ef4-9d58-ea8ff0b0df22",
        "carrier": "DHL",
        "trackingNumber": "TRK-9928112-MX",
        "status": "shipped"
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
    
    if (body.carrier === "") {
      return NextResponse.json({
        "code": "INVALID_FIELD_FORMAT",
        "message": "La estructura contiene datos inválidos o ausentes.",
        "details": {
          "carrier": "El campo 'carrier' es obligatorio y no puede enviarse vacío."
        }
      }, { status: 422 });
    }
    
    if (body.trackingNumber === "DUPLICATE" || body.trackingNumber === "TRK-9928112-MX") {
      // Adding TRK-9928112-MX here as a potential duplicate for mock purposes, but letting it pass if not explicitly tested
      // Just for exact replication we will only fail if it's explicitly set to DUPLICATE or if user wants strict validation.
      // Let's use a special flag or just return 409 if trackingNumber equals "TRK-9928112-MX-DUP" to allow normal creations too.
      if (body.trackingNumber === "TRK-9928112-MX-DUP") {
        return NextResponse.json({
          "code": "DUPLICATE_TRACKING_NUMBER",
          "message": "El número de rastreo ya fue registrado previamente.",
          "details": {
            "trackingNumber": "El identificador TRK-9928112-MX ya está asignado a otro paquete."
          }
        }, { status: 409 });
      }
    }
    
    return NextResponse.json({
      "id": "771a3910-cba1-4b12-9c3f-ee90bb183da2",
      "customerId": body.customerId || "81f1e29c-6b3a-4ef4-9d58-ea8ff0b0df22",
      "address": body.address || "Av. Central 123, Tuxtla Gutiérrez, Chiapas",
      "carrier": body.carrier || "DHL",
      "trackingNumber": body.trackingNumber || "TRK-9928112-MX",
      "estimatedDelivery": body.estimatedDelivery || "2026-06-05T18:00:00Z",
      "status": body.status || "pending",
      "createdAt": "2026-05-29T11:00:00Z"
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
}
