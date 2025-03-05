/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "sst",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
      providers : {
        aws : {
          profile : "AdministratorAccess-374424161755",
          region: "eu-west-1"
        }
      }
    };
  },
  async run() {
    
    // Configuring dynamodb table //
    const table = new sst.aws.Dynamo("MyTable",{
      fields : {
        id: "string"
      },
      primaryIndex : {hashKey:"id"}
    })

    console.info("this is the testing")
    const lambdaFunction = new sst.aws.Function("my-function",{
      handler: "src/lambda.handler",
      url: true,
      link : [table]
    })

    return lambdaFunction
  },
});
