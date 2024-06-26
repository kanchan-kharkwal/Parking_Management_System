import React from "react";
import Analysis from "../components/dashboard/analysis";
import Customers from "./customers";

export default function Overview() {
  return (
    <div className="w-full">
      <Analysis />
      <h1 className="bg-white text-2xl text-primary my-4 mt-10 p-4">
        Recent Activity
      </h1>
      <Customers dashboard={true} />
    </div>
  );
}
