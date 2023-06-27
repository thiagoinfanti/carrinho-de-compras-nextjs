"use client"

import styled from "styled-components";

import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useRouter } from "next/navigation";

const ChartIconContainer = styled.div`
   position: relative;
   width: 2.4rem;
   height: 2.4rem; 
   cursor: pointer;
   img{
        width: 2.4rem;
        height: 2.4rem;
   }
`

const TotalChartBall = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    width: 1.8rem;
    height: 1.8rem;
    background-color: #DE3838;
    color: #fff;
    font-family: inherit;
    font-size: 1rem;
    bottom: -0.9rem;
    right: -0.9rem;
    border-radius: 50%;
    font-weight: 500;
`

export function ChartContainer (){
    
    const ttChart = useLocalStorage("cart-items",null);
    const router = useRouter();
    
    return (
        <ChartIconContainer onClick={()=> router.push("/cart")}>
            <img src="/icons/chart-icon.svg" />
            <TotalChartBall className={ttChart == 0? "invisible": ""} id="totalChartBall">{ttChart}</TotalChartBall>
        </ChartIconContainer>
    )
    
}