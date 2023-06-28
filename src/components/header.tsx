"use client"

import { styled } from "styled-components"
import { Saira_Stencil_One } from "next/font/google"
import { PrimaryInputSearch } from "./primary-input"
import { ChartContainer } from "./chart-icon"
import { useRouter } from "next/navigation"

const sairaStencilOne = Saira_Stencil_One({
    weight: ['400'],
    subsets: ['latin']
})

interface HeaderProps{

}

const TagHeader = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 160px;
    background: #fff;

    @media(max-width:1240px){
        padding: 2rem 6rem;
    }

    @media(max-width:580px){
        padding: 1rem 2rem;
    }

    @media(max-width:380px){
        flex-direction: column;
    }
`

const Logo = styled.a`
    color: #5D5D6D;
    font-weight: 400;
    font-size: 4rem;
    line-height: 6rem;
    cursor: pointer;
    @media(max-width: 580px){
        font-size: 3rem;
        line-height: 5rem;
    }
`

const SearchChartIconContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2.6rem;
    @media(max-width:660px){
        gap: 1.6rem; 
    }
`

export function Header(props: HeaderProps){

    const router = useRouter()
    
    return(
        <TagHeader>
            <Logo onClick={()=>router.push("/")} className={sairaStencilOne.className}>capputteno</Logo>
            <SearchChartIconContainer>
                <PrimaryInputSearch  placeholder="Procurando por algo específico?" />
                <ChartContainer />
            </SearchChartIconContainer>
        </TagHeader>
    )
}
