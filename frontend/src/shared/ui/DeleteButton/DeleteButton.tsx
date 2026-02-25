import { DeleteOutlined } from "@ant-design/icons";
import styles from "./DeleteButton.module.css";
import Tippy from "@tippyjs/react";

type DeleteProps = {
  tippy: string;
};

function DeleteButton({ tippy }: DeleteProps) {
  return (
    <div>
      <Tippy content={tippy} delay={[100, 100]} theme="menu" placement="bottom">
        <DeleteOutlined className={styles.actionIcon} />
      </Tippy>
    </div>
  );
}

export default DeleteButton;
