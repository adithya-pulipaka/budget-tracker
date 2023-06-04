import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Category } from "./Category";
import { PlanInfo } from "./PlanInfo";
import * as orm from "typeorm";

@Entity()
export class Plan {
  @PrimaryGeneratedColumn({ name: "plan_id" })
  planId: number;

  @Column({ name: "period", type: "date" })
  period: Date;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @OneToMany(() => PlanInfo, (planInfo) => planInfo.plan, {
    cascade: true,
  })
  planInfo: orm.Relation<PlanInfo>[];

  @OneToMany(() => PlanInfo, (transaction) => transaction.plan)
  transaction: orm.Relation<Transaction>[];
}
