package aws.vote.app;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashMap;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LambdaProxyResponse { // see https://github.com/ekim197711/aws-lambda-java/blob/main/src/main/java/com/example/lambdaandtesting/lambda/LambdaProxyResponse.java
    private Boolean isBase64Encoded;
    private Integer statusCode;
    private HashMap<String, Object> headers;
    private HashMap<String, Object> multiValueHeaders;
    private String body;
//    {
//        "isBase64Encoded": true|false,
//            "statusCode": httpStatusCode,
//            "headers": { "headerName": "headerValue", ... },
//        "multiValueHeaders": { "headerName": ["headerValue", "headerValue2", ...], ... },
//        "body": "..."
//    }
}
