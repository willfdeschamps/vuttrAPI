const Repository = require('../../infra/repository-factory')
const toolsRepository = new Repository(process.env.TOOL_TABLE)

module.exports.remove = (event, context, callback) => {
  const id = event.pathParameters.id

  toolsRepository.removeItem(id)
    .then(res => {
      callback(null, {
        statusCode: 200,
      });
    })
    .catch(err => {
      callback(null, {
        statusCode: 400,
        body: err
      })
    })
};
