import styles from './styles.module.scss'

interface SubscribeButonProps {
  priceId: string
}

export function SubscribeButton({ priceId }: SubscribeButonProps) {
  return (
    <button
      type="button"
      className={styles.subscribeButton}
    >
      Subscribe now
    </button>
  )
}