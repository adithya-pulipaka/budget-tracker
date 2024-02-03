import React, { useRef, useState } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { Doughnut, Bar } from "react-chartjs-2";
import Image from "next/image";
import pieChart from "@/public/assets/PieChart.png";
import barChart from "@/public/assets/BarChart.png";
import { getColorList } from "@/utils/color-fns";
import { getReportDataByCategory } from "@/lib/ApiClient";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);
// 1. pie chart by Category
// 2. bar chart for current vs prev month
// 3. bar chart for income vs spending - Cashflow
const colors = getColorList(6);

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const dataBar = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: labels.map(() => Math.random() * 100),
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Dataset 2",
      data: labels.map(() => Math.random() * 100),
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};
const test = () => {
  console.log("first");
};

const Reports = () => {
  const catRef = useRef(null);
  const [catRefData, setCatRefData] = useState(null);
  const barRef = useRef(null);
  const chartRef = useRef(null);

  const viewCategoryReport = async () => {
    catRef.current.showModal();
    const data = await getReportDataByCategory();
    const chartData = {
      labels: data.map((a) => a.name),
      datasets: [
        {
          label: "Amount ($)",
          data: data.map((a) => a.total),
          backgroundColor: colors,
          borderColor: colors,
          borderWidth: 1,
        },
      ],
    };
    setCatRefData(chartData);
  };

  return (
    <div className="mt-4 w-full md:max-w-5xl mx-auto">
      <div className="text-2xl">Reports</div>
      <div className="mt-4 flex gap-8 justify-center flex-wrap">
        <div className="h-[300px] w-[300px] flex flex-col">
          <p className="font-bold text-lg">Transactions by Category</p>
          <Image
            alt="DoughnutChart"
            src={pieChart}
            placeholder="blur"
            quality={100}
            sizes="100vw"
            objectFit="contain"
          />
          <button className="btn btn-sm" onClick={viewCategoryReport}>
            View Chart
          </button>
          <dialog id="catModal" className="modal" ref={catRef}>
            <div className="modal-box flex flex-col justify-center items-center">
              <h3 className="font-bold text-lg">Transactions by Category</h3>
              {catRefData && (
                <Doughnut
                  data={catRefData}
                  id="catRef"
                  redraw={true}
                ></Doughnut>
              )}
            </div>
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>
        </div>
        <div className="h-[300px] w-[300px] flex flex-col justify-between">
          <p className="font-bold text-lg">Spending Usage</p>
          <Image
            alt="BarChart"
            src={barChart}
            placeholder="blur"
            quality={100}
            sizes="100vw"
            objectFit="contain"
          />
          <button
            className="btn btn-sm"
            onClick={() => barRef.current.showModal()}
          >
            View Chart
          </button>
          <dialog id="barModal" className="modal" ref={barRef}>
            <div className="modal-box flex flex-col justify-center items-center">
              <h3 className="font-bold text-lg">Spending Usage</h3>
              <Bar data={dataBar} id="barRef" redraw={true}></Bar>
            </div>
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>
        </div>
      </div>
    </div>
  );
};

export default Reports;
