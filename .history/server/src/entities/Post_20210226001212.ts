import { PrimaryKey } from "@mikro-orm/core";

@Entity()
export class Book extends BaseEntity {

	@PrimaryKey()
  id!: number;


  @Property()
  createdAt: new Date();

  


  @Property()
  title!: string;

}