import { Card, CardContent } from "@/components/ui/card";
import { FormSection } from "./components/form";
import { SubmitButton } from "./components/submitButton";

export default function FormCard() {
  return (
    <Card className="max-w-2xl mx-auto mt-10 p-6">
      <CardContent>
        <h3 className="text-xl font-semibold mb-6">Campo de Treinamento</h3>
        <FormSection>
          <SubmitButton />
        </FormSection>
      </CardContent>
    </Card>
  );
}
