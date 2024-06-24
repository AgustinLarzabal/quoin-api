import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  uid: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;
}
