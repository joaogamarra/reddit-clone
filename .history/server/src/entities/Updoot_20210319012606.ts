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
import { User } from './User'

@ObjectType()
@Entity()
export class Updoot extends BaseEntity {
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
	@ManyToOne(() => Post, (post) => user.updoots)
	post: Post
}
