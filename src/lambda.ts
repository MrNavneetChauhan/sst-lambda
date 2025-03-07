export const handler = async(event:{rawPath:string,queryStringParameters:string,requestContext:{http:{method:string}},body:string,[key:string]:unknown})=>{
    // console.info("event",event)
    const rawPath = event.rawPath;
    const method = event.requestContext.http.method;
    const queries = event.queryStringParameters || {};
    const body = event?.body ? JSON.parse(event.body) : {};
        // console.info("bdoy",body)
    let output:string|object = "filtered";
    if(rawPath === "/tableQueries"){
        const {tableQueries} =  await import("./functions/tableQueries.js");
        output = await tableQueries(body,queries,method)
    }
    return output
}