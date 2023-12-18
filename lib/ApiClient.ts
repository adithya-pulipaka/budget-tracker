import axios, { AxiosResponse } from "axios";

const BASE_URL = process.env.BASE_URL || `http://localhost:3000/api`;

export async function getAllPlans() {
  try {
    const response: AxiosResponse<ApiResponse> = await axios.get(
      `${BASE_URL}/plans`
    );
    return response.data.payload;
  } catch (err) {
    console.log(err);
  }
}

export async function addBudgetPlan(plan) {
  try {
    const response: AxiosResponse<ApiResponse> = await axios.post(
      `${BASE_URL}/plans/create`,
      plan
    );
    return response.data.payload;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function getTransactionsforPeriod(planId) {
  try {
    const response: AxiosResponse<ApiResponse> = await axios.get(
      `${BASE_URL}/transactions?planId=${planId}`
    );
    return response.data.payload;
  } catch (err) {
    console.log(err);
  }
}

export async function addPlanTransaction(transaction) {
  console.log(transaction);
  try {
    const response: AxiosResponse<ApiResponse> = await axios.post(
      `${BASE_URL}/transactions/create`,
      transaction
    );
    return response.data.payload;
  } catch (err) {
    console.log(err);
  }
}

export async function getPlanById(id) {
  try {
    const response: AxiosResponse<ApiResponse> = await axios.get(
      `${BASE_URL}/plans?planId=${id}`
    );
    const payload = response.data.payload;
    return payload;
  } catch (err) {
    console.log(err);
  }
}

export async function getCategoriesByPlan(planId) {
  try {
    const response: AxiosResponse<ApiResponse> = await axios.get(
      `${BASE_URL}/categories?planId=${planId}`
    );
    return response.data.payload;
  } catch (err) {
    console.log(err);
  }
}
