import React from "react";
import { PageContainer } from "../ui/PageContainer";
import { IoEyeSharp } from "react-icons/io5";
import { Button, Tooltip } from "@mui/material";

export const Notifications = () => {
  return (
    <PageContainer title="Notifications">
      <ul className="flex flex-col gap-2 text-xs">
        <li className="mt-4 flex items-center gap-2 justify-between border-2 border-secondary text-secondary rounded-md px-2 py-1">
          <p className="basis-1/2">Someone just logged in your account</p>
          <span className="basis-1/4">10-02-2024</span>
          <div className="basis-1/4 flex items-center justify-around">
            <Tooltip title="Mark as read" placement="top-start">
              <Button>
                <IoEyeSharp className="w-6 h-6" />
              </Button>
            </Tooltip>
            <span className="bg-red-500 w-3 h-3 rounded-full"></span>
          </div>
        </li>
        <li className="flex items-center gap-2 justify-between border-2 border-secondary text-secondary rounded-md px-2 py-1">
          <p className="basis-1/2">Welcome Bonus package</p>
          <span className="basis-1/4">10-02-2024</span>
          <div className="basis-1/4 flex items-center justify-around">
            <Tooltip title="Marked as read" placement="top-start">
              {/* <Button>top-start</Button> */}
              <Button className="invisible">
                <IoEyeSharp className="w-6 h-6" />
              </Button>
            </Tooltip>
            <span className="bg-gray-500 w-3 h-3 rounded-full"></span>
          </div>
        </li>
      </ul>
    </PageContainer>
  );
};
