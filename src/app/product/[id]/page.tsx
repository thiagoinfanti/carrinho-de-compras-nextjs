import React from 'react';
import styles from '../../page.module.css'
import { useProduct } from '@/hooks/useProduct';
import ProductContainer from '@/components/product-container';

export default async function Product({params}: {params: {id: string}}){

    const {data} = await useProduct(params.id);

    if(!data){
        return {
            notFound: true
        }
    }

    return (
        <main className={styles.main}>
            <ProductContainer data={data}></ProductContainer>
        </main>
    )
}