"use client";

import { ReactNode } from "react";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { states } from "@/app/utils/states";
import { educationOptions } from "@/app/utils/educationOptions";
import { sportsOptions } from "@/app/utils/sportsOptions";

const schema = z.object({
  firstName: z.string().min(1, "Nome é obrigatório"),
  lastName: z.string().min(1, "Sobrenome é obrigatório"),
  street: z.string().min(1, "Rua é obrigatória"),
  number: z.string().min(1, "Número é obrigatório"),
  district: z.string().min(1, "Bairro é obrigatório"),
  complement: z.string().optional(),
  city: z.string().min(1, "Cidade é obrigatória"),
  state: z.string().min(1, "Estado é obrigatório"),
  zipCode: z.string().min(8, "CEP inválido"),
  gender: z.enum(["M", "F"], {
    errorMap: () => ({ message: "Sexo é obrigatório" }),
  }),
  favoriteFoods: z.array(z.string()).optional(),
  education: z.string().min(1, "Escolaridade é obrigatória"),
  sports: z.string().min(1, "Esportes são obrigatórios"),
  suggestions: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

interface FormSectionProps {
  children?: ReactNode;
}

export function FormSection({ children }: FormSectionProps) {
  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = methods;

  const onSubmit = (data: FormData) => {
    alert("Cadastro feito com sucesso!");
    console.log("Dados cadastrados:", data);
  };

  // Controle checkbox favoriteFoods
  const favoriteFoods = watch("favoriteFoods") || [];

  const toggleFavoriteFood = (food: string, checked: boolean) => {
    if (checked) {
      setValue("favoriteFoods", [...favoriteFoods, food]);
    } else {
      setValue(
        "favoriteFoods",
        favoriteFoods.filter((f) => f !== food),
      );
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 max-w-2xl mx-auto"
        noValidate
      >
        {/* Nome e Sobrenome */}
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

        {/* Escolaridade e Esportes - mesma linha */}
        <div className="flex gap-4 w-full">
          <div className="flex-1 space-y-2">
            <Label htmlFor="education">Escolaridade</Label>
            <Controller
              name="education"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  value={field.value || ""}
                >
                  <SelectTrigger id="education" className="w-full">
                    <SelectValue placeholder="Selecione sua escolaridade" />
                  </SelectTrigger>
                  <SelectContent>
                    {educationOptions.map((option, index) => (
                      <SelectItem key={index} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.education && (
              <p className="text-sm text-red-500">{errors.education.message}</p>
            )}
          </div>

          <div className="flex-1 space-y-2">
            <Label htmlFor="sports">Esportes</Label>
            <Controller
              name="sports"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  value={field.value || ""}
                >
                  <SelectTrigger id="sports" className="w-full">
                    <SelectValue placeholder="Selecione os esportes" />
                  </SelectTrigger>
                  <SelectContent>
                    {sportsOptions.map((sport, index) => (
                      <SelectItem key={index} value={sport}>
                        {sport}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.sports && (
              <p className="text-sm text-red-500">{errors.sports.message}</p>
            )}
          </div>
        </div>

        {/* Sexo e Comida Favorita - mesma linha */}
        <div className="flex gap-4 w-full">
          <div className="flex-1 space-y-2">
            <Label>Sexo</Label>
            <RadioGroup
              defaultValue=""
              className="flex gap-4"
              onValueChange={(value) => setValue("gender", value as "M" | "F")}
            >
              <div className="flex items-center gap-2">
                <RadioGroupItem value="M" id="masculino" />
                <Label htmlFor="masculino">Masculino</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="F" id="feminino" />
                <Label htmlFor="feminino">Feminino</Label>
              </div>
            </RadioGroup>
            {errors.gender && (
              <p className="text-sm text-red-500">{errors.gender.message}</p>
            )}
          </div>

          <div className="flex-1 space-y-2">
            <Label>Comida Favorita</Label>
            <div className="flex flex-wrap gap-4">
              {["Carne", "Frango", "Pizza", "Vegetariano"].map(
                (food, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Checkbox
                      id={`comida-${index}`}
                      checked={favoriteFoods.includes(food)}
                      onCheckedChange={(checked) =>
                        toggleFavoriteFood(food, checked as boolean)
                      }
                    />
                    <Label htmlFor={`comida-${index}`}>{food}</Label>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>

        {/* Endereço: Rua, Número e Bairro */}
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
            {errors.district && (
              <p className="text-sm text-red-500">{errors.district.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="complement">Complemento</Label>
          <Input id="complement" {...register("complement")} />
        </div>

        {/* Cidade, Estado e CEP */}
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
            <Controller
              name="state"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  value={field.value || ""}
                >
                  <SelectTrigger id="state" className="w-full">
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
              )}
            />
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

        {/* Sugestões */}
        <div className="space-y-2">
          <Label htmlFor="suggestions">Sugestões</Label>
          <Textarea
            id="suggestions"
            placeholder="Escreva aqui suas sugestões..."
            className="resize-y h-32"
            {...register("suggestions")}
          />
        </div>

        {children}
      </form>
    </FormProvider>
  );
}
