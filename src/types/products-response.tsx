import { Product } from "./product"

export interface ProductsFetchResponse {
    data: {
        _allProductsMeta: {count: number},
        allProducts: Product[]
    }
}

export interface ProductFetchResponse {
    data: {
        Product: Product
    }
}