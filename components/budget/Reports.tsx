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
import { getReportDataByCategory, getReportDataByMonth } from "@/lib/ApiClient";
import { MONTHS } from "@/utils/constants";

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

const Reports = () => {
  const catDialogRef = useRef(null);
  const [catRefData, setCatRefData] = useState(null);
  const monthDialogRef = useRef(null);
  const [barRefData, setBarRefData] = useState(null);

  const viewCategoryReport = async () => {
    catDialogRef.current.showModal();
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

  const viewMonthlyReport = async () => {
    monthDialogRef.current.showModal();
    const response = await getReportDataByMonth();
    response.reverse();
    const labels = response.map((a) => `${MONTHS[a.month]} ${a.year}`);
    const data = response.map((a) => a.amount);
    const chartData = {
      labels,
      datasets: [
        {
          label: "Usage ($)",
          data: data,
          backgroundColor: colors[0],
          borderColor: colors[0],
          borderWidth: 1,
        },
      ],
    };
    setBarRefData(chartData);
  };

  return (
    <div className="mt-4 w-full md:max-w-5xl mx-auto">
      <div className="text-2xl">Reports</div>
      <div className="mt-4 flex gap-8 justify-center flex-wrap">
        <div className="h-[300px] w-[300px] flex flex-col">
          <p className="font-bold text-lg">Transactions by Category</p>
          <div>
            <Image
              alt="DoughnutChart"
              src={pieChart}
              placeholder="blur"
              quality={100}
              sizes="100vw"
              objectFit="contain"
            />
          </div>
          <button className="btn btn-sm" onClick={viewCategoryReport}>
            View Chart
          </button>
          <dialog id="catModal" className="modal" ref={catDialogRef}>
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
          <div>
            <Image
              alt="BarChart"
              src={barChart}
              placeholder="blur"
              quality={100}
              sizes="100vw"
              objectFit="contain"
            />
          </div>
          <button className="btn btn-sm" onClick={viewMonthlyReport}>
            View Chart
          </button>
          <dialog id="barModal" className="modal" ref={monthDialogRef}>
            <div className="modal-box flex flex-col justify-center items-center">
              <h3 className="font-bold text-lg">Spending Usage</h3>
              {barRefData && (
                <Bar data={barRefData} id="barRef" redraw={true}></Bar>
              )}
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
