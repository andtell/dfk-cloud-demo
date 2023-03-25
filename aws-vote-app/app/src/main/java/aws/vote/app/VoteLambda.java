package aws.vote.app;

import com.amazonaws.lambda.thirdparty.com.google.gson.Gson;
import com.amazonaws.lambda.thirdparty.com.google.gson.GsonBuilder;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClient;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import com.amazonaws.services.dynamodbv2.model.PutItemRequest;
import com.amazonaws.services.dynamodbv2.model.ResourceNotFoundException;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import lombok.Builder;
import lombok.Data;
import lombok.Value;

import java.util.HashMap;
import java.util.Map;

public class VoteLambda implements RequestHandler<LambdaProxyRequest, LambdaProxyResponse> {
    Gson gson = new GsonBuilder().setPrettyPrinting().create();

    //static AmazonDynamoDB client = DynamoDBClient.builder().standard().build();
    // final AmazonDynamoDB ddb = new AmazonDynamoDBClient().withRegion("eu-north-1");

    @Override
    public LambdaProxyResponse handleRequest(LambdaProxyRequest event, Context context) {
        LambdaLogger logger = context.getLogger();
        logger.log("**** My lambda BEGIN");
        // log execution details
//        logger.log("ENVIRONMENT VARIABLES: " + gson.toJson(System.getenv()));
        logger.log("CONTEXT: " + gson.toJson(context));
        // process event
        logger.log("EVENT: " + gson.toJson(event));
        logger.log("EVENT TYPE: " + event.getClass().toString());
        MyDataModel myDataModel = new MyDataModel("what", "ever");
        HashMap<String, Object> myheadermap = new HashMap<>();
        myheadermap.put("GreetingFromAWS", "a header");
        logger.log("My lambda END");
        return LambdaProxyResponse.builder()
                .statusCode(200)
                .isBase64Encoded(false)
                .multiValueHeaders(new HashMap<>())
                .headers(myheadermap)
                .body(gson.toJson(myDataModel))
                .build();

    }

    // Giving up on the Java SDK - no up 2 date documentation
    // https://stackoverflow.com/questions/30773525/difference-between-amazondynamodbclient-and-dynamodb-classes-in-their-java-sdk
    // https://docs.aws.amazon.com/sdk-for-java/latest/developer-guide/java_dynamodb_code_examples.html

//    public static void putItemInTable(AmazonDynamoDBClient ddb,
//                                      String tableName,
//                                      String key,
//                                      String keyVal,
//                                      String albumTitle,
//                                      String albumTitleValue,
//                                      String awards,
//                                      String awardVal,
//                                      String songTitle,
//                                      String songTitleVal){
//
//        HashMap<String, AttributeValue> itemValues = new HashMap<>();
//        itemValues.put(key, AttributeValue.builder().s(keyVal).build());
//        itemValues.put(songTitle, AttributeValue.builder().s(songTitleVal).build());
//        itemValues.put(albumTitle, AttributeValue.builder().s(albumTitleValue).build());
//        itemValues.put(awards, AttributeValue.builder().s(awardVal).build());
//
//        PutItemRequest request = PutItemRequest.builder()
//                .tableName(tableName)
//                .item(itemValues)
//                .build();
//
//        try {
//            PutItemResponse response = ddb.putItem(request);
//            System.out.println(tableName +" was successfully updated. The request id is "+response.responseMetadata().requestId());
//
//        } catch (ResourceNotFoundException e) {
//            System.err.format("Error: The Amazon DynamoDB table \"%s\" can't be found.\n", tableName);
//            System.err.println("Be sure that it exists and that you've typed its name correctly!");
//            System.exit(1);
//        } catch (DynamoDbException e) {
//            System.err.println(e.getMessage());
//            System.exit(1);
//        }
//    }



    //    DynamoDbClient client = DynamoDbClient.builder()
//            .endpointOverride(URI.create("http://localhost:8000"))
//            // The region is meaningless for local DynamoDb but required for client builder validation
//            .region(Region.US_EAST_1)
//            .credentialsProvider(StaticCredentialsProvider.create(
//                    AwsBasicCredentials.create("dummy-key", "dummy-secret")))
//            .build();
    @Value
    public class MyDataModel {
        final private String what;
        final private String ever;
    }
}
