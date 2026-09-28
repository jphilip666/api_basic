import {
  CloudWatchLogsClient,
  CreateLogStreamCommand,
  PutLogEventsCommand,
} from "@aws-sdk/client-cloudwatch-logs";
import os from "node:os";

const cloudWatch = new CloudWatchLogsClient({
  region: "eu-west-2",
});

const logGroupName = "/test/api-basic";
const logStreamName = os.hostname();

export async function initialiseLogger() {
  try {
    await cloudWatch.send(
      new CreateLogStreamCommand({
        logGroupName,
        logStreamName,
      })
    );

    console.log(`CloudWatch log stream created: ${logStreamName}`);
  } catch (error: unknown) {
    // ResourceAlreadyExistsException means the stream already exists
    if (
      error instanceof Error &&
      error.name === "ResourceAlreadyExistsException"
    ) {
      console.log(`CloudWatch log stream already exists: ${logStreamName}`);
      return;
    }

    throw error;
  }
}

export async function sendLog(message: string) {
    console.log(message);    
    await cloudWatch.send(
        new PutLogEventsCommand({
            logGroupName,
            logStreamName,
            logEvents: [
                {
                    message,
                    timestamp: Date.now(),
                },
            ],
        })
    );
}