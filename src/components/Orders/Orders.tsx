import styles from './Orders.module.css';
import FeedList from '../FeedList/FeedList';


export const Orders = () => {
  return (
    <section className={`ml-4`}>
      <FeedList />
    </section>
  )
}

export default Orders