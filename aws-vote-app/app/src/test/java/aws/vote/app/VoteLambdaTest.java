/*
 * This Java source file was generated by the Gradle 'init' task.
 */
package aws.vote.app;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

import com.amazonaws.services.lambda.runtime.Context;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.HashMap;

class VoteLambdaTest {

    private static final Logger logger = LoggerFactory.getLogger(VoteLambdaTest.class);

    @Test
    void testHandler() {
        logger.info("Invoke TEST - Handler");
        //var event = new HashMap<String,String>();
        Context context = new AwsLambdaTestSupport.TestContext();
        VoteLambda handler = new VoteLambda();
        assertEquals(handler.handleRequest("hello", context), "hello");
    }
}
