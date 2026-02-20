"use client";
import NextImage, { ImageLoader } from "next/image";
import {
  CanvasHTMLAttributes,
  MouseEventHandler,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import styles from "./img.module.scss";
import { c, mdxImageLoader } from "@/lib/utils";

interface MdxImageProps extends CanvasHTMLAttributes<HTMLCanvasElement> {
  filetype: "gif" | "jpg" | "png" | "webp";
  src: string;
  alt: string;
}

const MdxImage = ({ src, alt, className = "" }: MdxImageProps) => {
  const opts = useMemo(() => new URLSearchParams(alt), [alt]);
  const alignClass = opts.get("align") ?? "center";
  const classNames: string[] = [styles.img, alignClass, className];

  const [imgSize, setImgSize] = useState<{ w: number; h: number }>({
    w: opts.get("w") ? Number(opts.get("w")) : 0,
    h: opts.get("h") ? Number(opts.get("h")) : 0,
  });

  const imageSrc = src + "." + opts.get("filetype");

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const [isStopped, setIsStopped] = useState<boolean>(false);
  useEffect(() => {
    const image = new Image();
    image.src = imageSrc;
    image.onload = () => {
      if (!canvasRef.current) {
        return;
      }
      const context = canvasRef.current!.getContext("2d");
      if (canvasRef.current) {
        if (opts.has("aspect", "true")) {
          canvasRef.current!.width = image.width;
          canvasRef.current!.height = image.height;
          if (opts.get("size")) {
            canvasRef.current!.width *= Number(opts.get("size")) / 100;
            canvasRef.current!.height *= Number(opts.get("size")) / 100;
          }
        } else {
          canvasRef.current!.width = image.width;
          canvasRef.current!.height = image.height;
        }
        setImgSize({
          w: canvasRef.current!.width,
          h: canvasRef.current!.height,
        });
        context?.drawImage(
          image,
          0,
          0,
          canvasRef.current!.width,
          canvasRef.current!.height,
        );
      }
    };
    if (imageRef.current) {
      imageRef.current!.src = imageSrc;
    }
  }, [opts, imageSrc]);

  const onToggleClick: MouseEventHandler = () => {
    setIsStopped(!isStopped);
  };

  return opts.has("filetype", "gif") ? (
    <>
      <span onClick={onToggleClick} className={styles.toggle_gif}>
        {isStopped ? "play gif" : "stop gif"}
      </span>
      <canvas
        ref={canvasRef}
        className={c(...classNames, isStopped ? styles.show : styles.hide)}
      />
      <NextImage
        height={imgSize.h ?? 240}
        width={imgSize.w ?? 240}
        src={imageSrc}
        alt={alt}
        ref={imageRef}
        className={c(...classNames, !isStopped ? styles.show : styles.hide)}
      />
    </>
  ) : (
    <>
      <canvas
        ref={canvasRef}
        className={c(...classNames, isStopped ? styles.show : styles.hide)}
      />
      <NextImage
        ref={imageRef}
        src={imageSrc}
        loader={mdxImageLoader}
        height={imgSize.h ?? 240}
        width={imgSize.w ?? 240}
        decoding="async"
        alt={alt}
        className={c(...classNames)}
      />
    </>
  );
};

export default MdxImage;
