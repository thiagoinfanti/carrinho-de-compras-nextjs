"use client"

import styled from "styled-components"
import { BackButton } from './back-button';

import { formatPrice } from "@/utils/format-price";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Product } from "@/types/product";

interface ProductContainerProps{
    data: Product
}

const ContainerProduct = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
    flex-wrap: wrap;
    width: 100%;
`
const ContentProduct = styled.section`
    display: flex;
    justify-content: space-between;
    margin-top:2.5rem;
    gap: 3.2rem;
    width: 100%;

    @media(max-width: 580px){
        flex-direction: column;
    }

`
const ContentInfoProduct = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    width: 100%;
`

const ImageProduct = styled.img`
    display: flex;
    max-width: 64rem;
    width: 100%;
    border-radius: 4px;
    object-fit: cover;
    @media(max-width: 1240px){
        max-width: 42rem;
    }
    @media(max-width: 840px){
        max-width: 32rem;
    }
    @media(max-width: 580px){
        max-width: 100%;
        height:34rem;
    }
`

const CategoryProduct = styled.span`
    font-family: inherit;
    font-size: 1.6rem;
    line-height: 2.4rem;
    font-wight: 400;
    color: #41414D;
`

const TitleProduct = styled.h1`
    font-family: inherit;
    font-wight: 300;
    font-size: 3.2rem;
    font-weight: 300;
    line-height: 4.8rem;
    color: #41414D;
`

const PriceProduct = styled.h3`
    font-family: inherit;
    font-size: 2rem;
    font-weight: 600;
    line-height: 3rem;
    color: #41414D;
    
`

const ShippingInfoProduct = styled.p`
    font-family: inherit;
    font-size: 1.2rem;
    font-weight: 400;
    line-height: 1.8rem;
    font-family: inherit;
    color: #41414D;
    margin-top: 3rem;
`

const LabelDescriptionProduct = styled.h3`
    font-family: inherit;
    font-size: 1.6rem;
    font-weight: 500;
    line-height: 2.4rem;
    color: #41414D;
    text-transform: uppercase;
    margin-top: 6rem;
`

const DescriptionProduct = styled.p`
    font-family: inherit;
    font-size: 1.4rem;
    font-weight: 400;
    line-height: 2.1rem;
    color: #41414D;
    margin-top: 1.4rem;
`

const ContentInfoButtonProduct = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    width: 100%;
    button{
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.8rem;
        margin-top:2rem;
        padding:1rem 0;
        border-radius: 4px;
        background-color:#115D8C;
        border:none;
        cursor:pointer;
        outline:none;
        font-family: inherit;
        font-size: 1.6rem;
        font-weight: 500;
        line-height: 2.4rem;
        text-align: center;
        color:#F5F5FA;
        text-transform: uppercase;
    }
`


export default function PorductContainer({data}: ProductContainerProps){

    function addToChart(d: {}){
        
        let items = JSON.parse(localStorage.getItem("cart-items")!)
        
        if(items.length == 0){
            items.push({...d, quantity: 1});
        }else{
            let existingProductIndex = items.findIndex((item: { id: string; }) => item.id === data.id);
            if(existingProductIndex < 0){
                items.push({...d, quantity: 1});
            }
        }

        useLocalStorage("cart-items", items);
       
    }

    return (
        <ContainerProduct>
            <BackButton />
            
            <ContentProduct>
                <ImageProduct src={data.image_url} />
                <ContentInfoButtonProduct>
                    <ContentInfoProduct>
                        <CategoryProduct>{data.category}</CategoryProduct>
                        <TitleProduct>{data.name}</TitleProduct>
                        <PriceProduct>{formatPrice(data.price_in_cents)}</PriceProduct>
                        <ShippingInfoProduct>*Frete de R$40,00 para todo o Brasil. Grátis para compras acima de R$900,00.</ShippingInfoProduct>
                        <LabelDescriptionProduct>descrição</LabelDescriptionProduct>
                        <DescriptionProduct>{data.description}</DescriptionProduct>
                    </ContentInfoProduct>
                    <button onClick={() => addToChart({...data, quantity: 1})}>
                        <img src="/icons/shopping-bag.svg" />
                        adicionar ao carrinho
                    </button>
                </ContentInfoButtonProduct>
            </ContentProduct>

        </ContainerProduct>
    )
}