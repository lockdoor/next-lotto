export function getLottoCurrent() {
  return typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("lottoCurrent")) 
    : "";
}

export function formatDate(dateString) {
  const option = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const date = new Date(dateString);
  return date.toLocaleDateString("th-TH", option);
}

export function dateToInputValue(dateString) {
  const arr = dateString.split("T");
  return arr[0];
}