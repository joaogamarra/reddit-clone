import { ObjectType } from 'type-graphql'
import { Entity, Column, BaseEntity, ManyToOne, PrimaryColumn } from 'typeorm'
import { Post } from './Post'
import { User } from './User'

@ObjectType()
@Entity()
export class Updoot extends BaseEntity {
	@Column({ type: 'int' })
	value: number

	@PrimaryColumn()
	userId: number

	@ManyToOne(() => User)
	user: User

	@Column()
	postId: number

	@ManyToOne(() => Post)
	post: Post
}
