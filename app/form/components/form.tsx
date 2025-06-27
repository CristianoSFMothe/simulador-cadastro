"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { states } from "@/app/utils/states";

const schema = z.object({
  firstName: z.string().min(1, "Nome é obrigatório"),
  lastName: z.string().min(1, "Sobrenome é obrigatório"),
  street: z.string().min(1, "Rua é obrigatória"),
  number: z.string().min(1, "Número é obrigatório"),
  district: z.string().optional(),
  complement: z.string().optional(),
  city: z.string().min(1, "Cidade é obrigatória"),
  state: z.string().min(1, "Estado é obrigatório"),
  zipCode: z.string().min(8, "CEP inválido"),
});

type FormData = z.infer<typeof schema>;

export function FormSection() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 max-w-2xl mx-auto"
    >
      <div className="space-y-2">
        <Label htmlFor="name">Nome</Label>
        <Input id="name" {...register("firstName")} />
        {errors.firstName && (
          <p className="text-sm text-red-500">{errors.firstName.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="lastname">Sobrenome</Label>
        <Input id="lastname" {...register("lastName")} />
        {errors.lastName && (
          <p className="text-sm text-red-500">{errors.lastName.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="street">Rua</Label>
        <Input id="street" {...register("street")} />
        {errors.street && (
          <p className="text-sm text-red-500">{errors.street.message}</p>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-4 w-full">
        <div className="flex-[1] space-y-2">
          <Label htmlFor="number">Número</Label>
          <Input id="number" {...register("number")} />
          {errors.number && (
            <p className="text-sm text-red-500">{errors.number.message}</p>
          )}
        </div>

        <div className="flex-[3] space-y-2">
          <Label htmlFor="district">Bairro</Label>
          <Input id="district" {...register("district")} />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="complement">Complemento</Label>
        <Input id="complement" {...register("complement")} />
      </div>

      <div className="flex flex-col md:flex-row gap-4 w-full max-w-4xl mx-auto">
        <div className="flex-[3] space-y-2">
          <Label htmlFor="city">Cidade</Label>
          <Input id="city" {...register("city")} />
          {errors.city && (
            <p className="text-sm text-red-500">{errors.city.message}</p>
          )}
        </div>

        <div className="flex-[2] space-y-2">
          <Label htmlFor="state">Estado</Label>
          <Select onValueChange={(value) => setValue("state", value)}>
            <SelectTrigger id="state">
              <SelectValue placeholder="Selecione um Estado" />
            </SelectTrigger>
            <SelectContent>
              {states.map(({ sigla, name }) => (
                <SelectItem key={sigla} value={sigla}>
                  {name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.state && (
            <p className="text-sm text-red-500">{errors.state.message}</p>
          )}
        </div>

        <div className="flex-[1.5] space-y-2">
          <Label htmlFor="zipcode">CEP</Label>
          <Input id="zipcode" {...register("zipCode")} />
          {errors.zipCode && (
            <p className="text-sm text-red-500">{errors.zipCode.message}</p>
          )}
        </div>
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Enviar
      </button>
    </form>
  );
}
