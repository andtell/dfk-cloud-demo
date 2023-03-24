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

// A REST API to route requests to HTML content and the Lambda function
const api = new apigateway.RestAPI("api", {
    routes: [
        { path: "/", localPath: "www"},
        { path: "/date", method: "GET", eventHandler: fn },
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