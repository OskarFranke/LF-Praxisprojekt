"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ArrowLeft, CreditCard, Smartphone, Wallet, Banknote, Check } from "lucide-react"
import Link from "next/link"
import { useSearchParams, useRouter } from "next/navigation"
import { notFound } from "next/navigation"

// Mock data
const movies = {
  "1": {
    id: 1,
    title: "Mad Max: Fury Road",
    duration: "120 min",
    image: "/mad-max-fury-road-movie-poster.jpg",
  },
  "2": {
    id: 2,
    title: "Nobody 2",
    duration: "92 min",
    image: "/nobody-2-movie-poster-action-thriller.jpg",
  },
}

interface CheckoutPageProps {
  params: {
    id: string
  }
}

export default function CheckoutPage({ params }: CheckoutPageProps) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const movie = movies[params.id as keyof typeof movies]

  const [paymentMethod, setPaymentMethod] = useState("credit-card")
  const [agreeToTerms, setAgreeToTerms] = useState(false)
  const [customerData, setCustomerData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  })

  const time = searchParams.get("time") || "20:00"
  const theater = searchParams.get("theater") || "Theater 1"
  const type = searchParams.get("type") || "2D"
  const basePrice = Number.parseFloat(searchParams.get("price") || "12.50")
  const adultTickets = Number.parseInt(searchParams.get("adult") || "0")
  const childTickets = Number.parseInt(searchParams.get("child") || "0")
  const seats = searchParams.get("seats")?.split(",") || []

  const adultPrice = basePrice
  const childPrice = basePrice * 0.75
  const totalPrice = adultTickets * adultPrice + childTickets * childPrice

  if (!movie) {
    notFound()
  }

  const handleInputChange = (field: string, value: string) => {
    setCustomerData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleConfirmOrder = () => {
    if (!agreeToTerms) {
      alert("Please agree to the Terms and Conditions")
      return
    }

    if (!customerData.firstName || !customerData.lastName || !customerData.email) {
      alert("Please fill in all required fields")
      return
    }

    // In a real app, this would process the payment
    router.push(`/confirmation/${params.id}?orderNumber=${Date.now()}`)
  }

  const paymentMethods = [
    {
      id: "credit-card",
      name: "Credit Card",
      icon: CreditCard,
      logos: ["💳", "💳", "💳"],
    },
    {
      id: "stripe",
      name: "Stripe",
      icon: Smartphone,
      logos: ["💳"],
    },
    {
      id: "paypal",
      name: "PayPal",
      icon: Wallet,
      logos: ["💳"],
    },
    {
      id: "cash",
      name: "Cash",
      icon: Banknote,
      logos: ["💰"],
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <Link
                href={`/booking/${params.id}`}
                className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Seats</span>
              </Link>
              <h1 className="text-2xl font-bold text-foreground">SUPER CINEMA</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Step 1: Customer Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm">
                    1
                  </span>
                  Check your Details
                </CardTitle>
                <p className="text-sm text-muted-foreground">Booking as Guest</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      value={customerData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={customerData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={customerData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="Enter your email address"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={customerData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="Enter your phone number"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Step 2: Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm">
                    2
                  </span>
                  Select your preferred Method of Payment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
                  {paymentMethods.map((method) => (
                    <div
                      key={method.id}
                      className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                    >
                      <RadioGroupItem value={method.id} id={method.id} />
                      <method.icon className="h-5 w-5" />
                      <Label htmlFor={method.id} className="flex-1 cursor-pointer">
                        {method.name}
                      </Label>
                      <div className="flex gap-1">
                        {method.logos.map((logo, index) => (
                          <span key={index} className="text-lg">
                            {logo}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </RadioGroup>

                {/* Terms and Conditions */}
                <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="terms"
                      checked={agreeToTerms}
                      onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
                    />
                    <Label htmlFor="terms" className="text-sm cursor-pointer">
                      Agree the Terms of Service and Conditions *
                    </Label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Overview */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Booking Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Movie Details */}
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Movie:</span>
                    <span className="font-medium">{movie.title}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Type:</span>
                    <span>{type}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Length:</span>
                    <span>{movie.duration}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Time:</span>
                    <span>19. August 2025, {time}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Theater:</span>
                    <span>{theater}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Row:</span>
                    <span>{seats.length > 0 ? seats[0].charAt(0) : "-"}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Seats:</span>
                    <span>{seats.join(", ")}</span>
                  </div>
                </div>

                {/* Discount Code */}
                <div>
                  <Label htmlFor="discount" className="text-sm">
                    Discount Code:
                  </Label>
                  <div className="flex gap-2 mt-1">
                    <Input id="discount" placeholder="Enter code" className="text-sm" />
                    <Button variant="outline" size="sm">
                      Apply
                    </Button>
                  </div>
                </div>

                {/* Tickets Summary */}
                <div className="space-y-2">
                  <h4 className="font-semibold">Your Tickets:</h4>
                  {adultTickets > 0 && (
                    <div className="flex justify-between text-sm">
                      <span>{adultTickets}x Adult</span>
                      <span>€{(adultTickets * adultPrice).toFixed(2)}</span>
                    </div>
                  )}
                  {childTickets > 0 && (
                    <div className="flex justify-between text-sm">
                      <span>{childTickets}x Child</span>
                      <span>€{(childTickets * childPrice).toFixed(2)}</span>
                    </div>
                  )}
                </div>

                {/* Total */}
                <div className="border-t pt-4">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total:</span>
                    <span>€{totalPrice.toFixed(2)}</span>
                  </div>
                </div>

                {/* Confirm Button */}
                <Button className="w-full" onClick={handleConfirmOrder} disabled={!agreeToTerms}>
                  <Check className="h-4 w-4 mr-2" />
                  Confirm Order
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
