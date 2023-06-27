"use client"
import styled from "styled-components"
import React from 'react';
import { useRouter } from "next/navigation";

const BackBtn = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.8rem;
    border: none;
    cursor: pointer;
    font-family: inherit;
    font-weight: 500;
    font-size: 1.4rem;
    line-height: 150%;
    color: #617480
`
export function BackButton(){
    const router = useRouter()
    
    return (
        <BackBtn onClick={()=> router.back()}>
            <img src="/icons/back-icon.svg" />
            Voltar
        </BackBtn>
    )
}
