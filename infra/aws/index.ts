import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as apigateway from "@pulumi/aws-apigateway"; 
import { createStaticWebsite } from "./web";
import { createVoteTable } from "./persistence";

// Import the program's configuration settings.
//const config = new pulumi.Config();

// A Lambda function to invoke
const score_fn = new aws.lambda.CallbackFunction("fn", {
    callback: async (ev, ctx) => {
        return {
            statusCode: 200,
            body: JSON.stringify({
                score: 1,
            }),
        };
    }
})


const lambdaRole = new aws.iam.Role("lambdaRole", {
    assumeRolePolicy: aws.iam.assumeRolePolicyForPrincipal({Service: "lambda.amazonaws.com"}),
});

const lambdaBasicExecutionRole = new aws.iam.RolePolicyAttachment("AWSLambdaBasicExecutionRole", {
    role: lambdaRole.name,
    policyArn: aws.iam.ManagedPolicy.AWSLambdaBasicExecutionRole,
});

/*
const dynamoDbExecutionRole = new aws.iam.RolePolicyAttachment("dynamoDbExecutionRole", {
    role: lambdaRole.name,
    policyArn: aws.iam.ManagedPolicy.AWSLambdaInvocationDynamoDB,
});
*/

const dynamoDbExecutionRole2 = new aws.iam.RolePolicyAttachment("AmazonDynamoDBFullAccess", {
    role: lambdaRole.name,
    policyArn: aws.iam.ManagedPolicy.AmazonDynamoDBFullAccess
});

// A Lambda function to invoke
// https://www.pulumi.com/registry/packages/aws/api-docs/lambda/function/
// const myLamb = new aws.lambda.Function("java-vote-handler-fn", {
//     code: new pulumi.asset.FileArchive("../../aws-vote-app/app/build/distributions/app.zip"),
//     role: lambdaRole.arn,

//     handler: "aws.vote.app.VoteLambda", // references the exported function in index.js
//     runtime: "java11",
//     environment: {
//         variables: {
//             foo: "bar",
//         },
//     },
// });

// A Lambda function to invoke
// https://www.pulumi.com/registry/packages/aws/api-docs/lambda/function/
const vote_fn = new aws.lambda.Function("ts-vote-handler-fn", {
    code: new pulumi.asset.FileArchive("../../aws-vote-app-ts/function.zip"),
    role: lambdaRole.arn,
    handler: "index.handler", // references the exported function in index.js
    runtime: "nodejs18.x",
    environment: {
        variables: {
            foo: "bar",
        },
    },
});

// A REST API to route requests to HTML content and the Lambda function
const api = new apigateway.RestAPI("vote-api", {
    routes: [
        { path: "/", localPath: "www"},
        { path: "/score", method: "GET", eventHandler: score_fn },
        { path: "/vote", method: "POST",eventHandler: vote_fn }
    ]
});


// ----------------------------------------------------------- persistence

createVoteTable();




const cdn = createStaticWebsite();

// ----------------------------------------------------------- output
export const url = api.url;
export const cdnURL = pulumi.interpolate`https://${cdn.domainName}`;
export const cdnHostname = cdn.domainName;