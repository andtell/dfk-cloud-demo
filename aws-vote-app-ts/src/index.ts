import { Context, APIGatewayProxyResult, APIGatewayEvent } from 'aws-lambda';
import { Vote } from './model';
import { putVote } from './repository';

export const handler = async (event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> => {
    
    console.log("request: " + JSON.stringify(event));

    let returnValue = "Stored vote for verification." 


    // Special handling due to 
    let body;
    if (event.body) {
        console.log("Event "); 
        console.log(JSON.stringify(event)); 
        if (event.isBase64Encoded) { 
            body = JSON.parse(Buffer.from(event.body, 'base64').toString('utf8')); 
        } else { 
            body = JSON.parse(event.body); 
        } 
        console.log(`Body is : ${JSON.stringify(body)}`);
    }

    if (body.cloud) {
        try {
            //const eventBody = Buffer.from(event.body, 'base64').toString('utf-8');
            //console.log(`Event body string : ${event.body}`);
            
            //if(eventBody) {
                //const vote: Vote = JSON.parse(body);
                console.log(`Got vote : ${body.cloud}`);
                const response = await putVote(body.cloud);
                console.log(`Got db response  : ${response}`);
            //}
            
        } catch (e) {
            console.log("Bonk: ", e);
            returnValue = `Something went wrong: ${e}`
        }
    }

    
    

    // https://www.youtube.com/watch?v=MvUdqXI-s7g
    // https://docs.aws.amazon.com/sns/latest/dg/sns-send-custom-platform-specific-payloads-mobile-devices.html
//https://github.com/Sean-Bradley/AWS-SNS-SMS-with-NodeJS/blob/master/package.json  
    return {
        statusCode: 200,
        body: JSON.stringify({
            response: returnValue,
        }),
    };
};

