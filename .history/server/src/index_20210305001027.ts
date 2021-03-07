import { __prod__ } from './constants'
import { createConnection } from 'typeorm'
import { Post } from './entities/Post'

const main = async () => {
	const conn = await createConnection({
		type: 'postgres',
		database: 'lireddit2',
		username: 'postgres',
		password: 'postgres',
		logging: true,
		synchronize: true,
		entities: [],
	})
	// const post = orm.em.create(Post, { title: "my first post" });
	// await orm.em.persistAndFlush(post);

	// const posts = await orm.em.find(Post, {});
	// console.log(posts);
}

main().catch((err) => {
	console.error(err)
})
