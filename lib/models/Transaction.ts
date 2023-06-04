import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Category } from "./Category";
import { PlanInfo } from "./PlanInfo";
import * as orm from "typeorm";
import { Plan } from "./Plan";

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn({ name: "tran_id" })
  tranId: number;

  @Column({ name: "tran_date", type: "date" })
  tranDate: Date;

  @Column({ name: "description" })
  description: string;

  @OneToOne(() => Category, (category) => category.transaction)
  @JoinColumn({ name: "cat_id", referencedColumnName: "catId" })
  category: orm.Relation<Category>;

  @Column({ name: "amount", type: "decimal", precision: 19, scale: 4 })
  amount: number;

  @orm.ManyToOne(() => Plan, (plan) => plan.transaction)
  @JoinColumn({ name: "plan_id", referencedColumnName: "planId" })
  plan: orm.Relation<Plan>;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
