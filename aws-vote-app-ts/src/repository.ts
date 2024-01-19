import * as AWS from "aws-sdk";
import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import {v4 as uuidv4} from "uuid";

const REGION: string = "eu-north-1";
const TABLE_NAME = process.env.VOTE_TABLE ?? 'votes';

const client = new DynamoDBClient({ region: REGION });

function newItemParams(cloud: string) {
    const now : Date = new Date();
    const epoch = now.valueOf();
    const humanReadable = now.toISOString();
    return {
        TableName : TABLE_NAME,
        /* Item properties will depend on your application concerns */
        Item: {
            id: {S: uuidv4()},
            createdAt: {N: `${epoch}`},
            timeStamp: {S: humanReadable},
            cloud: {S: cloud}
        },
    }
}



export async function putVote(cloud: string) {
    console.log("Persisting Vote...");
    const command = new PutItemCommand(newItemParams(cloud));
    return execute(command);
}


async function execute(command: any) {
    try {
        console.log("Executing DB command...");
        const data = await client.send(command);
        console.log("Response from DB: ", JSON.stringify(data))
      } catch (error) {
        console.error("Could not execute DB statement.", error)
      } finally {
        // finally.
      }
}
  

