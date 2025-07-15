import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
  ScanCommand,
  UpdateCommand,
  DeleteCommand,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({
  region: "us-east-1", // replace with your AWS region
});

// Define your DynamoDB table name here
const TableName = "Todos"; // Replace with your actual table name

export const ddbDocClient = DynamoDBDocumentClient.from(client);

export async function addTodo(todo) {
  try {
    const command = new PutCommand({
      TableName,
      Item: todo,
    });
    await ddbDocClient.send(command);
  } catch (error) {
    console.error("Error adding todo:", error);
    throw error;
  }
}

export async function getTodos() {
  try {
    const command = new ScanCommand({
      TableName,
    });
    const response = await ddbDocClient.send(command);
    return response.Items;
  } catch (error) {
    console.error("Error getting todos:", error);
    throw error;
  }
}

export async function updateTodo(id, updates) {
  try {
    const command = new UpdateCommand({
      TableName,
      Key: { id },
      UpdateExpression: "set #completed = :completed",
      ExpressionAttributeNames: { "#completed": "completed" },
      ExpressionAttributeValues: { ":completed": updates.completed },
    });
    await ddbDocClient.send(command);
  } catch (error) {
    console.error("Error updating todo:", error);
    throw error;
  }
}

export async function deleteTodo(id) {
  try {
    const command = new DeleteCommand({
      TableName,
      Key: { id },
    });
    await ddbDocClient.send(command);
  } catch (error) {
    console.error("Error deleting todo:", error);
    throw error;
  }
}