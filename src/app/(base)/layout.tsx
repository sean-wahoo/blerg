import { PropsWithChildren } from "react";
import styles from "./page.module.scss";
const BaseLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return <main className={styles.main}>{children}</main>;
};

export default BaseLayout;
