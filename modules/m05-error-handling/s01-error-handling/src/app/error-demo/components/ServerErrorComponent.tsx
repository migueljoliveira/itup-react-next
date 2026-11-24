async function fetchData(shouldFail: boolean) {
  await new Promise((resolve) => setTimeout(resolve, 800)); // simulated network delay

  if (shouldFail) {
    throw new Error("Server: failed to fetch data from the API");
  }

  return { message: "Data loaded from the server", time: new Date().toLocaleTimeString() };
}

export default async function ServerErrorComponent({ shouldFail = false }: { shouldFail?: boolean }) {
  const data = await fetchData(shouldFail);
  console.log("[ServerErrorComponent] rendered on the server");

  return (
    <p>
      {data.message} at   {data.time}
    </p>
  );
}
