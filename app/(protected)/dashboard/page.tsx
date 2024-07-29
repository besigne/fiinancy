"use client";

import {
  Card,
  CardHeader,
  CardContent
} from "@/components/ui/card";
import { InfoCard } from "@/app/(protected)/dashboard/_components/info";
import { YearCard } from "@/app/(protected)/dashboard/_components/year";
import { MonthCard } from "@/app/(protected)/dashboard/_components/month";



export default function Dashboards() {

  // TODO: Gerar os gráficos e mostrar em tela

  return (
    <div className="flex flex-col w-full justify-center items-center space-y-2">
      <div className="flex flex-row w-9/12 gap-x-2">
        <Card className="w-6/12">
          <CardHeader>
            <p className="text-2xl font-semibold text-left">
              Gráfico Mensal
            </p>
          </CardHeader>
          <CardContent>
            <MonthCard />
          </CardContent>
        </Card>
        <Card className="w-6/12">
          <CardHeader>
            <p className="text-2xl font-semibold text-left">
              Informações Gerais
            </p>
          </CardHeader>
          <CardContent>
            <InfoCard />
          </CardContent>
        </Card>
      </div>
      <div className="flex flex-row w-full items-center justify-center">
        <Card className="w-9/12">
          <CardHeader>
            <p className="text-2xl font-semibold text-left">
              Gráfico Anual
            </p>
          </CardHeader>
          <CardContent>
            <YearCard />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}