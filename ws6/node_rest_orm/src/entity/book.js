import {
  Entity,
  PrimaryColumn,
  Column
} from "typeorm";


@Entity()
export class Book {

  @PrimaryColumn("varchar")
  isbn = "";

  @Column("varchar")
  title = "";

  @Column("varchar")    //Ska vara genre?
  genre = "";

  @Column("float")
  price = "";

}
