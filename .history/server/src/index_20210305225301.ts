import 'reflect-metadata'
import { __prod__ } from './constants'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import { HelloResolver } from './resolvers/hello'
import { PostResolver } from './resolvers/post'
import { createConnection } from 'typeorm'
import { Post } from './entities/Post'

const main = async () => {
	await createConnection({
		type: 'postgres',
		database: 'lireddit2',
		username: 'postgres',
		password: 'postgres',
		synchronize: true,
		entities: [Post],
	})

	const app = express()

	const apolloServer = new ApolloServer({
		schema: await buildSchema({
			resolvers: [HelloResolver, PostResolver],
			validate: false,
		}),
		context: () => ({ em: 'test' }),
	})

	apolloServer.applyMiddleware({
		app,
	})

	app.listen(4000, () => {
		console.log('server started on localhost:4000')
	})
}

main().catch((err) => {
	console.error(err)
})
