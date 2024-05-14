import { PageContainer } from "../ui/PageContainer";
import { IoEyeSharp } from "react-icons/io5";
import { Button, Tooltip } from "@mui/material";
import {
  useGetNotificationsByUserIdQuery,
  useUpdateNotificationMutation,
} from "../Data/Api/ApiHandler";
import { useSelector } from "react-redux";
import { RootState } from "../Data/State/store";
import dayjs from "dayjs";
import { Spinner } from "../ui/Spinner";
import { ErrorComp } from "../ui/ErrorComp";
import { SpinnerMini } from "../ui/SpinnerMini";

export const Notifications = () => {
  const id = useSelector((state: RootState) => state.user.userDetails._id);
  const {
    data: notifications,
    isLoading: loadingNotifications,
    isError: notificationError,
  } = useGetNotificationsByUserIdQuery(id);
  const [updateNotification, { isLoading: updatingNotification }] =
    useUpdateNotificationMutation();

  if (loadingNotifications) return <Spinner />;
  if (notifications?.hasError || notificationError)
    return <ErrorComp message={notifications?.message} />;

  function handleUpdateNotification(id: string) {
    const update = {
      read: true,
    };
    updateNotification({ id, notification: update }).then(
      (res: any) => {
        if (res?.hasError) return alert(res?.message);
        alert("Notification marked as read");
      }
    );
  }

  return (
    <PageContainer title="Notifications">
      <ul className="flex flex-col gap-2 text-xs font-bold">
        {notifications.data.map(
          (
            el: { date: string; read: boolean; note: string; _id: string },
            i: number
          ) => (
            <li
              key={i}
              className="mt-4 flex items-center gap-2 justify-between bg-secondary_light_2 border-[1px] border-secondary text-secondary px-2 py-1"
            >
              <p className="basis-1/2">{el.note}</p>
              <span className="basis-1/4">
                {dayjs(el.date).format("MMMM DD, YYYY")}
              </span>
              <div className="basis-1/4 flex items-center justify-around">
                {updatingNotification ? (
                  <SpinnerMini />
                ) : (
                  <Tooltip title="Mark as read" placement="top-start">
                    <Button
                      onClick={() => handleUpdateNotification(el._id)}
                      className={`${el.read && "invisible"}`}
                    >
                      <IoEyeSharp className="w-6 h-6" />
                    </Button>
                  </Tooltip>
                )}
                <span
                  className={`${
                    el.read ? "bg-gray-500" : "bg-red-500"
                  } w-3 h-3 rounded-full`}
                ></span>
              </div>
            </li>
          )
        )}
      </ul>
    </PageContainer>
  );
};
