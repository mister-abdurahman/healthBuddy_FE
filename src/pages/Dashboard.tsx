import React from "react";
import { Card } from "../ui/Card";
import demoImage from "../assets/react.svg";
import { IoArrowRedoSharp } from "react-icons/io5";
import { MdOutlineDoubleArrow } from "react-icons/md";

export const Dashboard = () => {
  return (
    <div>
      <h1 className="font-bold text-2xl">Dashboard</h1>
      <Card style="bg-secondary relative flex">
        {/* <figure className="absolute right-0 top-0 overflow-hidden">
          <img
            src={seeYouSoon}
            alt="See you soon image"
            className="object-cover w-full h-12 overflow-clip"
          />
        </figure> */}
        <div className="absolute top-0 right-0 w-96 h-full rounded-tr-xl rounded-br-xl bg-seeYouSoonImage bg-cover"></div>
        <div>
          <p className={`text-xl font-semibold text-white`}>
            Upcoming Appointment
          </p>
          <span className="text-xs text-secondary_light">
            On Tuesday, 25th of June 2024 with Dr. Akanni.
          </span>
        </div>
        <MdOutlineDoubleArrow className="fill-secondary_light hover:fill-primary w-8 h-8 ml-8 cursor-pointer" />
      </Card>

      <Card style="bg-white">
        <p className={`text-xl font-semibold text-secondary`}>
          Recent Vitals Result
        </p>
        <span className="text-xs text-blue-400 font-semibold">
          Vitals were captured on the 22nd of March, 2024
        </span>
        <ul className="text-sm divide-y-2 divide-secondary_light mt-4">
          <li>
            Blood Pressure: <strong>20/110</strong>
          </li>
          <li>
            Sugar Level: <strong>20/110</strong>
          </li>
          <li>
            Heart Rate: <strong>20/110</strong>
          </li>
        </ul>
      </Card>

      <Card style="bg-primary">
        <p className={`text-xl font-semibold text-white`}>Last Doctor Note</p>
        <p className="text-sm text-secondary_light_2">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempora
          dolorem ea sint quas maxime fuga impedit dolore.
        </p>
        <span className="italic text-xs text-right font-semibold">
          By Doctor Abdulaleem
        </span>
      </Card>
      <Card style="bg-white">
        <p className={`text-xl font-semibold text-secondary`}>Latest News</p>
        <section className="text-sm space-y-2 mt-2">
          <div className="flex gap-2 items-center">
            <figure>
              <img src={demoImage} alt="" />
            </figure>
            <p>Outbreak of Ebola strikes Europe...</p>
          </div>
          <div className="flex gap-2 items-center">
            <figure>
              <img src={demoImage} alt="" />
            </figure>
            <p>Outbreak of Ebola strikes Europe...</p>
          </div>
          <div className="flex gap-2 items-center">
            <figure>
              <img src={demoImage} alt="" />
            </figure>
            <p>Outbreak of Ebola strikes Europe...</p>
          </div>
        </section>
      </Card>
    </div>
  );
};
