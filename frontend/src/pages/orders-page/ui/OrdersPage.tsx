import { useGetMyOrdersQuery } from "../../../features/order/api/order.api";
import Breadcrumbs from "../../../shared/ui/Breadcrumbs/Breadcrumbs";
import {
  OrdersEmptyPage,
  OrdersNotEmptyPage,
} from "../../../widgets/orders-page";
import styles from "./OrdersPage.module.css";

function OrdersPage() {
  const { data: orders, isLoading, isError } = useGetMyOrdersQuery();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading orders</p>;
  
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <Breadcrumbs
          items={[{ label: "Головна", to: "/" }, { label: "Мої замовлення" }]}
        />
        <h1 className={styles.title}>Мої замовлення</h1>
      </div>

      {orders?.length ? <OrdersNotEmptyPage orders={orders} /> : <OrdersEmptyPage />}
    </div>
  );
}

export default OrdersPage;
