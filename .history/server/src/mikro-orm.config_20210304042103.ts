import { Post } from './entities/Post'
import { __prod__ } from './constants'
import { MikroORM } from '@mikro-orm/core'

export default {
	migrations: {
		path: './migrations',
		pattern: /^[\w-]+\d+\.ts$/,
	},
	entities: [Post],
	dbName: 'lireddit',
	type: 'postgresql',
	debug: !__prod__,
} as Parameters<typeof MikroORM.init>[0]