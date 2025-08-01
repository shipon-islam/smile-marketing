export const GetTime = (timestamp) => {
  const date = timestamp.toDate();

  const formatted = date.toLocaleString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    // hour: "2-digit",
    // minute: "2-digit",
    hour12: true,
  });
  return formatted;
};
