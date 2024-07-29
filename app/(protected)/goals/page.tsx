"use client";

import { Goal, columns } from "./_components/columns";
import { GoalsTable } from "@/app/(protected)/goals/_components/table";

import { NewGoal } from "@/app/(protected)/goals/_components/new-goal";
import { useEffect, useState, useTransition } from "react";
import { searchGoals } from "@/actions/user-goals";

export default function Goals() {
  const [isPending, startTransaction] = useTransition();
  // TODO: Deixar isso dinâmico
  const [data, setData] = useState<Goal[]>([]);

  useEffect(() => {
    startTransaction(() => {
      searchGoals()
      .then((response) => {
        if (response.data) setData(response.data);
      })
    });
  }, [])

  return (
    <div className="flex flex-col w-full justify-center items-center space-y-4">
      <div className="flex flex-row w-9/12 justify-end items-center space-x-2">
        <NewGoal />
      </div>
      <GoalsTable columns={columns} data={data} />
    </div>
  );
}