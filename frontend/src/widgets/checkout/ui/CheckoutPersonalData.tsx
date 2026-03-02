import styles from "./CheckoutDelivery.module.css";

type Props = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  onFirstNameChange: (value: string) => void;
  onLastNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
};

function CheckoutPersonalData({
  firstName,
  lastName,
  email,
  phone,
  onFirstNameChange,
  onLastNameChange,
  onEmailChange,
  onPhoneChange,
}: Props) {
  return (
    <div className={styles.card}>
      <div className={styles.row}>
        <div className={styles.info}>
          <input
            className={styles.input}
            value={firstName}
            onChange={(event) => onFirstNameChange(event.target.value)}
            placeholder="Єгор"
          />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.info}>
          <input
            className={styles.input}
            value={lastName}
            onChange={(event) => onLastNameChange(event.target.value)}
            placeholder="Старостенко"
          />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.info}>
          <input
            className={styles.input}
            value={email}
            onChange={(event) => onEmailChange(event.target.value)}
            placeholder="example@gmail.com"
            autoComplete="email"
          />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.info}>
          <input
            className={styles.input}
            value={phone}
            onChange={(event) => onPhoneChange(event.target.value)}
            placeholder="+380..."
            autoComplete="tel"
          />
        </div>
      </div>
    </div>
  );
}

export default CheckoutPersonalData;
