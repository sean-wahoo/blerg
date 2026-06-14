// components/AngularBackground.tsx
import styles from "./shapes.module.scss";

export default function AngularBackground() {
  return (
    <div className={styles.backgroundContainer} aria-hidden="true">
      {/* Shape 1: Top Right Angular Wedge */}
      <svg
        className={`${styles.shape} ${styles.topRightWedge}`}
        viewBox="0 0 400 400"
      >
        <polygon points="400,0 150,0 280,240 400,120" />
        <polygon points="400,120 280,240 380,380 400,380" opacity="0.6" />
      </svg>

      {/* Shape 2: Mid-Left Floating Polygon */}
      <svg
        className={`${styles.shape} ${styles.midLeftPolygon}`}
        viewBox="0 0 300 400"
      >
        <polygon points="0,80 180,0 240,220 70,360 0,280" />
      </svg>

      {/* Shape 3: Bottom Right Matrix Shards */}
      <svg
        className={`${styles.shape} ${styles.bottomRightMatrix}`}
        viewBox="0 0 500 500"
      >
        <polygon points="500,500 120,500 320,180" />
        <polygon points="120,500 200,340 320,180" opacity="0.5" />
      </svg>
    </div>
  );
}
