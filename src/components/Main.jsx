import Card from "./ui/Card.jsx";

export default function Main() {
  return (
    <main className="main">
      <Card
        title="Hello 👋"
        body="Edit src/components to get started."
      />
      <Card
        title="Hot reload ✅"
        body="Save a file & see it update instantly."
      />
    </main>
  );
}
