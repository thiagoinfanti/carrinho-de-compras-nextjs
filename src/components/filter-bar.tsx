"use client"

import { useFilter } from "@/hooks/useFilter"
import { FilterType } from "@/types/filter-types"
import { styled } from "styled-components"
import { useState } from "react"
import { OrderTypes } from "@/types/order-types"

interface FilterItemProps {
    selected: boolean
}

const ContainerFilterBar = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
`

const FilterList = styled.ul`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4rem;
    @media(max-width: 480px){
        gap: 2rem;
    }
`

const FilterItem = styled.li<FilterItemProps>`
    list-style: none;
    cursor: pointer;
    font-family: inherit;
    font-weight: ${props => props.selected ? '600': '400'};
    font-size: 1.6rem;
    line-height: 2.2rem;
    color: var(${props => props.selected ? '--primary-font-dark': '--primary-font-color'});
    border-bottom: 4px solid ${props => props.selected ? 'var(--orange-low)': 'transparent'};
    text-transform: uppercase;
    @media(max-width: 480px){
        font-size: 1.2rem;
        line-height: 1.8rem;
    }
`

const FilterOrderContainer = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    
    svg {
        margin-left: 0.6rem;
    }

    button {
        border: none;
        background: transparent;
        cursor: pointer;
        font-family: inherit;
        font-weight: 400;
        font-size: 1.4rem;
        line-height: 2.2rem;
        color: var(--primary-font-color);
        display: flex;
        align-items: center;
        justify-content: center;
        @media(max-width: 480px){
            font-size: 1.2rem;
            line-height: 1.8rem;
        }
    }
`

const ContainerOrderFilter = styled.ul`
    position: absolute;
    padding: 1.2rem 1.6rem;
    background: #FFFFFF;
    box-shadow: 0px 0.4rem 1.2rem rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    width: 17.6rem;
    top: 100%;
    right: 0;
    z-index: 999;

    li {
        cursor: pointer;
        list-style:none;
        font-weight: 400;
        font-size: 1.4rem;
        line-height: 2.2rem;
        font-family: inherit;
        color: var(--primary-font-color);
    }

    li + li {
        margin-top: 0.6rem;
    }

`

export function FilterBar() {
    
    const {type, setType, setPage} = useFilter();

    const handleChangeType = (value: FilterType) => {
        setType(value); 
        setPage(0);
    }

    const [isOpenOrder, setIsOpenOrder] = useState(false);

    const [changedOrder, setChangedOrder] = useState("Organizar por")

    const handleOpenOrder = () => setIsOpenOrder(prev => !prev);
    const handleUpdateOrder = (value: OrderTypes, label: string) => {
        setChangedOrder(label);
        setOrder(value);
        setIsOpenOrder(false);
    }

    const { setOrder } = useFilter();

    return (
        <ContainerFilterBar>
            
                <FilterList>
                    <FilterItem 
                        selected={type === FilterType.ALL} 
                        onClick={() => handleChangeType(FilterType.ALL)}
                        >
                            Todos os produtos
                    </FilterItem>
                    <FilterItem 
                        selected={type === FilterType.SHIRT}  
                        onClick={() => handleChangeType(FilterType.SHIRT)}
                        >
                            Camisetas
                    </FilterItem>
                    <FilterItem 
                        selected={type === FilterType.MUG}  
                        onClick={() => handleChangeType(FilterType.MUG)}
                        >
                            Canecas
                    </FilterItem>
                </FilterList>
            
                <FilterOrderContainer>
                    <button onClick={handleOpenOrder}>
                        {changedOrder}
                        <img src="/icons/arrow-down.svg" />
                    </button>
                    {isOpenOrder &&
                        <ContainerOrderFilter>
                            <li onClick={() => handleUpdateOrder(OrderTypes.NEWS,"Novidades")}>Novidades</li>
                            <li onClick={() => handleUpdateOrder(OrderTypes.BIGGEST_PRICE,"Preço: Maior - menor")}>Preço: Maior - menor</li>
                            <li onClick={() => handleUpdateOrder(OrderTypes.MINOR_PRICE,"Preço: Menor - maior")}>Preço: Menor - maior</li>
                            <li onClick={() => handleUpdateOrder(OrderTypes.POPULARITY,"Mais vendidos")}>Mais vendidos</li>
                        </ContainerOrderFilter>
                    }
                </FilterOrderContainer>
                
            
        </ContainerFilterBar>
    )

}