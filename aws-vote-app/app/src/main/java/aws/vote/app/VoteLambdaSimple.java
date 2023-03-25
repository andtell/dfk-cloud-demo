package aws.vote.app;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import com.amazonaws.services.lambda.runtime.RequestHandler;

// Handler value: example.HandlerString
public class VoteLambdaSimple implements RequestHandler<Object, String>{

    @Override
    /*
     * Takes a String as input, and converts all characters to lowercase.
     */
    public String handleRequest(Object event, Context context) { // https://stackoverflow.com/questions/37155595/aws-can-not-deserialize-instance-of-java-lang-string-out-of-start-object
        LambdaLogger logger = context.getLogger();
        logger.log("EVENT TYPE: " + event.getClass().toString());
        return "blah blah";
    }
}
