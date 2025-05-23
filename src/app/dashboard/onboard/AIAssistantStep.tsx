import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { FileUpload } from './file-upload';

const aiAssistantSchema = z.object({
  knowledgeFile: z.string().min(1, 'Por favor, envie um arquivo'),
  welcomeMessage: z.string().min(10, 'A mensagem deve ter pelo menos 10 caracteres'),
});

export function AIAssistantStep() {
  const form = useForm({
    resolver: zodResolver(aiAssistantSchema),
    defaultValues: {
      knowledgeFile: '',
      welcomeMessage: 'Olá! Sou o assistente virtual do estabelecimento. Como posso te ajudar?',
    },
  });

  return (
    <Form {...form}>
      <form className="space-y-6">
        <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle>Assistente Virtual Inteligente</AlertTitle>
          <AlertDescription>
            Envie um arquivo com informações sobre seu negócio para configurar o assistente
            que responderá dúvidas dos clientes no WhatsApp.
          </AlertDescription>
        </Alert>
        
        <FormField
          control={form.control}
          name="knowledgeFile"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Arquivo de Conhecimento (PDF ou DOCX)</FormLabel>
              <FormControl>
                <FileUpload
                  value={field.value}
                  onChange={field.onChange}
                  accept=".pdf,.docx"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="welcomeMessage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mensagem de Boas-vindas</FormLabel>
              <FormControl>
                <textarea
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Digite a mensagem que os clientes verão ao iniciar uma conversa"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}