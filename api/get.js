import { dynamoDbLib, success, failure } from "./libs/index";

export const main = async (event, context, callback) => {
  const params = {
    TableName: "notes",
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: event.pathParameters.id
    }
  };

  try {
    const result = await dynamoDbLib.call("get", params);
    if (result.Item) return callback(null, success(result.Item));
    callback(null, failure({ status: false, error: "Item not found." }));
  } catch (error) {
    callback(null, failure({ status: false, error }));
  }
};
