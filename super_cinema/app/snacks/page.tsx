"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, Minus, ShoppingCart, User, Search } from "lucide-react"
import Link from "next/link"

interface CartItem {
  id: string
  name: string
  size: string
  flavors?: string[]
  addOns: string[]
  quantity: number
  price: number
}

export default function SnacksPage() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [selectedPopcornSize, setSelectedPopcornSize] = useState("medium")
  const [selectedPopcornFlavors, setSelectedPopcornFlavors] = useState<string[]>(["butter"])
  const [selectedDrinkSize, setSelectedDrinkSize] = useState("medium")
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([])

  const popcornSizes = [
    { id: "small", name: "Small", price: 4.5, description: "Perfect for one person" },
    { id: "medium", name: "Medium", price: 6.5, description: "Great for sharing" },
    { id: "large", name: "Large", price: 8.5, description: "Family size" },
    { id: "xl", name: "XL Bucket", price: 12.0, description: "Refillable bucket" },
  ]

  const popcornFlavors = [
    { id: "butter", name: "Classic Butter", description: "Traditional movie theater butter", price: 0 },
    { id: "caramel", name: "Sweet Caramel", description: "Rich caramel coating", price: 0.5 },
    { id: "cheese", name: "Cheddar Cheese", description: "Sharp cheddar flavor", price: 0.5 },
    { id: "chocolate", name: "Chocolate Drizzle", description: "Dark chocolate coating", price: 0.75 },
    { id: "spicy", name: "Spicy Jalapeño", description: "Hot jalapeño seasoning", price: 0.5 },
    { id: "truffle", name: "Truffle Parmesan", description: "Premium truffle and parmesan", price: 1.5 },
    { id: "cookies-cream", name: "Cookies & Cream", description: "Crushed cookies with cream flavor", price: 1.0 },
    { id: "sriracha", name: "Sriracha Fire", description: "Spicy sriracha kick", price: 0.75 },
    { id: "maple-bacon", name: "Maple Bacon", description: "Sweet maple with bacon bits", price: 1.25 },
    { id: "cotton-candy", name: "Cotton Candy", description: "Sweet pink cotton candy flavor", price: 0.75 },
    { id: "dill-pickle", name: "Dill Pickle", description: "Tangy dill pickle seasoning", price: 0.5 },
    { id: "birthday-cake", name: "Birthday Cake", description: "Vanilla cake with sprinkles", price: 1.0 },
    { id: "buffalo", name: "Buffalo Wing", description: "Spicy buffalo sauce flavor", price: 0.75 },
    { id: "matcha", name: "Matcha Green Tea", description: "Japanese matcha powder", price: 1.0 },
  ]

  const drinkSizes = [
    { id: "small", name: "Small", price: 3.5 },
    { id: "medium", name: "Medium", price: 4.5 },
    { id: "large", name: "Large", price: 5.5 },
    { id: "xl", name: "XL", price: 6.5 },
  ]

  const addOns = [
    { id: "nachos", name: "Loaded Nachos Supreme", price: 7.5, description: "With jalapeños, cheese, and sour cream" },
    { id: "candy", name: "Premium Movie Theater Candy", price: 4.5, description: "Assorted gourmet candies" },
    { id: "pretzel", name: "Artisan Soft Pretzel", price: 5.0, description: "With cheese or mustard dip" },
    { id: "hotdog", name: "Gourmet Cinema Hot Dog", price: 8.5, description: "All-beef with premium toppings" },
    { id: "ice-cream", name: "Häagen-Dazs Ice Cream", price: 6.5, description: "Premium flavors available" },
    { id: "cookies", name: "Warm Chocolate Chip Cookies", price: 4.0, description: "Fresh baked, served warm" },
    { id: "churros", name: "Cinnamon Sugar Churros", price: 5.5, description: "With chocolate dipping sauce" },
    { id: "sliders", name: "Mini Beef Sliders", price: 9.5, description: "Three mini burgers with fries" },
    { id: "wings", name: "Buffalo Chicken Wings", price: 8.0, description: "Spicy wings with ranch dip" },
    { id: "pizza", name: "Personal Pizza", price: 11.0, description: "Margherita or pepperoni" },
    { id: "sushi", name: "Cinema Sushi Box", price: 12.5, description: "Fresh California and salmon rolls" },
    { id: "tacos", name: "Mini Taco Trio", price: 7.0, description: "Chicken, beef, and veggie tacos" },
    { id: "milkshake", name: "Premium Milkshake", price: 6.0, description: "Vanilla, chocolate, or strawberry" },
    {
      id: "energy-drink",
      name: "Energy Drink Selection",
      price: 4.0,
      description: "Red Bull, Monster, or local brands",
    },
  ]

  const addToCart = (type: "popcorn" | "drink" | "combo") => {
    const newItem: CartItem = {
      id: `${type}-${Date.now()}`,
      name: type === "popcorn" ? "Custom Popcorn" : type === "drink" ? "Soft Drink" : "Popcorn & Drink Combo",
      size: type === "drink" ? selectedDrinkSize : selectedPopcornSize,
      flavors: type !== "drink" ? selectedPopcornFlavors : undefined,
      addOns: selectedAddOns,
      quantity: 1,
      price: calculatePrice(type),
    }
    setCart([...cart, newItem])
  }

  const calculatePrice = (type: "popcorn" | "drink" | "combo") => {
    let basePrice = 0

    if (type === "popcorn") {
      basePrice = popcornSizes.find((s) => s.id === selectedPopcornSize)?.price || 0
      const flavorPrice = selectedPopcornFlavors.reduce((total, flavorId) => {
        const flavor = popcornFlavors.find((f) => f.id === flavorId)
        return total + (flavor?.price || 0)
      }, 0)
      basePrice += flavorPrice
    } else if (type === "drink") {
      basePrice = drinkSizes.find((s) => s.id === selectedDrinkSize)?.price || 0
    } else {
      const popcornPrice = popcornSizes.find((s) => s.id === selectedPopcornSize)?.price || 0
      const flavorPrice = selectedPopcornFlavors.reduce((total, flavorId) => {
        const flavor = popcornFlavors.find((f) => f.id === flavorId)
        return total + (flavor?.price || 0)
      }, 0)
      const drinkPrice = drinkSizes.find((s) => s.id === selectedDrinkSize)?.price || 0
      basePrice = (popcornPrice + flavorPrice + drinkPrice) * 0.85 // 15% combo discount
    }

    const addOnPrice = selectedAddOns.reduce((total, addOnId) => {
      const addOn = addOns.find((a) => a.id === addOnId)
      return total + (addOn?.price || 0)
    }, 0)

    return basePrice + addOnPrice
  }

  const updateQuantity = (id: string, change: number) => {
    setCart(
      cart
        .map((item) => (item.id === id ? { ...item, quantity: Math.max(0, item.quantity + change) } : item))
        .filter((item) => item.quantity > 0),
    )
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <Link href="/">
                <h1 className="text-2xl font-bold text-foreground">SUPER CINEMA</h1>
              </Link>
              <nav className="hidden md:flex space-x-6">
                <Link href="/movies" className="text-muted-foreground hover:text-foreground transition-colors">
                  MOVIES
                </Link>
                <Link href="/bookings" className="text-muted-foreground hover:text-foreground transition-colors">
                  MY BOOKINGS
                </Link>
                <Link href="/news" className="text-muted-foreground hover:text-foreground transition-colors">
                  NEWS
                </Link>
                <Link href="/snacks" className="text-foreground font-medium">
                  SNACKS
                </Link>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Search className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            CINEMA <span className="text-primary">SNACKS</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Customize your perfect movie snacks and have them ready when you arrive
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Customization Panel */}
          <div className="lg:col-span-2 space-y-8">
            {/* Popcorn Customization */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  🍿 Custom Popcorn
                  <Badge variant="secondary">Most Popular</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-4">Choose Size</h3>
                  <RadioGroup value={selectedPopcornSize} onValueChange={setSelectedPopcornSize}>
                    <div className="grid grid-cols-2 gap-4">
                      {popcornSizes.map((size) => (
                        <div
                          key={size.id}
                          className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-accent transition-colors"
                        >
                          <RadioGroupItem value={size.id} id={`popcorn-${size.id}`} />
                          <Label htmlFor={`popcorn-${size.id}`} className="flex-1 cursor-pointer">
                            <div className="flex justify-between items-center">
                              <div>
                                <div className="font-medium">{size.name}</div>
                                <div className="text-sm text-muted-foreground">{size.description}</div>
                              </div>
                              <div className="font-semibold">€{size.price.toFixed(2)}</div>
                            </div>
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <h3 className="font-semibold mb-4">
                    Choose Flavors
                    <Badge variant="outline" className="ml-2">
                      Mix & Match
                    </Badge>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-80 overflow-y-auto">
                    {popcornFlavors.map((flavor) => (
                      <div
                        key={flavor.id}
                        className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-accent transition-colors"
                      >
                        <Checkbox
                          id={`flavor-${flavor.id}`}
                          checked={selectedPopcornFlavors.includes(flavor.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedPopcornFlavors([...selectedPopcornFlavors, flavor.id])
                            } else {
                              setSelectedPopcornFlavors(selectedPopcornFlavors.filter((id) => id !== flavor.id))
                            }
                          }}
                        />
                        <Label htmlFor={`flavor-${flavor.id}`} className="flex-1 cursor-pointer">
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="font-medium">{flavor.name}</div>
                              <div className="text-sm text-muted-foreground">{flavor.description}</div>
                            </div>
                            <div className="font-semibold">
                              {flavor.price > 0 ? `+€${flavor.price.toFixed(2)}` : "Free"}
                            </div>
                          </div>
                        </Label>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Selected: {selectedPopcornFlavors.length} flavor{selectedPopcornFlavors.length !== 1 ? "s" : ""}
                  </p>
                </div>

                <Button
                  onClick={() => addToCart("popcorn")}
                  className="w-full"
                  disabled={selectedPopcornFlavors.length === 0}
                >
                  Add Custom Popcorn - €{calculatePrice("popcorn").toFixed(2)}
                </Button>
              </CardContent>
            </Card>

            {/* Drink Customization */}
            <Card>
              <CardHeader>
                <CardTitle>🥤 Soft Drinks</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-4">Choose Size</h3>
                  <RadioGroup value={selectedDrinkSize} onValueChange={setSelectedDrinkSize}>
                    <div className="grid grid-cols-2 gap-4">
                      {drinkSizes.map((size) => (
                        <div
                          key={size.id}
                          className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-accent transition-colors"
                        >
                          <RadioGroupItem value={size.id} id={`drink-${size.id}`} />
                          <Label htmlFor={`drink-${size.id}`} className="flex-1 cursor-pointer">
                            <div className="flex justify-between items-center">
                              <div className="font-medium">{size.name}</div>
                              <div className="font-semibold">€{size.price.toFixed(2)}</div>
                            </div>
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                <div className="flex gap-4">
                  <Button onClick={() => addToCart("drink")} variant="outline" className="flex-1">
                    Add Drink - €{calculatePrice("drink").toFixed(2)}
                  </Button>
                  <Button
                    onClick={() => addToCart("combo")}
                    className="flex-1"
                    disabled={selectedPopcornFlavors.length === 0}
                  >
                    Combo Deal - €{calculatePrice("combo").toFixed(2)}
                    <Badge variant="secondary" className="ml-2">
                      Save 15%
                    </Badge>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Add-ons */}
            <Card>
              <CardHeader>
                <CardTitle>🍭 Premium Cinema Food</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4 max-h-96 overflow-y-auto">
                  {addOns.map((addOn) => (
                    <div
                      key={addOn.id}
                      className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-accent transition-colors"
                    >
                      <Checkbox
                        id={addOn.id}
                        checked={selectedAddOns.includes(addOn.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedAddOns([...selectedAddOns, addOn.id])
                          } else {
                            setSelectedAddOns(selectedAddOns.filter((id) => id !== addOn.id))
                          }
                        }}
                      />
                      <Label htmlFor={addOn.id} className="flex-1 cursor-pointer">
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-medium">{addOn.name}</div>
                            <div className="text-sm text-muted-foreground">{addOn.description}</div>
                          </div>
                          <div className="font-semibold">€{addOn.price.toFixed(2)}</div>
                        </div>
                      </Label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Cart Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  Your Order
                </CardTitle>
              </CardHeader>
              <CardContent>
                {cart.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">Your cart is empty</p>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div key={item.id} className="border-b border-border pb-4">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1">
                            <h4 className="font-medium">{item.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              Size: {item.size}
                              {item.flavors && item.flavors.length > 0 && (
                                <span>
                                  , Flavors:{" "}
                                  {item.flavors
                                    .map((flavorId) => popcornFlavors.find((f) => f.id === flavorId)?.name)
                                    .join(", ")}
                                </span>
                              )}
                            </p>
                            {item.addOns.length > 0 && (
                              <p className="text-sm text-muted-foreground">
                                Add-ons:{" "}
                                {item.addOns.map((addOnId) => addOns.find((a) => a.id === addOnId)?.name).join(", ")}
                              </p>
                            )}
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">€{(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="outline" onClick={() => updateQuantity(item.id, -1)}>
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button size="sm" variant="outline" onClick={() => updateQuantity(item.id, 1)}>
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}

                    <div className="pt-4 border-t border-border">
                      <div className="flex justify-between items-center text-lg font-bold">
                        <span>Total:</span>
                        <span>€{getTotalPrice().toFixed(2)}</span>
                      </div>
                      <Button className="w-full mt-4" disabled={cart.length === 0}>
                        Add to Movie Booking
                      </Button>
                      <p className="text-xs text-muted-foreground text-center mt-2">
                        Snacks will be ready for pickup at the concession stand
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
