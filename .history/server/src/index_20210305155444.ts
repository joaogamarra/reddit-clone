import 'reflect-metadata'
import { __prod__ } from './constants'
import express from 'express'
import { createConnection } from 'typeorm'
import { Post } from './entities/Post'
import { User } from './entities/User'

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

	app.listen(4000, () => {
		console.log('server started on localhost:4000')
	})
}

main().catch((err) => {
	console.error(err)
})
