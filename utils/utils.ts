export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function parseAction<T>(response: T) {
  return JSON.parse(JSON.stringify(response));
}
