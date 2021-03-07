import 'reflect-metadata'
import { __prod__ } from './constants'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import { HelloResolver } from './resolvers/hello'
import { PostResolver } from './resolvers/post'
import { createConnection } from 'typeorm'
import { Post } from './entities/Post'
import { User } from './entities/User'
import { UserResolver } from './resolvers/user'
import redis from 'redis'
import session from 'express-session'
import connectRedis from 'connect-redis'

const main = async () => {
	await createConnection({
		type: 'postgres',
		database: 'lireddit2',
		username: 'postgres',
		password: 'postgres',
		logging: true,
		synchronize: true,
		entities: [Post, User],
	})

	const app = express()

	const RedisStore = connectRedis(session)
	const redisClient = redis.createClient()

	app.use(
		session({
			name: 'qid',
			store: new RedisStore({ client: redisClient, disableTouch: true }),
			secret: 'asfsdgshrwhwrhhrw',
			resave: false,
		})
	)

	const apolloServer = new ApolloServer({
		schema: await buildSchema({
			resolvers: [HelloResolver, PostResolver, UserResolver],
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
