const AWS = require('aws-sdk');
//const bluebird = require('bluebird');

//AWS.config.setPromisesDependency(bluebird);

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.remove = (event, context, callback) => {
  const id = event.pathParameters.id
  var params = {
    TableName: process.env.TOOL_TABLE,
    Key : {
      id
    }
  };

  const responseHandler = (err, data) => {
    console.log(err,data)
    if (err) {
      callback(null, {
        statusCode: 400,
        body: err
      });
    } else {
      callback(null, {
        statusCode: 200
      });
    }

  };

  dynamoDb.delete(params, responseHandler);
};
