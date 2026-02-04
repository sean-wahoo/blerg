import Link from "next/link";

export default function Home() {
  return (
    <section>
      <h1>hello.</h1>
      <p>
        this is where i (
        <Link target="_blank" href="https://seanline.dev">
          sean
        </Link>
        ) say my bullshit.
      </p>
      <p>
        since you&apos;re already here, why don&apos;t you read my bullshit
        <span>?</span>
      </p>
    </section>
  );
}
