import { useEffect, useState } from "react";
import { useGetStatusQuery } from "../../../features/auth/api/auth.api";
import { useGetCartQuery } from "../../../features/cart/api/cart.api";
import Breadcrumbs from "../../../shared/ui/Breadcrumbs/Breadcrumbs";
import {
  CheckoutDelivery,
  CheckoutEmpty,
  CheckoutNotAuth,
  CheckoutNotEmpty,
  CheckoutPay,
} from "../../../widgets/checkout";
import styles from "./CheckoutPage.module.css";

function CheckoutPage() {
  const { data } = useGetCartQuery();
  const { data: status } = useGetStatusQuery();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [department, setDepartment] = useState("");

  useEffect(() => {
    if (!status) return;

    setFirstName((prev) => prev || status.firstName || "");
    setLastName((prev) => prev || status.lastName || "");
    setEmail((prev) => prev || status.email || "");
    setPhone((prev) => prev || status.phone || "");
    setCity((prev) => prev || status.city || "");
    setDepartment((prev) => prev || status.department || "");
  }, [status]);

  const isAuth = !!status?.isAuthenticated;
  const items = data?.items?.items ?? [];

  return (
    <div className="container">
      <div className={styles.header}>
        <Breadcrumbs
          items={[
            { label: "Головна", to: "/" },
            { label: "Оформлення замовлення" },
          ]}
        />

        <h1 className={styles.title}>Оформлення замовлення</h1>
      </div>

      {!isAuth ? (
        <CheckoutNotAuth />
      ) : items.length === 0 ? (
        <CheckoutEmpty />
      ) : (
        <div className={styles.container}>
          <div className={styles.checkout}>
            <CheckoutNotEmpty cart={data?.items} />
            <CheckoutDelivery
              firstName={firstName}
              lastName={lastName}
              email={email}
              phone={phone}
              city={city}
              department={department}
              onFirstNameChange={setFirstName}
              onLastNameChange={setLastName}
              onEmailChange={setEmail}
              onPhoneChange={setPhone}
              onCityChange={setCity}
              onDepartmentChange={setDepartment}
            />
          </div>

          <div className={styles.checkoutPay}>
            <CheckoutPay
              firstName={firstName}
              lastName={lastName}
              phone={phone}
              city={city}
              department={department}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default CheckoutPage;
