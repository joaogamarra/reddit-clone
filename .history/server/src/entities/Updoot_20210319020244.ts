import { ObjectType } from 'type-graphql'
import { Entity, Column, BaseEntity, ManyToOne } from 'typeorm'
import { Post } from './Post'
import { User } from './User'

@ObjectType()
@Entity()
export class Updoot extends BaseEntity {
	@Column({ type: 'int' })
	value: number

	@Column()
	userId: number

	@ManyToOne(() => User)
	user: User

	@Column()
	postId: number

	@ManyToOne(() => Post)
	post: Post
}
