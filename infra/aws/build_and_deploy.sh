#!/bin/bash

cd ../../aws-vote-app-ts/
npm run-script prodbuild

cd ../infra/aws

pulumi up -y

./testAPI.sh