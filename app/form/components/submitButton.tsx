"use client";

import { useFormContext } from "react-hook-form";

export function SubmitButton() {
  const { handleSubmit, trigger } = useFormContext();

  const onSubmit = (data: any) => {
    alert("Cadastro feito com sucesso!");
    console.log("Dados cadastrados:", data);
  };

  const handleClick = async () => {
    const isValid = await trigger();
    if (isValid) {
      handleSubmit(onSubmit)();
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded w-full"
    >
      Cadastrar
    </button>
  );
}
