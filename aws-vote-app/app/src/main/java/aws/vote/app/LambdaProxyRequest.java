package aws.vote.app;

import com.amazonaws.services.lambda.runtime.Context;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LambdaProxyRequest { // https://github.com/ekim197711/aws-lambda-java/blob/main/src/main/java/com/example/lambdaandtesting/lambda/LambdaProxyRequest.java
    private String resource;
    private String path;
    private String httpMethod;
    private Map<String, String> headers;
    private Map<String, String> queryStringParameters;
    private Map<String, String> pathParameters;
    private Map<String, String> stageVariables;
    private Context context;
    private String body;
    private Boolean isBase64Encoded;
}