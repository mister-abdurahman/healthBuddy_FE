import { Card } from "../ui/Card";
import demoImage from "../assets/react.svg";
import { MdOutlineDoubleArrow } from "react-icons/md";
import { FaArrowRightLong } from "react-icons/fa6";
import {
  useGetAppointmentsByUserIdQuery,
  useGetNewsQuery,
  useGetUpcomingAppointmentQuery,
} from "../Data/Api/ApiHandler";
import { RootState } from "../Data/State/store";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { appendAM_PM } from "../utils/helper";
import { useNavigate } from "react-router-dom";
import { Spinner } from "../ui/Spinner";
import { ErrorComp } from "../ui/ErrorComp";

export const Dashboard = () => {
  // const user = useSelector((state: RootState) => state.user.userDetails);
  const navigate = useNavigate();

  const {
    data: upcomingAppointment,
    isLoading: loadingUpcomingAppointment,
    isError: upcomingAppointmentError,
  } = useGetUpcomingAppointmentQuery("");
  const userId = useSelector((state: RootState) => state.user.userDetails._id);
  const {
    data: appointments,
    isLoading: loadingAppointments,
    isError: appointmentsError,
  } = useGetAppointmentsByUserIdQuery(userId);

  const {
    data: news,
    isLoading: loadingNews,
    isError: newsError,
  } = useGetNewsQuery("");

  if (loadingNews || loadingAppointments || loadingUpcomingAppointment)
    return <Spinner />;
  if (news?.hasError || newsError) return <ErrorComp message={news?.message} />;
  if (appointments?.hasError || appointmentsError)
    return <ErrorComp message={appointments?.message} />;
  if (upcomingAppointment?.hasError || upcomingAppointmentError)
    return <ErrorComp message={upcomingAppointment?.message} />;

  const completed = appointments.data.filter((el) => el.completed);
  const lastCompleted = completed.at(completed.length - 1);

  return (
    <div>
      <h1 className="font-bold text-2xl">Dashboard</h1>
      <Card style="bg-secondary relative flex">
        <div className="absolute top-0 right-0 w-52 md:w-64 lg:w-96 h-full rounded-tr-xl rounded-br-xl bg-seeYouSoonImage bg-cover"></div>
        <div className="z-10">
          <p className={`text-xl font-semibold text-white`}>
            Upcoming Appointment
          </p>
          <span className="text-xs text-secondary_light font-semibold">
            On <br className="sm:hidden block" />{" "}
            {dayjs(upcomingAppointment.data.date).format(
              "dddd, D [of] MMMM YYYY"
            )}
            <br className="sm:hidden block" /> with{" "}
            {upcomingAppointment.data.doctorName} at{" "}
            {appendAM_PM(upcomingAppointment.data.time)}
          </span>
        </div>
        <MdOutlineDoubleArrow
          onClick={() =>
            navigate(`/appointment/${upcomingAppointment.data._id}`)
          }
          className="fill-secondary_light arrow_animate hover:fill-primary w-8 h-8 sm:-ml-8 md:ml-8 cursor-pointer sm:relative sm:top-auto sm:left-auto absolute top-12 left-36 z-50"
        />
      </Card>

      <Card style="bg-white">
        <p className={`text-xl font-semibold text-secondary`}>
          Most Recent Vitals Result
        </p>
        <span className="text-xs text-blue-400 font-semibold">
          Vitals were captured on{" "}
          {dayjs(lastCompleted.date).format("dddd, D [of] MMMM YYYY")}
        </span>
        <ul className="text-sm divide-y-2 divide-secondary_light mt-4">
          <li>
            Blood Pressure:{" "}
            <strong>{lastCompleted.vitals.bloodPressure}</strong>
          </li>
          <li>
            Sugar Level: <strong>{lastCompleted.vitals.sugarLevel}</strong>
          </li>
          <li>
            Heart Rate: <strong>{lastCompleted.vitals.heartRate}</strong>
          </li>
        </ul>
      </Card>

      <Card style="bg-primary">
        <p className={`text-xl font-semibold text-white`}>
          Most Recent Doctor Note
        </p>
        <p className="text-sm text-secondary_light_2">
          {lastCompleted.doctorNote}
        </p>
        <span className="italic text-xs text-right font-semibold">
          {lastCompleted.doctorName}
        </span>
      </Card>
      <Card style="bg-white">
        <div className="flex gap-4 items-center">
          <p className={`text-xl font-semibold text-secondary`}>Latest News</p>
          <span>
            <FaArrowRightLong
              className="w-6 h-6 fill-secondary cursor-pointer"
              onClick={() => navigate(`/health-news`)}
            />
          </span>
        </div>
        <section className="text-sm space-y-2 mt-2">
          {news.data.slice(0, 4).map((el, i: number) => (
            <div key={i} className="flex gap-2 items-center">
              <figure
                className="w-12 h-12 rounded-full overflow-clip cursor-pointer"
                onClick={() => navigate("/health-news")}
              >
                <img
                  className="object-cover w-full h-full"
                  src={el.image || demoImage}
                  alt=""
                />
              </figure>
              <p>{el.text.slice(0, 30)}...</p>
            </div>
          ))}
        </section>
      </Card>
    </div>
  );
};
