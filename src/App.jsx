import React, { useState, useEffect } from "react";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  ScanCommand,
  PutCommand,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({
  region: process.env.REACT_APP_AWS_REGION,
  credentials: {
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  },
});
const docClient = DynamoDBDocumentClient.from(client);

async function scanTodos() {
  const { Items } = await docClient.send(
    new ScanCommand({ TableName: "Todo" })
  );
  return Items || [];
}

async function createTodo(item) {
  await docClient.send(new PutCommand({ TableName: "Todo", Item: item }));
}

export default function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    scanTodos().then(setTodos);
  }, []);

  const handleAdd = async () => {
    if (!text.trim()) return;
    const newItem = { id: Date.now().toString(), text, completed: false };
    await createTodo(newItem);
    setTodos((prev) => [...prev, newItem]);
    setText("");
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Todo App</h1>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="New todo"
        style={{ marginRight: 8 }}
      />
      <button onClick={handleAdd}>Add</button>

      <ul style={{ marginTop: 16 }}>
        {todos.map((t) => (
          <li key={t.id}>{t.text}</li>
        ))}
      </ul>
    </div>
  );
}
