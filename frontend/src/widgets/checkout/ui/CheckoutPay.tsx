import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { OrderRequest } from "../../../entities/Order/model/types";
import { useGetStatusQuery } from "../../../features/auth/api/auth.api";
import { useGetCartQuery } from "../../../features/cart/api/cart.api";
import styles from "./CheckoutPay.module.css";
import { payAndCreateOrder } from "../../../shared/ui/Blockchain/payAndCreateOrder";
import { getContractAddress } from "../../../shared/ui/Blockchain/contract";

type CheckoutPayProps = {
  firstName: string;
  lastName: string;
  phone: string;
  city: string;
  department: string;
};

function CheckoutPay({
  firstName,
  lastName,
  phone,
  city,
  department,
}: CheckoutPayProps) {
  const navigate = useNavigate();
  const { data: status, isLoading: isStatusLoading } = useGetStatusQuery();
  const { data: cart } = useGetCartQuery();
  const [orderError, setOrderError] = useState<string | null>(null);
  const [isPaying, setIsPaying] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const total = cart?.items?.total ?? 0;

  const handlePay = async () => {
    setOrderError(null);

    if (!status?.isAuthenticated) {
      setOrderError("Потрібна авторизація");
      return;
    }

    const payload: OrderRequest = {
      firstName,
      lastName,
      phone,
      city,
      department,
    };

    if (
      !payload.firstName.trim() ||
      !payload.lastName.trim() ||
      !payload.phone.trim() ||
      !payload.city.trim() ||
      !payload.department.trim()
    ) {
      setOrderError("Заповніть ім'я, прізвище, телефон, місто і відділення");
      return;
    }

    try {
      setIsPaying(true);

      const contractAddress = await getContractAddress();
      await payAndCreateOrder(contractAddress, String(total), payload);

      navigate("/orders");
    } catch (e: unknown) {
      const msg = "Payment failed";
      setOrderError(String(msg));
    } finally {
      setIsPaying(false);
    }
  };

  const disabled = isStatusLoading || isPaying || !accepted;

  return (
    <div className={styles.main}>
      {orderError && <p className={styles.error}>{orderError}</p>}
      <h1>Оформлення замовлення</h1>
      <div className={styles.summary}>
        <div className={styles.summaryRow}>
          <span>Всього:</span>
          <span>{total} ETH</span>
        </div>

        {total <= 30 ? (
          <div className={styles.summaryRow}>
            <span>Доставка:</span>
            <span>1 ETH</span>
          </div>
        ) : (
          <div className={styles.summaryRow}>
            <span>Доставка:</span>
            <span>Безкоштовно</span>
          </div>
        )}

        <div className={styles.summaryRowTotal}>
          <span>До сплати:</span>
          <span>{total} ETH</span>
        </div>
      </div>

      <div className="devider" />

      <label className={styles.terms}>
        <input
          type="checkbox"
          checked={accepted}
          onChange={(e) => setAccepted(e.target.checked)}
        />
        <span>
          Погоджуюсь з<Link to="/users-agreement"> Умовами користування</Link>
        </span>
      </label>

      <button
        className={styles.button}
        type="button"
        onClick={handlePay}
        disabled={disabled}
      >
        {isPaying ? "Оплата..." : "Сплатити"}
      </button>
    </div>
  );
}

export default CheckoutPay;
