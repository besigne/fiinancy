"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Goal = {
  id: string,
  description: string,
  goal: number,
  saved: number,
  until?: Date
}

export const columns: ColumnDef<Goal>[] = [
  {
    accessorKey: "description",
    header: "Descrição"
  },
  {
    accessorKey: "goal",
    header: "valor a atingir"
  },
  {
    accessorKey: "saved",
    header: "Valor atual"
  },
  {
    accessorKey: "until",
    header: "Prazo"
  }
];
