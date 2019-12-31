const dynamoDB = require('../dynamodb');
const uuid = require('uuid');

const filterTypes = ["contains"] //for this version the only filter option will be contains
const filterValueType = ["array"] //for this version the only filter option will be array

const mountDynamoDBFilters = (filters) => {
  const dynamoDBFilter = {
    FilterExpression: null,
    ExpressionAttributeNames: null,
    ExpressionAttributeValues: null
  }
  filters.forEach((filter, index) => { //could be a reduce
    if (filter.filterType === "contains" && filter.valueType === "array") {
      if (!dynamoDBFilter.FilterExpression) {
        dynamoDBFilter.FilterExpression = ""
      }
      dynamoDBFilter.FilterExpression += `contains(#${filter.field}, :v)`

      if (!dynamoDBFilter.ExpressionAttributeNames) {
        dynamoDBFilter.ExpressionAttributeNames = {}
      }
      dynamoDBFilter.ExpressionAttributeNames[`#${filter.field}`] = `${filter.field}`

      if (!dynamoDBFilter.ExpressionAttributeValues) {
        dynamoDBFilter.ExpressionAttributeValues = {}
      }
      dynamoDBFilter.ExpressionAttributeValues[`:v`] = filter.value
    }
  });

  return dynamoDBFilter

}
class Repository {
  constructor(tableName) {
    this.dynamoDB = dynamoDB;
    this.tableName = tableName
  }

  saveItem(entity) {
    const id = uuid.v4()
    const item = { id, ...entity }
    return this.dynamoDB.put({
      TableName: this.tableName,
      Item: item
    }).promise()
      .then(res => item)
  }

  removeItem(id) {
    return this.dynamoDB.delete({
      TableName: process.env.TOOL_TABLE,
      Key: {
        id
      }
    }).promise()
  }

  findAll(filters) {
    const dynamoDBFilters = mountDynamoDBFilters(filters)

    return this.dynamoDB.scan({
      TableName: process.env.TOOL_TABLE,
      ...dynamoDBFilters,
    }).promise()
      .then((data) => { return data.Items });
  }
}

module.exports = Repository;