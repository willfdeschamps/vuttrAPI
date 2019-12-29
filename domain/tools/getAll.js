const AWS = require('aws-sdk');
const bluebird = require('bluebird');

//AWS.config.setPromisesDependency(bluebird);

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.getAll = (event, context, callback) => {
  var params = {
    TableName: process.env.TOOL_TABLE
  };

  const responseHandler = (err, data) => {

    if (err) {
      callback(null, {
        statusCode: 504,
        body: err
      });
    } else {
      callback(null, {
        statusCode: 201,
        body: JSON.stringify({
          tools: data.Items
        })
      });
    }

  };

  dynamoDb.scan(params, responseHandler);
};
