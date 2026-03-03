import { Link } from "react-router-dom";
import styles from "./Breadcrumbs.module.css";
import { RightOutlined } from "@ant-design/icons";

type BreadcrumbsProps = {
  label: string;
  to?: string;
};

export default function Breadcrumbs({ items }: { items: BreadcrumbsProps[] }) {
  return (
    <nav className={styles.breadcrumbs}>
      <ol className={styles.list}>
        {items.map((item, i) => {
          const isLast = i === items.length - 1;

          return (
            <li key={i} className={styles.item}>
              {item.to && !isLast ? (
                <Link className={styles.link} to={item.to}>
                  {item.label}
                </Link>
              ) : (
                <span className={styles.current}>{item.label}</span>
              )}

              {!isLast && (
                <span className={styles.sep}>
                  <RightOutlined />
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
