import {
	Entity,
	BaseEntity,
	Property,
	ManyToOne,
	IdentifiedReference,
	ManyToMany,
	Collection,
} from '@mikro-orm/core'

@Entity()
export class Book extends BaseEntity {
	@Property()
	title!: string

	@ManyToOne(() => Author)
	author!: Author

	@ManyToOne(() => Publisher, { wrappedReference: true, nullable: true })
	publisher?: IdentifiedReference<Publisher>

	@ManyToMany({ entity: 'BookTag', fixedOrder: true })
	tags = new Collection<BookTag>(this)
}
