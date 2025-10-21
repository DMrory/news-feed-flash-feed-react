const topics = ["World", "Politics", "Business", "Tech", "Sports", "Entertainment"];
const headlines = [
  "Breaking: Major event unfolds in ",
  "Experts react to shocking developments in ",
  "Latest updates on the growing story in ",
  "New policies shake up the ",
  "Historic win in ",
  "Tech breakthrough changes the face of "
];

export function generateNews() {
  const category = topics[Math.floor(Math.random() * topics.length)];
  const title = headlines[Math.floor(Math.random() * headlines.length)] + category;
  const content = `In a surprising turn of events, ${category.toLowerCase()} has taken center stage with new updates emerging by the minute. Stay tuned for more.`;
  
  return {
    id: Date.now(),
    title,
    category,
    content,
    time: new Date().toLocaleTimeString(),
  };
}
