import React from 'react'

export default function Loading() {
  return (
    <div className="absolute inset-0 w-full h-full flex justify-center items-center z-50 opacity-0 animate-[pop-up_0.5s_ease-out_forwards]">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
      <span className="ml-3 text-sm text-muted-foreground">Loading...</span>
    </div>
  )
}