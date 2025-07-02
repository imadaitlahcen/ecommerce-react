"use client"

import * as React from "react"
import { X } from "lucide-react"
import { cn } from "../../lib/utils.ts"

interface SheetProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
}

interface SheetTriggerProps {
  asChild?: boolean
  children: React.ReactNode
}

interface SheetContentProps {
  side?: "top" | "right" | "bottom" | "left"
  className?: string
  children: React.ReactNode
}

const SheetContext = React.createContext<{
  open: boolean
  onOpenChange: (open: boolean) => void
}>({
  open: false,
  onOpenChange: () => {},
})

const Sheet: React.FC<SheetProps> = ({ open = false, onOpenChange = () => {}, children }) => {
  return <SheetContext.Provider value={{ open, onOpenChange }}>{children}</SheetContext.Provider>
}

const SheetTrigger: React.FC<SheetTriggerProps> = ({ asChild, children }) => {
  const { onOpenChange } = React.useContext(SheetContext)

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      onClick: () => onOpenChange(true),
    })
  }

  return <button onClick={() => onOpenChange(true)}>{children}</button>
}

const SheetContent: React.FC<SheetContentProps> = ({ side = "right", className, children }) => {
  const { open, onOpenChange } = React.useContext(SheetContext)

  if (!open) return null

  const sideClasses = {
    top: "top-0 left-0 right-0 h-auto",
    right: "top-0 right-0 h-full w-80",
    bottom: "bottom-0 left-0 right-0 h-auto",
    left: "top-0 left-0 h-full w-80",
  }

  return (
    <>
      <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm" onClick={() => onOpenChange(false)} />
      <div className={cn("fixed z-50 bg-background p-6 shadow-lg border", sideClasses[side], className)}>
        <button
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100"
          onClick={() => onOpenChange(false)}
        >
          <X className="h-4 w-4" />
        </button>
        {children}
      </div>
    </>
  )
}

export { Sheet, SheetContent, SheetTrigger }
