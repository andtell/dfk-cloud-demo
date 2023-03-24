import * as aws from "@pulumi/aws";

export function createVoteTable(): aws.dynamodb.Table {
    return new aws.dynamodb.Table("votes", {
        attributes: [
            {
                name: 'id',
                type: 'S' // string
            },
            {
                name: 'createdAt',
                type: 'N' // number
            }
            // https://stackoverflow.com/questions/50006885/terraform-dynamodb-all-attributes-must-be-indexed
            // ,
            // {
            //     name: 'cloud',
            //     type: 'S' // string
            // },
            // {
            //     name: 'type',
            //     type: 'S' // string
            // }
        ],
        hashKey: "id",
        rangeKey: "createdAt",
        billingMode: "PAY_PER_REQUEST",
    });
}
