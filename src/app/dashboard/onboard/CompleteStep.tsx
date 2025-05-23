import { CheckCircle } from 'lucide-react';

export function CompleteStep() {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 text-center">
      <div className="bg-primary/10 p-4 rounded-full">
        <CheckCircle className="w-12 h-12 text-primary" />
      </div>
      <h3 className="text-xl font-semibold">Configuração concluída com sucesso!</h3>
      <p className="text-muted-foreground">
        Seu sistema está pronto para uso. Você pode acessar o painel e começar a
        gerenciar seu negócio agora mesmo.
      </p>
      <div className="pt-4">
        <p className="text-sm text-muted-foreground">
          A qualquer momento você pode ajustar essas configurações nas páginas de
          cada funcionalidade.
        </p>
      </div>
    </div>
  );
}