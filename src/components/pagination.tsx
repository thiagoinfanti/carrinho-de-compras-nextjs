"use client"

import { useFilter } from "@/hooks/useFilter"
import { styled } from "styled-components"

interface PaginationProps{
    pages: number
}

const ContainerPagination = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-top:3.4rem;
`

const ItemsPagination = styled.ul`
    display: flex;
    margin-left: auto;
    justify-content: space-between;
    gap: 0.4rem;

    li {
        display: flex;
        align-items: center;
        justify-content: center;
        width:3.2rem; 
        height: 3.2rem;
        font-family: inherit;
        font-weight: 400;
        font-size: 1.6rem;
        line-height: 150%;
        border-radius: 8px;
        color: var(--primary-font-dark);
        padding: 0.5rem;
        background-color:#E9E9F0;
        cursor: pointer;
        list-style:none;
        border: 1px solid transparent;
        user-select: none;
        @media(max-width: 480px){
            font-size: 1.2rem;
            line-height: 1.8rem;
        }
    }

    li.selected {
        cursor: auto;
        border: 1px solid var(--orange-low);
        color: var(--orange-low);
        background: #fff;
    }
`

export function Pagination(props: PaginationProps){

    const generatePagination = () => {

        const {page, setPage} = useFilter()

        const handleChangePage = (value: number) => {
            setPage(value);
        }

        let ttPages = Math.ceil((props.pages / Number(process.env.NEXT_PUBLIC_PER_PAGE_PAGINATION)))
        
        let items = []
        for(let i = 0; i < ttPages; i++){
            if(i == page){
                items.push(<li key={i} className="selected">{i + 1}</li>)
            }else{
                items.push(<li key={i} onClick={() => handleChangePage(i)}>{i + 1}</li>)
            }
        }

        if(ttPages > 1 && (page) > 0){
            items.push(<li key="next" onClick={() => handleChangePage((page - 1))}>&lsaquo;</li>)
        }

        if(ttPages > 1 && (page + 1) < ttPages){
            items.push(<li key="prev" onClick={() => handleChangePage((page + 1))}>&rsaquo;</li>)
        }

        return items
    }

    return (
        <ContainerPagination>
            <ItemsPagination>
            {generatePagination()}
            </ItemsPagination>
        </ContainerPagination>
    )
}
