import { useState } from "react";
import { useUpdateProfileMutation } from "../../../features/auth/api/auth.api";
import { useGetCartQuery } from "../../../features/cart/api/cart.api";
import CheckoutDeliverySection from "./CheckoutDeliverySection";
import CheckoutPersonalData from "./CheckoutPersonalData";
import styles from "./CheckoutDelivery.module.css";

type CheckoutDeliveryProps = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  department: string;
  onFirstNameChange: (value: string) => void;
  onLastNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
  onCityChange: (value: string) => void;
  onDepartmentChange: (value: string) => void;
};

function CheckoutDelivery({
  firstName,
  lastName,
  email,
  phone,
  city,
  department,
  onFirstNameChange,
  onLastNameChange,
  onEmailChange,
  onPhoneChange,
  onCityChange,
  onDepartmentChange,
}: CheckoutDeliveryProps) {
  const { data: cart } = useGetCartQuery();
  const [updateProfile] = useUpdateProfileMutation();
  const [error, setError] = useState<string | null>(null);

  const total = cart?.items?.total ?? 0;
  const freeDelivery = total >= 30;
  const leftToFree = Math.max(0, 30 - total);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    try {
      await updateProfile({
        firstName,
        lastName,
        phone,
        city,
        department,
      }).unwrap();
    } catch {
      setError("Помилка");
    }
  };

  return (
    <div className={styles.main}>
      <h1 className={styles.pageTitle}>Доставка і оплата</h1>

      <form id="checkout-form" className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.sectionTitle}>Особисті дані</h2>
        <CheckoutPersonalData
          firstName={firstName}
          lastName={lastName}
          email={email}
          phone={phone}
          onFirstNameChange={onFirstNameChange}
          onLastNameChange={onLastNameChange}
          onEmailChange={onEmailChange}
          onPhoneChange={onPhoneChange}
        />

        <CheckoutDeliverySection
          city={city}
          department={department}
          freeDelivery={freeDelivery}
          leftToFree={leftToFree}
          onCityChange={onCityChange}
          onDepartmentChange={onDepartmentChange}
        />

        {error && <p className={styles.error}>{error}</p>}
      </form>

      <section className={styles.payment}>
        <h2 className={styles.sectionTitle}>Оплата</h2>
        <p>
          Оплата на сайті здійснюється тільки за допомогою повної оплати
          криптовалютою.
        </p>
      </section>
    </div>
  );
}

export default CheckoutDelivery;
