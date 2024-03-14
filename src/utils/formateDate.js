export function getDate(value, formate, valueType) {
  if (!formate) return value;

  if (valueType === "s") {
    value *= 1000;
  } else if (valueType === "iso") {
    value = new Date(value);
  }

  let options = {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
    hour: "numeric",
    minute: "numeric",
  };
  if (formate === "date")
    options = { day: "numeric", month: "long", year: "numeric" };
  else if (formate === "day") options = { weekday: "long" };
  else if (formate === "time") options = { hour: "numeric", minute: "numeric" };

  return Intl.DateTimeFormat("en-us", options).format(value);
}
