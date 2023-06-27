"use client"

import { ProductsFetchResponse } from "@/types/products-response";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosPromise } from "axios";
import { useFilter } from "./useFilter";
import { FilterType } from "@/types/filter-types";
import { getCategoryByType, getOrderByType } from "@/utils/products-filter";
import { OrderTypes } from "@/types/order-types";


const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

const fetcher = (query: string): AxiosPromise<ProductsFetchResponse> => {

  return axios.post(
      API_URL,
      {
          query 
      }
      )
}

const queryBuilder = (type: FilterType, page: number, ord: OrderTypes, search: string) => {

 let filter = "";
 let q = "";
 
 if(type != FilterType.ALL){
    filter = `category: "${getCategoryByType(type)}",`
 }

 const order = getOrderByType(ord);

 
if(search.trim().length > 0){
  q = `q: "${search.trim()}",` 
 }
 

  return `
  query{
    _allProductsMeta(
      filter: {
        ${filter}
        ${q}
      }
    ){
      count,
    },
    allProducts(
      page:${page}, 
      perPage:${process.env.NEXT_PUBLIC_PER_PAGE_PAGINATION},
      filter: {
        ${filter}
        ${q}
      },
      sortField: "${order?.field}",
      sortOrder: "${order?.order}"
    ){
      id,
      name,
      price_in_cents,
      image_url,
      category,
    }
  }
  `
}

export function useProducts(){
  const { type, page, order, search } = useFilter()
  const q = queryBuilder(type, page, order, search)
  const { data } = useQuery({
      queryFn: () => fetcher(q),
      queryKey: ['products', type, page, order, search],
      staleTime: 1000 * 60 * 5

  })
  
 return {
  data: data?.data.data.allProducts,
  totalPages: data?.data?.data?._allProductsMeta.count
 }
  
}