# Project Title

This is the MVP of a very useful tools to remind API

### Prerequisites

In order to be able to deploy this API you will need install:

NPM

```
https://nodejs.org/en/download/
```

SERVERLESS FRAMEWORK

```
https://serverless.com/framework/docs/getting-started/
```
or

```
simply run npm install serverless -g
```

AWS CLI

```
https://docs.aws.amazon.com/pt_br/cli/latest/userguide/install-cliv2-linux.html
```

AWS ACCOUNT

```
https://aws.amazon.com/pt/resources/create-account/
```



### Installing

With all the prerequisites installed you must follow the steps below

1 - Configurate a user in AWS

```
> Go to -> https://console.aws.amazon.com/iam
> Click in "Users" at the left side menu
> Click in Add User
> Inform a User name
> Check the Programmatic access option
> Click Next
> Select Attach existing policies directly
> Check the AdministratorAccess
> Click Next, Next and Create User
```

1 - Configurate a user in AWS

```
> Go to -> https://console.aws.amazon.com/iam
> Click in "Users" at the left side menu
> Click in Add User
> Inform a User name
> Check the Programmatic access option
> Click Next
> Select Attach existing policies directly
> Check the AdministratorAccess
> Click Next, Next and Create User
```

2 - Configurate aws user credentials for on the serverless framework

```
serverless config credentials -o --provider aws --key <Your Access key ID> --secret <Your Secret access key>
```

3 - Install the javascript lambda dependencies

```
In the root directory run: npm install
```

## Deployment

In the root directory run: serverless deploy

## Built With

* [Serverless](https://serverless.com/framework/docs/) - Framework to create serverless applications regardless of the adopted infrastructure(AWS, GOOGLE, AZURE, etc)
* [Middy](https://github.com/middyjs) - Useful lib to apply middlewares for AWS lambdas
* [AWS DynamoDb](https://aws.amazon.com/dynamodb/) - NoSQL database from AWS
* [AWS API Gateway](https://aws.amazon.com/api-gateway/) - Api manager from AWS
* [AWS Lambda](https://aws.amazon.com/pt/lambda/) - Functions that run directly in the AWS, being able to be optimized, scalable and low cost

## Authors

* **William Deschamps** - *Initial work* - [VUTTR](https://github.com/willfdeschamps/vuttrAPI)

