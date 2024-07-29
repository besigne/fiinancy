import * as z from "zod";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormUserGoalSchema } from "@/schemas/user-goals";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";

import { toast } from "sonner";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { TbEraser } from "react-icons/tb";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useTransition } from "react";
import { createGoal } from "@/actions/user-goals";
import MoneyInput from "@/components/money-input";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Separator } from "@/components/ui/separator";

export const NewGoal = () => {
  const [open, setOpen] = useState(false);
  const [isPending, startTransaction] = useTransition();

  const form = useForm<z.infer<typeof FormUserGoalSchema>>({
    resolver: zodResolver(FormUserGoalSchema),
    defaultValues: {
      description: undefined,
      goal: 0,
      saved: 0,
      until: undefined
    },
  });


  const onSubmit = (values: z.infer<typeof FormUserGoalSchema>) => {
    startTransaction(() => {
      createGoal(values)
      .then((data) => {
        if (data.success) toast.success(data.success);
        if (data.error) toast.error(data.error);
      })
      .catch(() => {
        // TODO: Transformar isso aqui em um erro padrão
        toast.error("Alguma coisa deu errado")
      })
      .finally(() => {
        form.reset();
        setOpen(false);
      })
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost">Novo Objetivo</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crie um novo objetivo</DialogTitle>
        </DialogHeader>
        <DialogDescription>Preencha os campos abaixo</DialogDescription>
        <Form {...form}>
          <form
            className="space-y-6"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <Separator className="my-1" />
            <div className="flex flex-col w-full justify-between space-y-4">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Input 
                        {...field}
                        placeholder="descrição"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <MoneyInput
                form={form}
                label="Objetivo"
                name="goal"
                placeholder="R$ 0"
              />
              <MoneyInput
                form={form}
                label="Valor Atual"
                name="saved"
                placeholder="R$ 0"
              />
              <FormField
                control={form.control}
                name="until"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel ><p>Data de Conclusão</p></FormLabel>
                    <FormControl>
                      <div className="flex flex-row w-full">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {field.value ? format(field.value, "dd / MM / yyyy") : <span>Escolha uma data</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="center">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <Button type="button" variant="ghost" onClick={() => { form.setValue(field.name, undefined) }}>
                          <TbEraser className="text-muted-foreground h-4 w-4" />
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-row w-full justify-center gap-x-2">
              <Button
                disabled={isPending}
                type="submit"
              >
                Criar
              </Button>
            </div>

          </form>
        </Form>
      </DialogContent>
    </Dialog >
  );
};