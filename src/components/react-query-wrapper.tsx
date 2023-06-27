"use client"

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

type Props = {
    children: React.ReactNode
}

export default function ReactQueryWrapper({children}: Props){
    const client = new QueryClient()
    return(
        <QueryClientProvider client={client}>{children}</QueryClientProvider>
    )
}