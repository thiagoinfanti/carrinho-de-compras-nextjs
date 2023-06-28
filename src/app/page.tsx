"use client"

import styles from './page.module.css'
import { FilterBar } from '@/components/filter-bar'
import { ProductList } from '@/components/product-list'
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    document.title = "Capputteno - Cart"
}, []);
  return (
    <main className={styles.main}>
      <FilterBar />
      <ProductList />
    </main>
  )
}
