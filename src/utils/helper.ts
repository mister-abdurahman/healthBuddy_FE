import dayjs from "dayjs";

export const formatTime = (time: string) => {
  if (!time) return;
  if (time.length === 5) return time;

  const first = time.slice(0, 5);
  const second = time.slice(5, 7);

  console.log(first, second);

  let adjustedTime;
  if (second === "pm") {
    const manip = +first.split(":")[0] + 12;
    adjustedTime = manip.toString() + ":" + first.split(":")[1];
  } else {
    const manip1 = +first.split(":")[0];
    if (manip1 < 10) {
      adjustedTime = "0" + manip1.toString() + ":" + first.split(":")[1];
    } else {
      adjustedTime = manip1.toString() + ":" + first.split(":")[1];
    }
  }
  // const final = new Date(`${x[0]}T${adjustedTime}`).toISOString();
  return adjustedTime;
  // return `${x[0]}T${adjustedTime}:00.000Z`;
  // console.log(new Date(`'${final}'`).toISOString());
  // return "2024-03-19T16:00:00.000Z";
};

export const appendAM_PM = (time: string) => {
  if (time?.length !== 5 || !time) return;
  const y = dayjs(`1970-01-01 ${time}`, "HH:mm");

  return y.format("h:mm A");
};
export const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "NGN",
  minimumFractionDigits: 2,
});
