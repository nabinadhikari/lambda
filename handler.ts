import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import * as mongoose from 'mongoose';
import Todo from './Todo';

let count = 0;

export const connectDb = async () => {
  if (mongoose.connection.readyState === 0) {
    console.log("creating new db connection");
    await mongoose.connect("mongodb://nabin123:nabin123@ds253857.mlab.com:53857/lambda-todo");
  } else {
    console.log("using existing db connection");
  }
};

export const hello: APIGatewayProxyHandler = async (_event, _context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless Webpack (Typescript) v1.0! Your function executed successfully!',
      input: _event,
    }, null, 2),
  };
}

export const dbTest: APIGatewayProxyHandler = async (_event, _context) => {
  _context.callbackWaitsForEmptyEventLoop = false;
  await connectDb();
  count++;
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless Webpack (Typescript) v1.0! Your function executed successfully!',
      count
    }, null, 2),
  };
};

export const createTodo: APIGatewayProxyHandler = async (_event, _context) => { 
  _context.callbackWaitsForEmptyEventLoop = false;
  await connectDb();
  const {title} = JSON.parse(_event.body);
  const todo = await Todo.create({title});
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Todo created successfully',
      todo
    }, null, 2),
  };
};

export const getTodos: APIGatewayProxyHandler = async (_event, _context) => { 
  _context.callbackWaitsForEmptyEventLoop = false;
  await connectDb();
  const todos = await Todo.find();
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Todo created successfully',
      todos
    }, null, 2),
  };
};
