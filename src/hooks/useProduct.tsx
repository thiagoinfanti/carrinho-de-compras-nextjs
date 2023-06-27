import {  ProductFetchResponse } from "@/types/products-response";
import axios, { AxiosPromise } from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

const fetcher = (id: string): AxiosPromise<ProductFetchResponse> => {

  return axios.post(
      API_URL,
      {
          query: `
          query{
            Product(id: "${id}"){
              id,
              image_url,
              description,
              category,
              price_in_cents,
              name
            }
          }
          `
      }
      )
}

export async function useProduct(id: string){
 const {data} = await fetcher(id);
 return {
  data: data.data.Product
 }

}