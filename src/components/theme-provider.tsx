import * as React from "react"

export function ThemeProvider({ children, ...props }: any) {
  // Simple pass-through for client context or shadcn requirements
  return <div {...props}>{children}</div>
}
