"use client"

import React, { useState } from 'react';
import styles from '../page.module.css'
import { BackButton } from '@/components/back-button';
import { styled } from 'styled-components';
import { Product, ProductCart } from '@/types/product';
import { formatPrice } from '@/utils/format-price';
import { CartItem } from '@/components/cart-item';
import { ProductList } from '@/components/product-list';
import { useLocalStorage } from '@/hooks/useLocalStorage';

const ContainerCart = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: row;
    gap: 3.2rem;
    width: 100%;
    
    
    @media(max-width: 2560px){
        height: 100%;
    }

    @media(max-width: 700px){
        flex-direction: column;
        height: auto;
    }
    @media(max-width: 400px){
        height: none;
        
    }
`

const ContentCart = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;

    h1 {
        font-family: inherit;
        font-size: 2.4rem;
        font-weight: 500;
        line-height: 3.6rem;
        color: #41414D;
        margin-top:2rem;
    }

    h2 {
        font-family: inherit;
        font-size: 1.6rem;
        font-weight: 300;
        line-height: 2.4rem;
        color: #41414D;
        margin-top:0.5rem;

        span{
            font-weight: 600;
        }
    }
`

const ContentInfosPayCart = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background:#fff;
    max-width:35rem;
    width: 100%;
    padding: 1.6rem;

    @media(max-width: 1024px){
        max-width:25rem;
    }

    @media(max-width: 700px){
        max-width: 100%;
    }
`

const ContentInfosHeaderCart = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    h1 {
        font-family: inherit;
        font-size: 2rem;
        font-weight: 600;
        line-height: 3rem;
        color: #41414D;
        text-transform: uppercase;
        margin-bottom:2rem;
        @media(max-width: 1024px){
            font-size: 1.6rem;
            line-height: 2.4rem;
        }
    }

    table {
        width: 100%;
        border: none;

        span {
            font-family: inherit;
            font-size: 1.6rem;
            font-weight: 400;
            line-height: 2.4rem;
            color:#41414D;
            @media(max-width: 1024px){
                font-size: 1.4rem;
                line-height: 1.8rem;
            }   
        }

        strong {
            font-family: inherit;
            font-size: 1.6rem;
            font-weight: 600;
            line-height: 2.4rem;
            color:#41414D;
            @media(max-width: 1024px){
                font-size: 1.4rem;
                line-height: 1.8rem;
            }
        }

        tr {
            padding:5px 0;
    
            td {
                width: 50%;
            }

            td:last-child{
                text-align: right;
            }
        }
    }

    hr{
        border: none;
        border-top: 1px solid #DCE2E5;
        height: 1px;
        width: 100%;
        margin: 1rem 0;
    }

    button{
        background: #51B853;
        font-family: inherit;
        font-size: 1.6rem;
        font-weight: 500;
        line-height: 2.4rem;
        text-align: center;
        color: #F5F5FA;
        text-transform: uppercase;
        border-radius:4px;
        padding: 1rem;
        width: 100%;
        border: none;
        cursor: pointer;
        margin-top: 5rem;
        @media(max-width: 1024px){
            font-size: 1.4rem;
            line-height: 1.8rem;
        }
        @media(max-width: 700px){
            margin-bottom: 2.4rem;
        }
    }    
`

const ContentInfosFooterCart = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    span{
        font-family: inherit;
        font-size: 1.4rem;
        font-weight: 500;
        line-height: 2.1rem;
        color: #737380;
        text-transform: uppercase;
        text-decoration: underline;
        margin-top: 0.8rem;
        @media(max-width: 1024px){
            font-size: 1.4rem;
            line-height: 1.8rem;
        }
    }
`

const CartList = styled.ul`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 1.6rem;
    margin-top: 3.1rem;
    width: 100%;
`

export default function Chart(){

    const [cartItems, setCartsItems] = useState(JSON.parse(localStorage.getItem("cart-items")!))

    const ttItemsCart = cartItems.length;

    const ttPriceCart = cartItems.reduce((sum: number, item: ProductCart) => sum += (item.price_in_cents * item.quantity), 0)

    const handleUpdateQuantity = (id: string, quantity: number) => {
        const newValue = cartItems.map((item: ProductCart) => {
            if(item.id !== id) return item
            return {...item, quantity: quantity }
        })
        useLocalStorage('cart-items',newValue)
        setCartsItems(newValue)
        //updateLocalStorage(newValue)
    }

    const handleDeleteItem = (id: string) => {
        const newValue = cartItems.filter((item: ProductCart) => {
            if(item.id !== id) return item
        })
        useLocalStorage('cart-items',newValue)
        setCartsItems(newValue)
        //updateLocalStorage(newValue)
    }
    
    return (
        <main className={styles.main}>
            <ContainerCart>
                <ContentCart>
                    <BackButton />
                    <h1>Seu Carrinho</h1>
                    <h2>Total ({ttItemsCart}) produto{ttItemsCart > 1 ? "s" : ""} <span>{formatPrice(ttPriceCart)}</span></h2>

                    <CartList>
                    {cartItems.map((item: ProductCart) => 
                        <CartItem 
                            product={item}
                            key={item.id}
                            handleDelete={handleDeleteItem}
                            handleUpdateQuantity={handleUpdateQuantity}
                        />)}
                    </CartList>

                </ContentCart>
                <ContentInfosPayCart>
                    <ContentInfosHeaderCart>
                        <h1>Resumo do pedido</h1>
                        <table>
                            <tbody>
                            <tr>
                                <td><span>Subtotal de produtos</span></td>
                                <td><span>{formatPrice(ttPriceCart)}</span></td>
                            </tr>
                            <tr>
                                <td><span>Entrega</span></td>
                                <td><span> R$ { ttPriceCart > 0 ? "40,00": "0,00" }</span></td>
                            </tr>
                            </tbody>
                        </table>
                        <hr />
                        <table>
                            <tbody>
                            <tr>
                                <td><strong>Total</strong></td>
                                <td><strong>{ ttPriceCart > 0 ? formatPrice(ttPriceCart + 4000) : "R$ 0,00"}</strong></td>
                            </tr>
                            </tbody>
                        </table>

                        {ttItemsCart > 0 && <button>finalizar compra</button>}
                    </ContentInfosHeaderCart>
                    <ContentInfosFooterCart>
                        <span>Ajuda</span>
                        <span>reembolsos</span>
                        <span>entregas e frete</span>
                        <span>trocas e devoluções</span>
                    </ContentInfosFooterCart>
                </ContentInfosPayCart>
            </ContainerCart>
        </main>
    )
}