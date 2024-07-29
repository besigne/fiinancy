"use client";

import {
  Card,
  CardHeader,
  CardContent
} from "@/components/ui/card";

export default function Transaction() {

  return (
    <div className="flex flex-col w-full justify-center items-center space-y-2">
      <div className="flex flex-row w-9/12 gap-x-2 bg-white rounded-md shadow-md justify-center">
        <p>
          Aqui fica o datepicker, filtrar por categoria & criar nova transação
        </p>
      </div>
      <div className="flex flex-row w-9/12 gap-x-2">
        <Card className="w-full">
          <CardHeader>
            <p className="text-2xl font-semibold text-left">
              Todas as transações
            </p>
          </CardHeader>
          <CardContent>
            Tabela de transações do mês atual
          </CardContent>
        </Card>
      </div>
    </div>
  );
}