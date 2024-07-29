"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { useState, useTransition } from "react";
import { SettingsSchema } from "@/schemas/settings";
import { FormMessagesTimeout } from "@/schemas/timer";
import { zodResolver } from "@hookform/resolvers/zod";
import { userPreferences } from "@/actions/user-preferences";

import {
  Card,
  CardHeader,
  CardContent
} from "@/components/ui/card";

import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import MoneyInput from "@/components/money-input";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { useCurrentUser } from "@/hooks/use-current-user";
import { CurrencyEnum, LanguageEnum } from "@prisma/client";

export default function Settings() {
  const user = useCurrentUser();
  const { update } = useSession();

  const [isPending, startTransaction] = useTransition();

  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      fixedIncome: user?.fixedIncome || undefined,
      fixedExpenses: user?.fixedExpenses || undefined,
      language: user?.languageCode as LanguageEnum || undefined,
      currency: user?.currency || undefined,
      savedAmmount: user?.saveAmmout || undefined,
      darkMode: false
    }
  });

  const resetFormMessages = () => {
    setError("");
    setSuccess("");
  }

  const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
    resetFormMessages();
    startTransaction(() => {
      userPreferences(values)
        .then((data) => {
          if (data.error) {
            setError(data.error);
          }

          if (data.success) {
            setSuccess(data.success);
          }
        })
        .catch(() => {
          setError("Something went wrong!");
        })
        .finally(() => {
          update();
          setTimeout(() => {
            resetFormMessages();
          }, FormMessagesTimeout);
        })
    });
  }

  return (
    <Card className="w-auto">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">
          Configurações
        </p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            className="space-y-6"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="flex flex-row gap-x-2 justify-center items-center">
              <MoneyInput
                form={form}
                label="Ganho fixo"
                name="fixedIncome"
                placeholder="R$ 1.000,00"
              />
              <MoneyInput
                form={form}
                label="Gasto fixo"
                name="fixedExpenses"
                placeholder="R$ 1.000,00"
              />
            </div>
            <div className="flex flex-row gap-x-2 justify-center items-center">
              <div className="w-full">
                <MoneyInput
                  form={form}
                  label="Valor guardado"
                  name="savedAmmount"
                  placeholder="R$ 0,00"
                />
              </div>
            </div>
            <div className="flex flex-row gap-x-2 justify-center items-center">
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="currency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Moeda</FormLabel>
                      <Select
                        disabled={isPending}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="selecione uma moeda" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {/* TODO: implementar opção de app em inglês */}
                          <SelectItem value={CurrencyEnum.USD} disabled>
                            Dolar
                          </SelectItem>
                          <SelectItem value={CurrencyEnum.BRL}>
                            Real
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="language"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Idioma</FormLabel>
                      <Select
                        disabled={isPending}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="selecione um idioma" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {/* TODO: implementar opção de app em inglês */}
                          <SelectItem value={LanguageEnum.enUS} disabled>
                            English
                          </SelectItem>
                          <SelectItem value={LanguageEnum.ptBR}>
                            Português (Brasil)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <FormField
              control={form.control}
              name="darkMode"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-2 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>DarkMode</FormLabel>
                    <FormDescription>
                      Enable dark mode
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                    // TODO: Implementar dark mode
                      disabled={true}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button
              disabled={isPending}
              type="submit"
            >
              Salvar
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}