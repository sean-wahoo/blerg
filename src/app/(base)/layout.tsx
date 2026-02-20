import { PropsWithChildren } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import styles from "./page.module.scss";
const BaseLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer />
    </>
  );
};

export default BaseLayout;
