const Repository = require('../../infra/repository-factory')
const toolsRepository = new Repository(process.env.TOOL_TABLE)

const readQueryParams = (queryStringParameters) => {
  const tag = queryStringParameters && queryStringParameters.tag;
  const filters = !tag ? [] : [
    {
      filterType: "contains",
      valueType: "array",
      value: tag,
      field: "tags"
    }
  ]

  return filters
}
module.exports.getAll = (event, context, callback) => {
  const filters = readQueryParams(event.queryStringParameters || [])
  toolsRepository.findAll(filters)
    .then(items => {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(items)
      });
    })
    .catch(err => {
      callback(null, {
        statusCode: 400,
        body: err
      })
    })
};
