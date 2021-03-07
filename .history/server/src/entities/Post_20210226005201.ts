import { title } from "process";
import { Entity } from "typeorm";


@Entity()

export class Post{

	@PrimaryKey()
  	id!: number;

  	@Property()
  	createdAt: new Date();

	@Property({onUpdate: () => new Date() })
  	updatedAt: new Date();

  	@Property()
  	title!: string;

}