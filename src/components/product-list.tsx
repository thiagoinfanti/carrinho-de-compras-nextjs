"use client"
import { useProducts } from "@/hooks/useProducts"
import { formatPrice } from "@/utils/format-price"
import { styled } from "styled-components"
import { Pagination } from "./pagination"
import { useRouter } from "next/navigation";

const ProductContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, 25.6rem);
    margin-top:3.2rem;
    grid-gap: 3.2rem;
    max-width: 100%;
    @media(max-width: 480px){
        grid-template-columns: 1fr;
        grid-gap: 2.2rem;
    }
`

const ProductCard = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 25.6rem;
    border-radius: 8px 8px 0 0;
    cursor: pointer;
    background: rgba(255, 255, 255, 0.4);
    backdrop-filter: blur(1rem);

    img {
        border-radius: 8px 8px 0 0;
        width: 100%;
        height: 30rem;
        object-fit: cover;
    }

    div {
        display: flex;
        align-items: start;
        justify-content: center;
        flex-direction: column;
        width: 100%;
        padding: 0.8rem 1.2rem;

        > div {
            width: 100%;
            height: 1px;
            margin: 0.8rem 0;
            background: #DCE2E6;
            padding:0px;
        }
    }

    p {
        font-family: inherit;
        color: var(--primary-font-dark);
        font-weight: 300;
        font-size: 1.6rem;
        line-height: 150%;
    }

    span {
        font-family: inherit;
        font-weight: 600;
        font-size: 1.4rem;
        line-height: 150%;
        color: #09090A;
    }

    @media(max-width: 480px){
        width: 100%;
    }

`

export function ProductList(){

    const router = useRouter()
    const {data,totalPages} = useProducts()

    const handleNavigateProduct = (id: string) => {
        router.push(`/product/${id}`)
    }
    
    
    return (
        <>
        <Pagination pages={Number(totalPages)} />
        <ProductContainer>
            {data?.map(product => <ProductCard key={product.id} onClick={() => handleNavigateProduct(product.id)}>
                <img src={product.image_url} />
                <div>
                    <p>{product.name}</p>
                    <div></div>
                    <span>{formatPrice(product.price_in_cents)}</span>
                </div>
            </ProductCard>
            )}
        </ProductContainer>
        </>
    )
}