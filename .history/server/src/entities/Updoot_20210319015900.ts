import { ObjectType, Field } from 'type-graphql'
import { Entity, Column, BaseEntity, ManyToOne } from 'typeorm'
import { Post } from './Post'
import { User } from './User'

@ObjectType()
@Entity()
export class Updoot extends BaseEntity {
	@Field()
	@Column({ type: 'int' })
	value: number

	@Field()
	@Column()
	userId: number

	@Field(() => User)
	@ManyToOne(() => User, (user) => user.updoots)
	user: User

	@Field()
	@Column()
	postId: number

	@Field(() => Post)
	@ManyToOne(() => Post, (post) => post.updoots)
	post: Post
}
