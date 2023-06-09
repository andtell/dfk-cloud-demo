import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as synced_folder from "@pulumi/synced-folder";

// Import the program's configuration settings.
const config = new pulumi.Config();
const path = config.get("path") || "./www";
const indexDocument = config.get("indexDocument") || "index.html";
const errorDocument = config.get("errorDocument") || "error.html";

function createStaticWebSiteS3Bucket(): aws.s3.Bucket {
    // Create an S3 bucket and configure it as a website.
    const bucket = new aws.s3.Bucket("dfk-demo-frontend", {
        acl: "public-read",
        website: {
            indexDocument: indexDocument,
            errorDocument: errorDocument,
        },
    });

    // Use a synced folder to manage the files of the website.
    const bucketFolder = new synced_folder.S3BucketFolder("bucket-folder", {
        path: path,
        bucketName: bucket.bucket,
        acl: "public-read",
    });

    return bucket;

}

const bucket: aws.s3.Bucket = createStaticWebSiteS3Bucket();

export function createStaticWebsite(): aws.cloudfront.Distribution {

    // TODO get URL into static site automatically
    // Or maybe Route53 https://www.pulumi.com/templates/static-website/aws/#using-your-own-web-content

    // Create a CloudFront CDN to distribute and cache the website.
    return new aws.cloudfront.Distribution("cdn", {
        enabled: true,
        origins: [{
            originId: bucket.arn,
            domainName: bucket.websiteEndpoint,
            customOriginConfig: {
                originProtocolPolicy: "http-only",
                httpPort: 80,
                httpsPort: 443,
                originSslProtocols: ["TLSv1.2"],
            },
        }],
        defaultCacheBehavior: {
            targetOriginId: bucket.arn,
            viewerProtocolPolicy: "redirect-to-https",
            allowedMethods: [
                "GET",
                "HEAD",
                "OPTIONS",
            ],
            cachedMethods: [
                "GET",
                "HEAD",
                "OPTIONS",
            ],
            defaultTtl: 600,
            maxTtl: 600,
            minTtl: 600,
            forwardedValues: {
                queryString: true,
                cookies: {
                    forward: "all",
                },
            },
        },
        priceClass: "PriceClass_100",
        customErrorResponses: [{
            errorCode: 404,
            responseCode: 404,
            responsePagePath: `/${errorDocument}`,
        }],
        restrictions: {
            geoRestriction: {
                restrictionType: "none",
            },
        },
        viewerCertificate: {
            cloudfrontDefaultCertificate: true,
        },
    });

}


// Export the URLs and hostnames of the bucket and distribution.
export const originURL = pulumi.interpolate`http://${bucket.websiteEndpoint}`;
export const originHostname = bucket.websiteEndpoint;



