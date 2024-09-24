"use client";
import Breadcrumb from "@/component/Breadcrumbs/Breadcrumb";
import ChartOne from "@/component/Charts/ChartOne";
import ChartTwo from "@/component/Charts/ChartTwo";
import dynamic from "next/dynamic";
import React from "react";

const ChartThree = dynamic(() => import("@/component/Charts/ChartThree"), {
  ssr: false,
});

const Chart = () => {
  return (
    <>
      <Breadcrumb pageName="Chart" />

      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo />
        <ChartThree />
      </div>
    </>
  );
};

export default Chart;
