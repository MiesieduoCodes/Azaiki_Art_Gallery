"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { CheckCircle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface Artwork {
  id: string // Added missing id property
  title: string
}

interface OrderDetails {
  artwork: Artwork
  amount: number
  createdAt: string
  [key: string]: any // For any additional properties
}

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams()
  const reference = searchParams.get("reference")
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!reference) {
        setLoading(false)
        return
      }

      try {
        const response = await fetch(`/api/orders/verify?reference=${reference}`)
        if (!response.ok) throw new Error("Failed to fetch order details")

        const data = await response.json()
        setOrderDetails(data)
      } catch (error) {
        console.error("Error fetching order details:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchOrderDetails()
  }, [reference])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-16 max-w-md">
      <Card className="text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl">Payment Successful!</CardTitle>
          <CardDescription>Thank you for your purchase</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Your transaction reference: <span className="font-medium">{reference}</span>
          </p>

          <div className="bg-gray-50 p-4 rounded-lg text-left">
            <p className="text-sm text-gray-500 mb-2">Order Details:</p>
            {orderDetails ? (
              <>
                <p>
                  <span className="font-medium">Artwork:</span> {orderDetails.artwork?.title}
                </p>
                <p>
                  <span className="font-medium">Amount:</span> ${orderDetails.amount?.toLocaleString()}
                </p>
                <p>
                  <span className="font-medium">Date:</span> {new Date(orderDetails.createdAt).toLocaleString()}
                </p>
              </>
            ) : (
              <p>Order details not available</p>
            )}
          </div>

          <p className="text-sm text-gray-500">
            A confirmation email has been sent to your email address.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center space-x-4">
          <Button asChild>
            <Link href="/gallery">Continue Shopping</Link>
          </Button>
          {orderDetails?.artwork?.id && (
            <Button variant="outline" asChild>
              <Link href={`/gallery/${orderDetails.artwork.id}`}>View Artwork</Link>
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}