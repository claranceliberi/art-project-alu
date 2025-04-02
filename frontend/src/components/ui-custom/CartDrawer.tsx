import { useState } from 'react'
import { Link } from 'react-router-dom'
import { X, Trash2, Plus, Minus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { LazyImage } from './LazyImage'
import { useCart } from '@/contexts/CartContext'
import { formatPrice } from '@/lib/utils'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, removeFromCart, updateQuantity, getTotalPrice } = useCart()
  const [isUpdating, setIsUpdating] = useState(false)

  const handleQuantityChange = async (artworkId: string, newQuantity: number) => {
    if (isUpdating) return
    setIsUpdating(true)
    await updateQuantity(artworkId, newQuantity)
    setIsUpdating(false)
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full">
          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
              <p className="text-muted-foreground mb-4">Your cart is empty</p>
              <Button asChild>
                <Link to="/browse">Continue Shopping</Link>
              </Button>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto py-4">
                {items.map((item) => (
                  <div key={item.artwork.id} className="flex gap-4 p-4 border-b">
                    <div className="w-20 h-20 flex-shrink-0">
                      <LazyImage
                        src={item.artwork.imageUrl}
                        alt={item.artwork.title}
                        aspectRatio="1/1"
                        className="rounded-md"
                      />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-medium">{item.artwork.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            by {item.artwork.artistName}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => removeFromCart(item.artwork.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleQuantityChange(item.artwork.id, item.quantity - 1)}
                            disabled={item.quantity <= 1 || isUpdating}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleQuantityChange(item.artwork.id, item.quantity + 1)}
                            disabled={isUpdating}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <span className="font-medium">
                          {formatPrice(item.artwork.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between mb-4">
                  <span className="font-medium">Total</span>
                  <span className="font-medium">{formatPrice(getTotalPrice())}</span>
                </div>
                <Button className="w-full" asChild>
                  <Link to="/checkout">Proceed to Checkout</Link>
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
} 