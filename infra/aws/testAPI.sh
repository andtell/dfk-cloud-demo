#!/bin/bash

API_URL=$(pulumi stack output url)

echo "URL is $API_URL"

http post "${API_URL}"vote cloud=aws

# curl -v -X POST \
#   "${API_URL}"vote \
#   -H 'content-type: application/json' \
#   -d '{ "cloud": "aws" }'
