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
import Redis from 'ioredis'
import session from 'express-session'
import connectRedis from 'connect-redis'
import cors from 'cors'
import path from 'path'

const main = async () => {
	const conn = await createConnection({
		type: 'postgres',
		database: 'lireddit2',
		username: 'postgres',
		password: 'postgres',
		logging: true,
		synchronize: true,
		migrations: [path.join(__dirname, './migrations/*')],
		entities: [Post, User],
	})

	await conn.runMigrations()

	await Post.delete({})

	const app = express()

	const RedisStore = connectRedis(session)
	const redis = new Redis()

	app.use(
		cors({
			origin: 'http://localhost:3000',
			credentials: true,
		})
	)

	app.use(
		session({
			name: 'qid',
			store: new RedisStore({ client: redis, disableTouch: true }),

			cookie: {
				maxAge: 1000 * 60 * 24 * 365 * 10, //10 years
				httpOnly: true,
				sameSite: 'lax',
				secure: __prod__,
			},
			saveUninitialized: false,
			secret: 'asfsdgshrwhwrhhrw',
			resave: false,
		})
	)

	const apolloServer = new ApolloServer({
		schema: await buildSchema({
			resolvers: [HelloResolver, PostResolver, UserResolver],
			validate: false,
		}),
		context: ({ req, res }) => ({ req, res, redis }),
	})

	apolloServer.applyMiddleware({
		app,
		cors: false,
	})

	app.listen(4000, () => {
		console.log('server started on localhost:4000')
	})
}

main().catch((err) => {
	console.error(err)
})