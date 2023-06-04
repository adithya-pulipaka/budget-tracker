type Category = {
  catId: number;
  name: string;
  amount: number;
};

type PlanPeriod = {
  month: number;
  year: number;
};

type Plan = {
  planId: number;
  period: PlanPeriod;
};

type Transaction = {
  tranId: number;
  tranDate: Date;
  description: string;
  amount: number;
  category: Category;
};

//API types

type PlanRequest = {
  period: PlanPeriod;
  categories: Array<Category>;
};

type TransactionRequest = {
  tranId: number;
  tranDate: Date;
  description: string;
  catId: number;
  planId: number;
  amount: number;
  category: any;
};

type ApiResponse = {
  payload: any;
  error: any;
};
