'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export default function ShoppingCartButton({ itemCount = 5, total = 2499 }: { itemCount?: number, total?: number }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="relative border-none"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          <img src="cart.png" className="h-8 w-9" />
          {itemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {itemCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Your Cart</h4>
            <p className="text-sm text-muted-foreground">
              You have {itemCount} item{itemCount !== 1 ? 's' : ''} in your cart
            </p>
          </div>
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Total:</span>
              <span className="text-sm font-medium">₹ {total.toFixed(2)}</span>
            </div>
            <Button className="w-full">View Cart</Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}