package aws.vote.app;

import com.amazonaws.lambda.thirdparty.com.google.gson.Gson;
import com.amazonaws.lambda.thirdparty.com.google.gson.GsonBuilder;
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
    @Value
    public class MyDataModel {
        final private String what;
        final private String ever;
    }
}
