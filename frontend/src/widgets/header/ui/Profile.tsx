import {
  CalendarOutlined,
  CloseOutlined,
  EditOutlined,
  MailOutlined,
  PhoneOutlined,
  PlusOutlined,
  UserOutlined,
} from "@ant-design/icons";
import styles from "./Profile.module.css";
import Tippy from "@tippyjs/react";

import { useUiState } from "../model/modal-state";
import DeleteButton from "../../../shared/ui/DeleteButton/DeleteButton";

function Profile() {
  const { isOpen, close } = useUiState();
  const show = isOpen("profile");

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

        <div className={"devider"} />

        <div className={styles.container}>
          <p className={styles.sectionTitle}>Номер телефону</p>

          <div className={styles.card}>
            <div className={styles.row}>
              <div className={styles.leftIcon}>
                <PhoneOutlined />
              </div>

              <div className={styles.info}>
                <p className={styles.label}>Ваш номер телефону №1</p>
                <p className={styles.value}>+380 96 292 99 99</p>
              </div>

              <div className={styles.right}>
                <DeleteButton
                  tippy={"У акаунті повинен бути хоча б\n один номер телефону"}
                />

                <Tippy
                  content="Редагувати"
                  delay={[100, 100]}
                  theme="menu"
                  placement="bottom"
                >
                  <EditOutlined className={styles.actionIcon} />
                </Tippy>
              </div>
            </div>

            <div className={"devider"} />

            <div className={styles.rowAdd}>
              <p className={styles.label}>Додати номер</p>
              <Tippy
                content="Додати"
                delay={[100, 100]}
                theme="menu"
                placement="bottom"
              >
                <PlusOutlined className={styles.actionIcon} />
              </Tippy>
            </div>
          </div>

          <div className={styles.headerUser}>
            <p className={styles.sectionTitle}>Особисті дані</p>
            <Tippy
              content="Редагувати"
              delay={[100, 100]}
              theme="menu"
              placement="bottom"
            >
              <EditOutlined className={styles.actionIcon} />
            </Tippy>
          </div>

          <div className={styles.card}>
            <div className={styles.row}>
              <div className={styles.leftIcon}>
                <UserOutlined />
              </div>

              <div className={styles.info}>
                <p className={styles.label}>Ім'я</p>
                <p className={styles.value}>Не вказано</p>
              </div>
            </div>
            <div className={"devider"} />
            <div className={styles.row}>
              <div className={styles.leftIcon}>
                <UserOutlined />
              </div>

              <div className={styles.info}>
                <p className={styles.label}>Прізвище</p>
                <p className={styles.value}>Не вказано</p>
              </div>
            </div>
            <div className={"devider"} />
            <div className={styles.row}>
              <div className={styles.leftIcon}>
                <CalendarOutlined />
              </div>

              <div className={styles.info}>
                <p className={styles.label}>Дата народження</p>
                <p className={styles.value}>Не вказано</p>
              </div>
            </div>
            <div className={"devider"} />
            <div className={styles.row}>
              <div className={styles.leftIcon}>
                <MailOutlined />
              </div>

              <div className={styles.info}>
                <p className={styles.label}>Email</p>
                <p className={styles.value}>egorstarostenko345@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
