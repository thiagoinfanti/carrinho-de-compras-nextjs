import { styled } from "styled-components";
import { InputHTMLAttributes } from "react";
import { useFilter } from "@/hooks/useFilter"
import { useRouter } from "next/navigation";

export const PrimaryInput = styled.input`
    width: 100%;
    height: 4.2rem;
    border-radius: 8px;
    background-color: #F3F5F6;
    color: var(primary-font-color);
    font-family: inherit;
    font-size:1.4rem;
    line-height: 2.2rem;
    padding: 1rem 1.6rem;
    border: none;
    outline: none;
`

const InputSearchContaintainer = styled.div`
    position: relative;
    width: 35.2rem;

    img {
        position: absolute;
        top:50%;
        transform: translateY(-50%);
        right: 2rem;
    }

    @media(max-width: 580px){
        width: 24rem;
        img{
            display: none;
        }
    }
`

interface InputSearchProps extends InputHTMLAttributes<HTMLInputElement>{}    

export function PrimaryInputSearch(props: InputSearchProps){

    const router = useRouter();

    const {setSearch, setPage} = useFilter()

    let timeoutSearch: any;

    const searchProducts = (value: string) => {
        clearTimeout(timeoutSearch);
        timeoutSearch = setTimeout(() => {
            setSearch(value);
            setPage(0);
            if(window.location.pathname != "/"){
                router.replace("/")
            }
        },500);
        
    }

    return(
        <InputSearchContaintainer>
            <PrimaryInput onChange={(event) => searchProducts(event.target.value)} {...props} />
            <img src="/icons/search-loupe-icon.svg" />
        </InputSearchContaintainer>
    )

}