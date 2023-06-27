"use client"
import { FilterType } from "@/types/filter-types";
import { OrderTypes } from "@/types/order-types";
import { ReactNode, createContext, useState } from "react";

export const FilterContext = createContext({
    search: '',
    page: 0,
    type: FilterType.ALL,
    order: OrderTypes.NEWS,
    setSearch: (value: string) => {},
    setPage: (value: number) => {},
    setType: (value: FilterType) => {},
    setOrder: (value: OrderTypes) => {},
})

interface ProviderProps {
    children: ReactNode
}

export function FilterContextProvider({children}: ProviderProps){
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(0)
    const [type, setType] = useState(FilterType.ALL)
    const [order, setOrder] = useState(OrderTypes.NEWS)

    return (
        <FilterContext.Provider value={{search, page, type, order, setSearch, setPage, setType, setOrder}}>
            {children}
        </FilterContext.Provider>
    )
}