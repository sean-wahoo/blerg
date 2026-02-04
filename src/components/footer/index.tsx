import styles from "./footer.module.scss";
const Footer = () => {
  return (
    <footer className={styles.footer}>
      <small className={styles.copyright}>
        © {new Date().getFullYear()} yo mama. All rights reserved
      </small>
    </footer>
  );
};

export default Footer;
