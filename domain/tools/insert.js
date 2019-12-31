//qconst AWS = require('aws-sdk');
const middy = require('middy')
const { jsonBodyParser, validator, httpErrorHandler } = require('middy/middlewares')
//const bluebird = require('bluebird');
//AWS.config.setPromisesDependency(bluebird);

const Repository = require('../../infra/repository-factory')

const toolsRepository = new Repository(process.env.TOOL_TABLE)

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

const insert = (event, context, callback) => {

    const { title, link, description, tags } = event.body

    toolsRepository.saveItem({ title, link, description, tags })
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
    .use(jsonBodyParser())
    .use(validator({ inputSchema }))
    .use(httpErrorHandler())

module.exports = { insertHandler }