import './globals.css'
import { Saira } from 'next/font/google'
import { Header } from '@/components/header'
import { FilterContextProvider } from '@/contexts/filter-context'
import ReactQueryWrapper from '@/components/react-query-wrapper'
import StyledComponentsRegistry from '@/lib/registry'
import { Metadata } from 'next'

const saira = Saira({ 
  weight: ['300','400','500','600'],
  subsets: ['latin'] 
})

export const metadata: Metadata = {
  title: 'Capputteno',
  description: 'Compre os melhores produtos',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body className={saira.className}>
        <StyledComponentsRegistry>
          <ReactQueryWrapper>
            <FilterContextProvider>
              <Header />
              {children}
            </FilterContextProvider>
          </ReactQueryWrapper>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
