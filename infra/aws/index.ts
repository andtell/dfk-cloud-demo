import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as apigateway from "@pulumi/aws-apigateway";
import { createStaticWebsite } from "./web";
//import { createDatabase } from "./persistence";

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

// A REST API to route requests to HTML content and the Lambda function
const api = new apigateway.RestAPI("api", {
    routes: [
        { path: "/", localPath: "www"},
        { path: "/date", method: "GET", eventHandler: fn },
    ]
});

// The URL at which the REST API will be served.
export const url : string = api.url;


const cdn = createStaticWebsite(url);



export const cdnURL = pulumi.interpolate`https://${cdn.domainName}`;
export const cdnHostname = cdn.domainName;