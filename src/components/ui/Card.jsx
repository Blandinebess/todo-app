export default function Card({ title, body }) {
  return (
    <article className="card">
      <h2>{title}</h2>
      <p>{body}</p>
    </article>
  );
}
