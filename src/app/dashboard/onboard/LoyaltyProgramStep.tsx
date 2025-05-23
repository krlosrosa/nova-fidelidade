import { Switch } from '@/components/ui/switch';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const loyaltySchema = z.object({
  enabled: z.boolean().default(true),
  pointsName: z.string().default("pontos"),
  pointsPerPurchase: z.number().min(1).default(10),
  pointsToReward: z.number().min(1).default(100),
});

export function LoyaltyProgramStep() {
  const form = useForm({
    resolver: zodResolver(loyaltySchema),
    defaultValues: {
      enabled: true,
      pointsName: "pontos",
      pointsPerPurchase: 10,
      pointsToReward: 100,
    },
  });

  return (
    <Form {...form}>
      <form className="space-y-6">
        <FormField
          control={form.control}
          name="enabled"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Ativar Programa de Fidelidade</FormLabel>
                <p className="text-sm text-muted-foreground">
                  Os clientes acumulam pontos a cada compra e podem trocar por recompensas
                </p>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        
        {form.watch('enabled') && (
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="pointsName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Como você chama seus pontos?</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: pontos, moedas, estrelas..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="pointsPerPurchase"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pontos por compra</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="pointsToReward"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pontos para recompensa</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        )}
      </form>
    </Form>
  );
}