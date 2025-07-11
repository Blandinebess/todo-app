import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
  ScanCommand,
  UpdateCommand,
  DeleteCommand,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
export const ddbDocClient = DynamoDBDocumentClient.from(client);
const TableName = "Todos"; // update this if your table has a different name

export async function addTodo(todo) {
  const command = new PutCommand({
    TableName,
    Item: todo,
  });
  await ddbDocClient.send(command);
}

export async function getTodos() {
  const command = new ScanCommand({
    TableName,
  });
  const response = await ddbDocClient.send(command);
  return response.Items;
}
export async function updateTodo(id, updates) {
  const command = new UpdateCommand({
    TableName,
    Key: { id },
    UpdateExpression: "set #completed = :completed",
    ExpressionAttributeNames: { "#completed": "completed" },
    ExpressionAttributeValues: { ":completed": updates.completed },
  });
  await ddbDocClient.send(command);
}

export async function deleteTodo(id) {
  const command = new DeleteCommand({
    TableName,
    Key: { id },
  });
  await ddbDocClient.send(command);
}
