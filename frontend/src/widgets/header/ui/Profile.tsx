import {
  CalendarOutlined,
  CloseOutlined,
  EditOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import styles from "./Profile.module.css";
import Tippy from "@tippyjs/react";
import { useUiState } from "../model/modal-state.store";
import {
  useGetStatusQuery,
  useUpdateProfileMutation,
} from "../../../features/auth/api/auth.api";
import { useEffect, useState } from "react";

function Profile() {
  const { isOpen, close } = useUiState();
  const show = isOpen("profile");

  const { data, isFetching } = useGetStatusQuery();
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const [isEdit, setIsEdit] = useState(false);

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [birthDate, setBirthDate] = useState<string>("");

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!data) return;
    setFirstName(data.firstName ?? "");
    setLastName(data.lastName ?? "");
    setBirthDate(data.birthDate ?? "");
  }, [data]);

  const onSave = async () => {
    setError(null);

    try {
      await updateProfile({
        firstName: firstName.trim() || null,
        lastName: lastName.trim() || null,
        birthDate: birthDate || null,
      }).unwrap();

      setIsEdit(false);
    } catch (e: any) {
      const msg = "Помилка збереження";
      setError(msg);
    }
  };

  return (
    <div className={styles.main}>
      <div
        className={`${styles.overlay} ${show ? styles.overlayOpen : ""}`}
        onClick={() => close("profile")}
      />

      <div className={`${styles.profile} ${show ? styles.profileOpen : ""}`}>
        <div className={styles.header}>
          <CloseOutlined
            onClick={() => close("profile")}
            className={styles.iconExit}
          />
          <p>Профіль</p>
        </div>

        <div className="devider" />

        <div className={styles.container}>
          <p className={styles.sectionTitle}>Номер телефону</p>

          <div className={styles.card}>
            <div className={styles.row}>
              <div className={styles.leftIcon}>
                <PhoneOutlined />
              </div>

              <div className={styles.info}>
                <p className={styles.label}>Ваш номер телефону</p>
                <p className={styles.value}>{data?.phone ?? "—"}</p>
              </div>
            </div>
          </div>

          <div className={styles.headerUser}>
            <p className={styles.sectionTitle}>Особисті дані</p>

            {!isEdit ? (
              <Tippy content="Редагувати" delay={[100, 100]} theme="menu">
                <EditOutlined
                  className={styles.actionIcon}
                  onClick={() => setIsEdit(true)}
                />
              </Tippy>
            ) : (
              <Tippy content="Зберегти" delay={[100, 100]} theme="menu">
                <CheckOutlined className={styles.actionIcon} onClick={onSave} />
              </Tippy>
            )}
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <div className={styles.card}>
            <div className={styles.row}>
              <div className={styles.leftIcon}>
                <UserOutlined />
              </div>

              <div className={styles.info}>
                <p className={styles.label}>Імʼя</p>

                {isEdit ? (
                  <input
                    className={styles.input}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Введіть імʼя"
                    disabled={isLoading}
                  />
                ) : (
                  <p className={styles.value}>
                    {data?.firstName ?? "Не вказано"}
                  </p>
                )}
              </div>
            </div>

            <div className="devider" />

            <div className={styles.row}>
              <div className={styles.leftIcon}>
                <UserOutlined />
              </div>

              <div className={styles.info}>
                <p className={styles.label}>Прізвище</p>

                {isEdit ? (
                  <input
                    className={styles.input}
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Введіть прізвище"
                    disabled={isLoading}
                  />
                ) : (
                  <p className={styles.value}>
                    {data?.lastName ?? "Не вказано"}
                  </p>
                )}
              </div>
            </div>

            <div className="devider" />

            <div className={styles.row}>
              <div className={styles.leftIcon}>
                <CalendarOutlined />
              </div>

              <div className={styles.info}>
                <p className={styles.label}>Дата народження</p>

                {isEdit ? (
                  <input
                    className={styles.input}
                    type="date"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    disabled={isLoading}
                  />
                ) : (
                  <p className={styles.value}>
                    {data?.birthDate
                      ? new Date(data.birthDate).toLocaleDateString("uk-UA")
                      : "Не вказано"}
                  </p>
                )}
              </div>
            </div>

            <div className="devider" />

            <div className={styles.row}>
              <div className={styles.leftIcon}>
                <MailOutlined />
              </div>

              <div className={styles.info}>
                <p className={styles.label}>Email</p>
                <p className={styles.value}>{data?.email ?? "—"}</p>
              </div>
            </div>
          </div>

          {isFetching && <p className={styles.hint}>Оновлення даних...</p>}
          {isLoading && <p className={styles.hint}>Збереження...</p>}
        </div>
      </div>
    </div>
  );
}

export default Profile;
