import { FilterType } from "@/types/filter-types";
import { OrderTypes } from "@/types/order-types";

export function getCategoryByType(type: FilterType){
    if(type == FilterType.MUG) return "mugs";
    if(type == FilterType.SHIRT) return "t-shirts";
    return ""
}

export function getOrderByType(type: OrderTypes){
    if(type === OrderTypes.POPULARITY) return {field: "sales", order: "DESC"};
    if(type === OrderTypes.BIGGEST_PRICE) return {field: "price_in_cents", order: "DESC"};
    if(type === OrderTypes.MINOR_PRICE)  return {field: "price_in_cents", order: "ASC"};
    if(type === OrderTypes.NEWS) return {field: "created_at", order: "DESC"};
}