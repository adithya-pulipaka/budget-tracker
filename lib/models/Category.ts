import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Plan } from "./Plan";
import * as orm from "typeorm";
import { PlanInfo } from "./PlanInfo";
import { Transaction } from "./Transaction";

@Entity()
export class Category {
  @PrimaryGeneratedColumn({ name: "cat_id" })
  catId: number;

  @Column({ name: "name", length: 255 })
  name: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @OneToMany(() => PlanInfo, (planInfo) => planInfo.planInfoId)
  planInfo: orm.Relation<PlanInfo>[];

  @OneToOne(() => Transaction, (transaction) => transaction.category)
  transaction: orm.Relation<Transaction>;
}
