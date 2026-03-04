import MdxImage from "@/components/img";
import styles from "./styles.module.scss";
const NotFound = () => {
  return (
    <div className={styles.not_found}>
      <h1>theres nothing here goober</h1>
      <div className={`img_container ${styles.not_found_img_container}`}>
        <MdxImage
          src={`${process.env.NEXT_PUBLIC_NOT_FOUND_IMAGE}`}
          alt="aspect=true&size=100&filetype=gif&alt=you dumbass"
          filetype="gif"
        />
        <em>this is you</em>
      </div>
    </div>
  );
};

export default NotFound;
