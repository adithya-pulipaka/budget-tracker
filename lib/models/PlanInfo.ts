import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Category } from "./Category";
import { Plan } from "./Plan";
import * as orm from "typeorm";

@Entity()
export class PlanInfo {
  @Column({ name: "plan_info_id", generated: "increment" })
  planInfoId: number;

  @PrimaryColumn({ name: "plan_id", type: "int" })
  @ManyToOne(() => Plan, (plan) => plan.planInfo)
  @JoinColumn({ name: "plan_id", referencedColumnName: "planId" })
  plan: orm.Relation<Plan>;

  @PrimaryColumn({ name: "cat_id", type: "int" })
  @ManyToOne(() => Category, (cat) => cat.catId, { cascade: true })
  @JoinColumn({ name: "cat_id", referencedColumnName: "catId" })
  category: orm.Relation<Category>;

  @Column({ name: "amount", type: "decimal", precision: 19, scale: 4 })
  amount: number;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
