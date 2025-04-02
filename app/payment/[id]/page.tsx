"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/use-toast"
import { z } from "zod"

// Define validation schemas
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  address: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
})

interface Artwork {
  id: string
  title: string
  price: number
  artist?: {
    name: string
  }
  imageUrl?: string
}

interface FormData {
  name: string
  email: string
  phone: string
  address: string
  city: string
  country: string
}

export default function PaymentPage() {
  const { id } = useParams<{ id: string }>()
  const [artwork, setArtwork] = useState<Artwork | null>(null)
  const [loading, setLoading] = useState(true)
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [isProcessing, setIsProcessing] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
  })
  const router = useRouter()

  useEffect(() => {
    if (!id) {
      router.push("/gallery")
      return
    }

    const fetchArtwork = async () => {
      try {
        setLoading(true)
        const res = await fetch(`/api/artworks/${id}`)
        if (!res.ok) throw new Error("Failed to fetch artwork")
        const data = await res.json()
        setArtwork(data)
      } catch (error) {
        console.error("Error fetching artwork:", error)
        toast({
          title: "Error",
          description: "Failed to load artwork details",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchArtwork()
  }, [id, router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    try {
      formSchema.parse(formData)
      return true
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors = error.flatten().fieldErrors
        const formattedErrors = Object.entries(errors).reduce((acc, [key, value]) => {
          acc[key] = value?.[0] || ""
          return acc
        }, {} as Record<string, string>)
        setFormErrors(formattedErrors)
      }
      return false
    }
  }

  const saveOrder = async (paymentDetails: any) => {
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          artworkId: id,
          customer: formData,
          paymentDetails,
          amount: artwork?.price,
          artworkTitle: artwork?.title,
        }),
      })

      if (!response.ok) throw new Error("Failed to save order")
      return await response.json()
    } catch (error) {
      console.error("Error saving order:", error)
      throw error
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    if (!validateForm()) {
      setIsProcessing(false)
      return
    }

    if (!artwork?.price || artwork.price <= 0) {
      toast({
        title: "Error",
        description: "Invalid artwork price",
        variant: "destructive",
      })
      setIsProcessing(false)
      return
    }

    try {
      const config = {
        public_key: process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY!,
        tx_ref: `art-${id}-${Date.now()}`,
        amount: artwork.price,
        currency: "USD",
        payment_options: "card,mobilemoney,ussd",
        customer: {
          email: formData.email,
          phone_number: formData.phone,
          name: formData.name,
        },
        customizations: {
          title: "Art Gallery Payment",
          description: `Payment for ${artwork.title}`,
          logo: "/logo.png", // Update with your logo path
        },
        meta: {
          artwork_id: id,
          customer_name: formData.name,
        },
      }

      const handleFlutterPayment = useFlutterwave(config)

      handleFlutterPayment({
        callback: async (response) => {
          if (response.status === "successful") {
            try {
              await saveOrder(response)
              closePaymentModal()
              router.push(`/payment/success?reference=${response.transaction_id}&artworkId=${id}`)
            } catch (error) {
              console.error("Error processing payment:", error)
              toast({
                title: "Error",
                description: "Payment succeeded but we encountered an issue saving your order",
                variant: "destructive",
              })
            }
          }
        },
        onClose: () => {
          setIsProcessing(false)
        },
      })
    } catch (error) {
      console.error("Payment error:", error)
      toast({
        title: "Error",
        description: "Failed to initialize payment",
        variant: "destructive",
      })
      setIsProcessing(false)
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="text-lg">Loading artwork details...</p>
      </div>
    )
  }

  if (!artwork) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <p className="text-lg">Artwork not found</p>
        <Button onClick={() => router.push("/gallery")}>
          Back to Gallery
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-6">
        <Button variant="ghost" asChild>
          <Link href={`/gallery/${id}`} className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Artwork
          </Link>
        </Button>
      </div>

      <h1 className="text-3xl font-bold mb-8">Complete Your Purchase</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Billing Information</CardTitle>
              <CardDescription>
                Please enter your details to complete the transaction
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={formErrors.name ? "border-destructive" : ""}
                    />
                    {formErrors.name && (
                      <p className="text-sm text-destructive">{formErrors.name}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={formErrors.email ? "border-destructive" : ""}
                    />
                    {formErrors.email && (
                      <p className="text-sm text-destructive">{formErrors.email}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={formErrors.phone ? "border-destructive" : ""}
                    />
                    {formErrors.phone && (
                      <p className="text-sm text-destructive">{formErrors.phone}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Shipping Address</Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      "Proceed to Payment"
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div>
          <Card className="sticky top-8">
            <CardHeader>
              <CardTitle className="text-2xl">Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  {artwork.imageUrl && (
                    <div className="relative h-16 w-16 rounded-md overflow-hidden border">
                      <img
                        src={artwork.imageUrl}
                        alt={artwork.title}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  )}
                  <div>
                    <h3 className="font-medium">{artwork.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {artwork.artist?.name || "Unknown Artist"}
                    </p>
                  </div>
                  <div className="ml-auto font-medium">
                    ${artwork.price.toLocaleString()}
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${artwork.price.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>Calculated at checkout</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${artwork.price.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-start gap-2 pt-0">
              <p className="text-sm text-muted-foreground">
                All transactions are secure and encrypted.
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs text-muted-foreground">Powered by</span>
                <img
                  src="/flutterwave-logo.svg"
                  alt="Flutterwave"
                  className="h-4"
                />
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}