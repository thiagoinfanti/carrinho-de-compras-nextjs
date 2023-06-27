"use client"

import { useEffect, useState } from "react";

export function useLocalStorage<T>(item: string, data: T){
    
    if(!localStorage.getItem(item)){
        localStorage.setItem(item, JSON.stringify([]))
        return 0;
    }else{
        if(!!data){
            localStorage.setItem(item, JSON.stringify(data))
        }
    }

    let items = localStorage.getItem(item)
    items = JSON.parse(items!)

    let ttChart = document.getElementById("totalChartBall");
    if(ttChart){
        if(items?.length == 0){
            ttChart.classList.add("invisible")
            ttChart.innerHTML = "0";
        }else{
            ttChart.classList.remove("invisible")
            ttChart.innerHTML = String(items?.length);
        }
    }

    return items?.length;
    
}