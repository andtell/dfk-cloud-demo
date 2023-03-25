package aws.vote.app;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.lambda.runtime.events.DynamodbEvent;

public class DynamoEventHandlerLambda {
    // use?
}
//public class DynamoEventHandlerLambda implements RequestHandler<DynamodbEvent, String> {
//
//    public String handleRequest(DynamodbEvent ddbEvent, Context context) {
//        for (DynamodbEvent.DynamodbStreamRecord record : ddbEvent.getRecords()){
//            System.out.println(record.getEventID());
//            System.out.println(record.getEventName());
//            System.out.println(record.getDynamodb().toString());
//
//        }
//        return "Successfully processed " + ddbEvent.getRecords().size() + " records.";
//    }
//}


