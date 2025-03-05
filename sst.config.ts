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
    const lambdaFunction = new sst.aws.Function("my-function",{
      handler: "src/lambda.handler",
      url: true
    })
    return lambdaFunction
  },
});
