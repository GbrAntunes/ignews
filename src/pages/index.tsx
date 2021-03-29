import { GetStaticProps } from 'next'
import Head from 'next/head'
import { SubscribeButton } from '../components/SubscribeButton'
import { stripe } from '../services/stripe'

import styles from './home.module.scss'

interface HomeProps {
  product: {
    priceId: string
    amount: number
  }
}

export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>

      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>
          <h1>News about the <span>React</span> world.</h1>
          <p>
            Get access to all the publications <br/>
            <span>for {product.amount} month</span>
          </p>
          <SubscribeButton priceId={product.priceId} />
        </section>

        <img src="/assets/images/avatar.svg" alt="Girl coding"/>
      </main>
    </>
  )
}

// Apenas de pages -> components
// Precisa ter esse nome
// Avaliar se é realmente necessário realizar a chamada pelo backend
export const getServerSideProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1IaQb5E53kdNk6GE32vu41A9', {
    expand: ['product'],
  })
  
  // Para recuperar mais dados, utilize o expand
  // const price = await stripe.prices.retrieve('price_1IaQb5E53kdNk6GE32vu41A9', {
  //   expand: ['product'],
  // })

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price.unit_amount / 100), // Em centavos
  }
  
  return {
    props: {
      product
    },
    revalidate: 60 * 60 * 24 // 24h
  }
}
