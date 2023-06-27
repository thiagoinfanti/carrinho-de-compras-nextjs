import { ProductCart } from "@/types/product"
import { formatPrice } from "@/utils/format-price"
import { ChangeEvent } from "react"
import { styled } from "styled-components"

interface CartItemProps{
    product: ProductCart
    handleUpdateQuantity(id: string, quantity: number): void
    handleDelete(id: string): void
}

const ContainerItem = styled.li`
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    list-style: none;
    width: 100%;
    background: #fff;
    border-radius: 8px;
`

const ImageItem = styled.img`
    max-width: 25.6rem;
    width: 100%;
    border-radius: 8px 0 0 8px;
    object-fit: cover;
    @media(max-width: 1024px){
        max-width: 15.6rem;
    }
`

const InfosItem = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    flex-direction: column;
    padding: 2rem;
    width: 100%;

    h2{
        font-family: inherit;
        font-size: 2rem;
        font-weight: 300;
        line-height: 3rem;
        color: #41414D;
        margin-bottom: 2rem;
    }

    p{
        font-family: inherit;
        font-size: 1.2rem;
        font-weight: 400;
        line-height: 1.8rem;
        color: #41414D;
    }

    span{
        font-family: inherit;
        font-size: 1.6rem;
        font-weight: 600;
        line-height: 2.4rem;
        color: #09090A;
    }

    div:first-child{
        display: flex;
        flex-direction: column;
        width: 100%;
        position: relative;

        button{
            position: absolute;
            top: 0;
            right: 0;
            cursor: pointer;
            border: none;
            outline: none;
            background:transparent;
        }

    }

    div:last-child{
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-direction: row;
        width: 100%;

        select{
            padding: 0.8rem;
            border: 1.5px solid #A8A8B3;
            border-radius: 8px;
            background-color: #F3F5F6;
            color: #737380;
            font-weight: 400;
            font-size: 1.6rem;
            outline: none;
        }

    }
`

export function CartItem({ product, handleUpdateQuantity, handleDelete } : CartItemProps){
    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        handleUpdateQuantity(product.id, Number(e.target.value))
    }
    return (
        <ContainerItem>
            <ImageItem src={product.image_url} />
            <InfosItem>
                <div>
                    <button onClick={() => handleDelete(product.id)} aria-label="Deletar">
                        <img src="/icons/trash-icon.svg" />
                    </button>
                    <h2>{product.name}</h2>
                    <p>{product.description}</p>
                </div>
                <div>
                    <select 
                        value={product.quantity}
                        onChange={handleChange}
                    >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                    <span>{formatPrice(product.price_in_cents)}</span>
                </div>
            </InfosItem>
        </ContainerItem>
    )
}