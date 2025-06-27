import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormSection } from "./components/form";

export default function FormCard() {
  return (
    <Card className="max-w-2xl mx-auto mt-10 p-6">
      <CardContent className="space-y-6">
        <h3 className="text-xl font-semibold">Campo de Treinamento</h3>

        <FormSection />

        <div className="space-y-2">
          <Label>Sexo</Label>
          <RadioGroup defaultValue="" className="flex gap-4">
            <div className="flex items-center gap-2">
              <RadioGroupItem value="M" id="masculino" />
              <Label htmlFor="masculino">Masculino</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="F" id="feminino" />
              <Label htmlFor="feminino">Feminino</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label>Comida Favorita</Label>
          <div className="flex flex-wrap gap-4">
            {["Carne", "Frango", "Pizza", "Vegetariano"].map((food, index) => (
              <div key={index} className="flex items-center gap-2">
                <Checkbox id={`comida-${index}`} />
                <Label htmlFor={`comida-${index}`}>{food}</Label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="escolaridade">Escolaridade</Label>
          <Select>
            <SelectTrigger id="escolaridade">
              <SelectValue placeholder="Selecione sua escolaridade" />
            </SelectTrigger>
            <SelectContent>
              {[
                "1º grau incompleto",
                "1º grau completo",
                "2º grau incompleto",
                "2º grau completo",
                "Superior",
                "Especialização",
                "Mestrado",
                "Doutorado",
              ].map((option, index) => (
                <SelectItem key={index} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="esportes">Esportes</Label>
          <Select>
            <SelectTrigger id="esportes">
              <SelectValue placeholder="Selecione os esportes" />
            </SelectTrigger>
            <SelectContent>
              {[
                "Natação",
                "Futebol",
                "Corrida",
                "Karate",
                "O que é esporte?",
              ].map((sport, index) => (
                <SelectItem key={index} value={sport}>
                  {sport}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="sugestoes">Sugestões</Label>
          <Textarea
            id="sugestoes"
            placeholder="Escreva aqui suas sugestões..."
          />
        </div>

        <Button className="w-full">Cadastrar</Button>
      </CardContent>
    </Card>
  );
}
