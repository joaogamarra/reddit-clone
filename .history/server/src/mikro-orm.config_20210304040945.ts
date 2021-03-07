import { __prod__ } from './constants'
import { Post } from './entities/Post'

export default {
	entities: [Post],
	dbName: 'lireddit',
	type: 'postgresql',
	debug: !__prod__,
} as const
