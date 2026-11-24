import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getItem } from "@/lib/items";
import styles from "../../error-demo.module.css";

async function ItemDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await getItem(id);

  if (!item) {
    notFound(); // renders the nearest not-found.tsx
  }

  return (
    <p>
      Item {item.id}: {item.name}
    </p>
  );
}

export default function ItemPage({ params }: PageProps<"/error-demo/items/[id]">) {
  return (
    <main className={styles.page}>
      <h1>Item</h1>
      <Suspense fallback={<p>Loading item...</p>}>
        <ItemDetails params={params} />
      </Suspense>
    </main>
  );
}
