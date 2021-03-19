import { ObjectType, Field } from 'type-graphql'
import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	BaseEntity,
	ManyToOne,
} from 'typeorm'
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

	@Field()
	@ManyToOne(() => User, (user) => user.updoots)
	user: User

	@Field()
	@Column()
	postId: number

	@Field()
	@ManyToOne(() => Post, (post) => post.updoots)
	post: Post
}
