"use client"

import styled from "styled-components";
import { useRouter } from "next/navigation";
import { useFilter } from "@/hooks/useFilter";

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
    
    const {cart} = useFilter();

    const router = useRouter();
    
    return (
        <ChartIconContainer onClick={()=> router.push("/cart")}>
            <img src="/icons/chart-icon.svg" />
            {cart.length > 0 && <TotalChartBall>{cart.length}</TotalChartBall>}
        </ChartIconContainer>
    )
    
}