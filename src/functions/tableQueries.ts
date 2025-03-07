import { DynamoDBClient, GetItemInput } from "@aws-sdk/client-dynamodb";
import { Resource } from "sst";
import { PutCommand,GetCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient();
const TableName = Resource["MyTable"].name;
export async function tableQueries (pBody:object,qParams:{id?:string},method:string){
    const {id} = qParams;
    console.info("<====== Method =====>",method)

    if(method === "GET"){
        const param: GetItemInput = {
            Key: {id},
            TableName 
        }
        const res = await client.send(new GetCommand(param));
        return res?.Item || {}
    }
    else if(method === "PUT"){
        const param = {
            TableName,
            Item : pBody,
            ConditionExpression : "attribute_not_exists(id)",
        }

        const res = await client.send(new PutCommand(param));
        console.info("<=== Response ===>",res)

    }

    return "Filtered"
}