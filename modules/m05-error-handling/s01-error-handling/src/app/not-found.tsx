import Link from "next/link";

export default function NotFound() {
  return (
    <main style={{ padding: "2rem" }}>
      <h1>404 - Page not found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link href="/">Back to home</Link>
    </main>
  );
}
