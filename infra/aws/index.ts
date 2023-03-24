import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as apigateway from "@pulumi/aws-apigateway"; 
import { createStaticWebsite } from "./web";
import { createVoteTable } from "./persistence";

// Import the program's configuration settings.
//const config = new pulumi.Config();

// A Lambda function to invoke
const fn = new aws.lambda.CallbackFunction("fn", {
    callback: async (ev, ctx) => {
        return {
            statusCode: 200,
            body: new Date().toISOString(),
        };
    }
})


const fn_post = new aws.lambda.CallbackFunction("fn2", {
    callback: async (ev : any, ctx) => {
        return {
            statusCode: 200,
            body: ev.body,
        };
    }
})

const lambdaRole = new aws.iam.Role("lambdaRole", {
    assumeRolePolicy: aws.iam.assumeRolePolicyForPrincipal({Service: "lambda.amazonaws.com"}),
});

const lambdaBasicExecutionRole = new aws.iam.RolePolicyAttachment("basicExecutionRole", {
    role: lambdaRole.name,
    policyArn: aws.iam.ManagedPolicy.AWSLambdaBasicExecutionRole,
});

// A Lambda function to invoke
// https://www.pulumi.com/registry/packages/aws/api-docs/lambda/function/
const myLamb = new aws.lambda.Function("java-vote-handler-fn", {
    code: new pulumi.asset.FileArchive("../../aws-vote-app/app/build/distributions/app.zip"),
    role: lambdaRole.arn,
    
    handler: "aws.vote.app.VoteLambda", // references the exported function in index.js
    runtime: "java11",
    environment: {
        variables: {
            foo: "bar",
        },
    },
});

// A REST API to route requests to HTML content and the Lambda function
const api = new apigateway.RestAPI("api", {
    routes: [
        { path: "/", localPath: "www"},
        { path: "/test", method: "GET", eventHandler: myLamb },
        { path: "/aws", method: "POST", eventHandler: fn_post },
        { path: "/azure", method: "POST", eventHandler: fn_post },
        { path: "/gcp", method: "POST", eventHandler: fn_post },
    ]
});


// ----------------------------------------------------------- persistence

createVoteTable();


const cdn = createStaticWebsite();

// ----------------------------------------------------------- output
export const url = api.url;
export const cdnURL = pulumi.interpolate`https://${cdn.domainName}`;
export const cdnHostname = cdn.domainName;