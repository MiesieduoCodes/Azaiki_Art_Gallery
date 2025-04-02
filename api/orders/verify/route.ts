import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const reference = searchParams.get("reference")

    if (!reference) {
      return NextResponse.json({ error: "Payment reference is required" }, { status: 400 })
    }

    // Fetch order from database
    const order = await db.order.findFirst({
      where: {
        paymentReference: reference,
      },
      include: {
        artwork: true,
      },
    })

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    return NextResponse.json(order)
  } catch (error) {
    console.error("Error verifying order:", error)
    return NextResponse.json({ error: "Failed to verify order" }, { status: 500 })
  }
}

