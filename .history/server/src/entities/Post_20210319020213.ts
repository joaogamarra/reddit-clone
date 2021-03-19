import { ObjectType, Field } from 'type-graphql'
import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	BaseEntity,
	ManyToOne,
	,
} from 'typeorm'
import { User } from './User'

@ObjectType()
@Entity()
export class Post extends BaseEntity {
	@Field()
	@PrimaryGeneratedColumn()
	id!: number

	@Field(() => String)
	@CreateDateColumn()
	createdAt: Date

	@Field(() => String)
	@UpdateDateColumn()
	updatedAt: Date

	@Field()
	@Column()
	title!: string

	@Field()
	@Column()
	text!: string

	@Field()
	@Column({ type: 'int', default: 0 })
	points!: number

	@Field()
	@Column()
	creatorId: number

	@Field()
	@ManyToOne(() => User, (user) => user.posts)
	creator: User

	// @OneToMany(() => Updoot, (updoot) => updoot.post)
	// updoots: Updoot[]
}