import React from "react";
import { PageContainer } from "../ui/PageContainer";
import { Card } from "../ui/Card";
import { MdAddBox } from "react-icons/md";
import { FaFilter } from "react-icons/fa";
import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";
import { IoFilter } from "react-icons/io5";

export const Wallet = () => {
  return (
    <PageContainer title="Wallet">
      <Card style="bg-secondary mt-7 relative">
        <span className="text-xs font-thin text-left underline underline-offset-0 text-white">
          Balance
        </span>
        <h1 className="text-4xl font-bold text-secondary_light">#62,240</h1>
        <MdAddBox className="absolute top-4 right-4 fill-secondary_light text-5xl" />
      </Card>

      <div className="mt-12">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold">Wallet History</p>
          <IoFilter className="fill-secondary w-6 h-6" />
        </div>
        <ul className="divide-y-2 divide-secondary_light">
          <li className="flex items-center justify-between my-3 font-bold">
            <span className="bg-green-200 rounded-md p-3">
              <FaArrowTrendUp className="fill-green-600" />
            </span>
            <p className="text-sm">Credit</p>
            <span className="text-xs">#2,000</span>
            <span className="text-xs">13th, June 2024</span>
          </li>
          <li className="flex items-center justify-between my-3 font-bold">
            <span className="bg-red-200 rounded-md p-3">
              <FaArrowTrendDown className="fill-red-600" />
            </span>
            <p className="text-sm">Debit</p>
            <span className="text-xs">#2,000</span>
            <span className="text-xs">13th, June 2024</span>
          </li>
        </ul>
      </div>
    </PageContainer>
  );
};
