const AWS = require('aws-sdk');
const middy = require('middy')
const { jsonBodyParser, validator, httpErrorHandler } = require('middy/middlewares')
const bluebird = require('bluebird');
const uuid = require('uuid');


AWS.config.setPromisesDependency(bluebird);

const dynamoDb = new AWS.DynamoDB.DocumentClient();

const inputSchema = {
    required: ["body"],
    properties: {
        body: {
                properties: {
                title: { type: 'string', minLength: 3, maxLength: 35 },
                link: { type: 'string', minLength: 3, maxLength: 200 },
                description: { type: 'string', minLength: 3, maxLength: 100 },
                tags: { type: 'array' },
            },
            required: ['title', 'link'] // Insert here all required event properties
        }
    }
}

const submitTool = tool => {
    const toolInfo = {
        TableName: process.env.TOOL_TABLE,
        Item: {...tool},
    };
    return dynamoDb.put(toolInfo).promise()
        .then(res => tool);
};

const insert = (event, context, callback) => {
    const id = uuid.v4()
    const { title, link, description, tags } = event.body
  
    submitTool({ id, title, link, description, tags })
        .then(res => {
            callback(null, {
                statusCode: 201,
                body: JSON.stringify({
                    message: `Sucessfully inserted tool ${title}`,
                    id: res.id
                })
            });
        })
        .catch(err => {
            console.log(err);
            callback(null, {
                statusCode: 500,
                body: JSON.stringify({
                    message: `Unable to insert tool ${err}`
                })
            })
        })

};

const insertHandler = middy(insert)
    .use(jsonBodyParser()) // parses the request body when it's a JSON and converts it to an object
    .use(validator({ inputSchema })) // validates the input
    .use(httpErrorHandler()) // handles common http errors and returns proper responses

module.exports = { insertHandler }