import React, { useEffect, useState } from "react";
import { PageContainer } from "../ui/PageContainer";
import { Card } from "../ui/Card";
import { MdAddBox } from "react-icons/md";
import { FaFilter } from "react-icons/fa";
import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";
import { IoFilter } from "react-icons/io5";
import {
  useGetTransactionsByWalletIdQuery,
  useGetWalletQuery,
} from "../Data/Api/ApiHandler";
import { useSelector } from "react-redux";
import { RootState } from "../Data/State/store";
import { formatter } from "../utils/helper";
import dayjs from "dayjs";
import PaymentModal from "../ui/PaymentModal";
import { Dropdown } from "@mui/base/Dropdown";
import { MenuButton as BaseMenuButton } from "@mui/base/MenuButton";
import { MenuItem as BaseMenuItem, menuItemClasses } from "@mui/base/MenuItem";
import { Menu, MenuListboxSlotProps } from "@mui/base/Menu";
import { MenuItem } from "@mui/material";
import { Spinner } from "../ui/Spinner";
import { ErrorComp } from "../ui/ErrorComp";

export const Wallet = () => {
  const [open, setOpen] = useState(false);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const id = useSelector((state: RootState) => state.user.userDetails.walletId);
  const {
    data: wallet,
    isLoading: loadingWallet,
    isError: walletError,
  } = useGetWalletQuery(id);
  const {
    data: transactions,
    isLoading: loadingTransactions,
    isError: transactionError,
  } = useGetTransactionsByWalletIdQuery(id);

  useEffect(
    function () {
      transactions && setFilteredTransactions(transactions?.data);
    },
    [transactions]
  );

  if (loadingWallet || loadingTransactions) return <Spinner />;
  if (wallet?.hasError || walletError)
    return <ErrorComp message={wallet?.message} />;
  if (transactions?.hasError || transactionError)
    return <ErrorComp message={transactions?.message} />;

  const today = new Date();

  function filterByAll() {
    setFilteredTransactions(transactions.data);
  }
  function filterByType(type: string) {
    setFilteredTransactions(transactions.data.filter((el) => el.type === type));
  }
  function filterByDate(days: number) {
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - days);
    setFilteredTransactions(
      transactions.data.filter((el) => new Date(el.date) >= sevenDaysAgo)
    );
  }

  return (
    <PageContainer title="Wallet">
      <Card style="bg-secondary mt-7 relative max-w-[28rem] mx-auto">
        <span className="text-xs font-thin text-left underline underline-offset-0 text-white">
          Balance
        </span>
        <h1 className="text-3xl font-bold text-secondary_light">
          {formatter.format(wallet.data.currentBalance)}
        </h1>
        <MdAddBox
          onClick={handleOpen}
          className="absolute cursor-pointer top-4 right-4 fill-secondary_light text-5xl"
        />
      </Card>
      <div className="text-center mt-1">
        <span className="sm:text-xs text-[.65rem] bg-primary rounded-lg px-2 text-secondary_light font-semibold">
          No stress, Pending bills will be deducted automatically
        </span>
      </div>

      <div className="mt-12 bg-secondary_light_2 px-4 py-2 rounded-md">
        <div className="flex items-center justify-between mr-8">
          <p className="text-sm font-semibold">Wallet History</p>
          <Dropdown>
            <BaseMenuButton>
              <IoFilter className="fill-secondary w-6 h-6" />
            </BaseMenuButton>
            <Menu className="bg-secondary_light rounded-lg">
              <MenuItem onClick={filterByAll} className="text-xs font-bold">
                <span className="text-xs font-bold text-secondary font-Poppins">
                  All
                </span>
              </MenuItem>
              <MenuItem onClick={() => filterByType("credit")}>
                <span className="text-xs font-bold text-secondary font-Poppins">
                  Credit
                </span>
              </MenuItem>
              <MenuItem onClick={() => filterByType("debit")}>
                <span className="text-xs font-bold text-secondary font-Poppins">
                  Debit
                </span>
              </MenuItem>
              <MenuItem onClick={() => filterByDate(7)}>
                <span className="text-xs font-bold text-secondary font-Poppins">
                  Last 7 days
                </span>
              </MenuItem>
              <MenuItem onClick={() => filterByDate(30)}>
                <span className="text-xs font-bold text-secondary font-Poppins">
                  Last 30 days
                </span>
              </MenuItem>
            </Menu>
          </Dropdown>
        </div>
        <ul className="divide-y-2 divide-secondary_light max-h-screen overflow-scroll styled-scrollbar">
          {filteredTransactions?.map((el, i) => (
            <li
              key={i}
              className="flex items-center justify-between my-1 py-2 font-bold"
            >
              <span
                className={`rounded-md p-3 ${
                  el.type === "credit" ? "bg-green-200" : "bg-red-200"
                }`}
              >
                <FaArrowTrendUp
                  className={`${
                    el.type === "credit" ? "fill-green-600" : "fill-red-600"
                  }`}
                />
              </span>
              <p className="text-sm capitalize">{el.type}</p>
              <span className="text-xs">{formatter.format(el.amount)}</span>
              <span className="text-xs">
                {dayjs(el?.date).format("MMMM DD, YYYY")}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <PaymentModal open={open} handleClose={handleClose} walletId={id} />
    </PageContainer>
  );
};
