export interface Item {
  id: string;
  name: string;
}

const items: Item[] = [
  { id: "1", name: "Keyboard" },
  { id: "2", name: "Monitor" },
  { id: "3", name: "Headphones" },
];

// Simulates a database query
export async function getItem(id: string): Promise<Item | undefined> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return items.find((item) => item.id === id);
}
