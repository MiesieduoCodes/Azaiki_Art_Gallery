import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function POST(request) {
  try {
    const body = await request.json()
    const { artworkId, customer, paymentDetails } = body

    // Create order in database
    const order = await db.order.create({
      data: {
        artworkId,
        customerName: customer.name,
        customerEmail: customer.email,
        customerPhone: customer.phone,
        customerAddress: customer.address,
        customerCity: customer.city,
        customerCountry: customer.country,
        amount: paymentDetails.amount,
        currency: paymentDetails.currency,
        paymentReference: paymentDetails.transaction_id,
        paymentStatus: paymentDetails.status,
        paymentMethod: "flutterwave",
      },
    })

    return NextResponse.json({ success: true, order })
  } catch (error) {
    console.error("Error creating order:", error)
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
  }
}

