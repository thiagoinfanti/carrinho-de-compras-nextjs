"use client"
import { FilterType } from "@/types/filter-types";
import { OrderTypes } from "@/types/order-types";
import { ReactNode, createContext, useEffect, useState } from "react";

export const FilterContext = createContext({
    search: '',
    page: 0,
    type: FilterType.ALL,
    order: OrderTypes.NEWS,
    cart: [],
    setSearch: (value: string) => {},
    setPage: (value: number) => {},
    setType: (value: FilterType) => {},
    setOrder: (value: OrderTypes) => {},
    setCart: (value: []) => {},
})

interface ProviderProps {
    children: ReactNode
}

export function FilterContextProvider({children}: ProviderProps){
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(0)
    const [type, setType] = useState(FilterType.ALL)
    const [order, setOrder] = useState(OrderTypes.NEWS)
    const [cart, setCart] = useState([])
    
    useEffect(() => {
        if(localStorage.getItem("cart-items")){
            setCart(JSON.parse(localStorage.getItem("cart-items")!));
        }
    },[])

    return (
        <FilterContext.Provider value={{search, page, type, order, cart, setSearch, setPage, setType, setOrder, setCart}}>
            {children}
        </FilterContext.Provider>
    )
}