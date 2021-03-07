import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Entity } from 'typeorm/decorator/entity/Entity'

@Entity()
export class Post {
	@PrimaryGeneratedColumn()
	id!: number

	@CreateDateColumn()
	createdAt = Date

	@Field(() => String)
	@UpdateDateColumn()
	updatedAt = new Date()

	@Column()
	title!: string
}
