import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info } from 'lucide-react';

export function WhatsAppSetupStep() {
  return (
    <div className="space-y-6">
      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Integração com WhatsApp</AlertTitle>
        <AlertDescription>
          Para conectar seu WhatsApp, você precisará ter um número empresarial ou um número
          pessoal que será usado exclusivamente para o negócio.
        </AlertDescription>
      </Alert>
      
      <div className="space-y-4">
        <div>
          <h4 className="font-medium">1. Cadastre seu número</h4>
          <p className="text-sm text-muted-foreground">
            Este será o número que aparecerá para seus clientes
          </p>
        </div>
        
        <div>
          <h4 className="font-medium">2. Escaneie o QR Code</h4>
          <p className="text-sm text-muted-foreground">
            Abra o WhatsApp no celular com o número cadastrado e escaneie o QR code que
            aparecerá na próxima etapa
          </p>
        </div>
        
        <div>
          <h4 className="font-medium">3. Pronto para usar</h4>
          <p className="text-sm text-muted-foreground">
            Após a conexão, você poderá gerenciar todas as interações pelo painel
          </p>
        </div>
      </div>
    </div>
  );
}