import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  MessageSquare, 
  Smartphone, 
  QrCode, 
  Key, 
  CheckCircle, 
  AlertCircle,
  Loader2,
  Copy,
  RefreshCw,
  Settings
} from 'lucide-react';

export default function WhatsAppConnection() {
  const [connectionStatus, setConnectionStatus] = useState('disconnected'); // disconnected, connecting, connected
  const [activeTab, setActiveTab] = useState('qr-code');
  const [qrCode, setQrCode] = useState('');
  const [isGeneratingQR, setIsGeneratingQR] = useState(false);
  const [apiConfig, setApiConfig] = useState({
    serverUrl: '',
    apiKey: '',
    instanceName: ''
  });
  const [connectionInfo, setConnectionInfo] = useState({
    phoneNumber: '',
    deviceName: '',
    connectedAt: ''
  });

  // Simular geração de QR Code
  const generateQRCode = async () => {
    setIsGeneratingQR(true);
    setConnectionStatus('connecting');
    
    // Simular chamada API
    setTimeout(() => {
      setQrCode('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==');
      setIsGeneratingQR(false);
    }, 2000);

    // Simular conexão após 10 segundos
    setTimeout(() => {
      setConnectionStatus('connected');
      setConnectionInfo({
        phoneNumber: '+55 11 99999-9999',
        deviceName: 'WhatsApp Business',
        connectedAt: new Date().toLocaleString('pt-BR')
      });
    }, 10000);
  };

  const connectWithAPI = async () => {
    if (!apiConfig.serverUrl || !apiConfig.apiKey || !apiConfig.instanceName) {
      return;
    }

    setConnectionStatus('connecting');
    
    // Simular conexão via API
    setTimeout(() => {
      setConnectionStatus('connected');
      setConnectionInfo({
        phoneNumber: '+55 11 99999-9999',
        deviceName: 'Evolution API',
        connectedAt: new Date().toLocaleString('pt-BR')
      });
    }, 3000);
  };

  const disconnect = () => {
    setConnectionStatus('disconnected');
    setQrCode('');
    setConnectionInfo({
      phoneNumber: '',
      deviceName: '',
      connectedAt: ''
    });
  };

  const copyToClipboard = (text:any) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 mb-4">
            <MessageSquare className="h-8 w-8 text-green-600" />
            <h1 className="text-3xl font-bold text-gray-900">Conexão WhatsApp</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Configure a conexão do seu WhatsApp para ativar o sistema de fidelidade e atendimento com IA.
          </p>
        </div>

        {/* Status Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Smartphone className="h-5 w-5" />
                <CardTitle>Status da Conexão</CardTitle>
              </div>
              <Badge
              //@ts-expect-error 
                variant={connectionStatus === 'connected' ? 'success' : connectionStatus === 'connecting' ? 'warning' : 'destructive'}
                className={`${
                  connectionStatus === 'connected' ? 'bg-green-100 text-green-800 border-green-200' :
                  connectionStatus === 'connecting' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                  'bg-red-100 text-red-800 border-red-200'
                }`}
              >
                {connectionStatus === 'connected' && <CheckCircle className="h-3 w-3 mr-1" />}
                {connectionStatus === 'connecting' && <Loader2 className="h-3 w-3 mr-1 animate-spin" />}
                {connectionStatus === 'disconnected' && <AlertCircle className="h-3 w-3 mr-1" />}
                {connectionStatus === 'connected' ? 'Conectado' : 
                 connectionStatus === 'connecting' ? 'Conectando...' : 'Desconectado'}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            {connectionStatus === 'connected' ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Número</Label>
                    <p className="text-sm font-mono">{connectionInfo.phoneNumber}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Dispositivo</Label>
                    <p className="text-sm">{connectionInfo.deviceName}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Conectado em</Label>
                    <p className="text-sm">{connectionInfo.connectedAt}</p>
                  </div>
                </div>
                <Separator />
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={disconnect}>
                    Desconectar
                  </Button>
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4 mr-2" />
                    Configurações
                  </Button>
                </div>
              </div>
            ) : (
              <p className="text-gray-600">
                Escolha um método abaixo para conectar seu WhatsApp ao sistema.
              </p>
            )}
          </CardContent>
        </Card>

        {/* Connection Methods */}
        {connectionStatus !== 'connected' && (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="qr-code" className="flex items-center gap-2">
                <QrCode className="h-4 w-4" />
                QR Code
              </TabsTrigger>
              <TabsTrigger value="api-config" className="flex items-center gap-2">
                <Key className="h-4 w-4" />
                API Config
              </TabsTrigger>
            </TabsList>

            <TabsContent value="qr-code" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <QrCode className="h-5 w-5" />
                    Conectar via QR Code
                  </CardTitle>
                  <CardDescription>
                    Escaneie o QR Code com o WhatsApp do seu celular para conectar automaticamente.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {!qrCode ? (
                    <div className="text-center space-y-4">
                      <div className="w-64 h-64 mx-auto bg-gray-100 rounded-lg flex items-center justify-center">
                        <QrCode className="h-16 w-16 text-gray-400" />
                      </div>
                      <Button 
                        onClick={generateQRCode} 
                        disabled={isGeneratingQR}
                        className="w-full max-w-xs mx-auto"
                      >
                        {isGeneratingQR ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Gerando QR Code...
                          </>
                        ) : (
                          <>
                            <QrCode className="h-4 w-4 mr-2" />
                            Gerar QR Code
                          </>
                        )}
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center space-y-4">
                      <div className="w-64 h-64 mx-auto bg-white rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                        {connectionStatus === 'connecting' ? (
                          <div className="text-center space-y-2">
                            <Loader2 className="h-8 w-8 mx-auto animate-spin text-green-600" />
                            <p className="text-sm text-gray-600">Aguardando escaneamento...</p>
                          </div>
                        ) : (
                          <div className="w-full h-full bg-gray-200 rounded flex items-center justify-center">
                            <span className="text-xs text-gray-500">QR Code Preview</span>
                          </div>
                        )}
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-gray-600">
                          1. Abra o WhatsApp no seu celular<br/>
                          2. Toque em "Mais opções" ou "⋯"<br/>
                          3. Selecione "WhatsApp Web"<br/>
                          4. Escaneie este código
                        </p>
                        <Button variant="outline" size="sm" onClick={generateQRCode}>
                          <RefreshCw className="h-4 w-4 mr-2" />
                          Gerar Novo QR
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="api-config" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Key className="h-5 w-5" />
                    Configuração da API
                  </CardTitle>
                  <CardDescription>
                    Configure as credenciais da Evolution API para conectar seu WhatsApp.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="serverUrl">URL do Servidor</Label>
                      <div className="flex gap-2">
                        <Input
                          id="serverUrl"
                          placeholder="https://api.evolution.com"
                          value={apiConfig.serverUrl}
                          onChange={(e) => setApiConfig({...apiConfig, serverUrl: e.target.value})}
                        />
                        <Button variant="outline" size="icon" onClick={() => copyToClipboard(apiConfig.serverUrl)}>
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="apiKey">Chave da API</Label>
                      <div className="flex gap-2">
                        <Input
                          id="apiKey"
                          type="password"
                          placeholder="sua-chave-api-aqui"
                          value={apiConfig.apiKey}
                          onChange={(e) => setApiConfig({...apiConfig, apiKey: e.target.value})}
                        />
                        <Button variant="outline" size="icon" onClick={() => copyToClipboard(apiConfig.apiKey)}>
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="instanceName">Nome da Instância</Label>
                      <Input
                        id="instanceName"
                        placeholder="minha-empresa"
                        value={apiConfig.instanceName}
                        onChange={(e) => setApiConfig({...apiConfig, instanceName: e.target.value})}
                      />
                    </div>
                  </div>

                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Certifique-se de que sua Evolution API está configurada e rodando no servidor especificado.
                    </AlertDescription>
                  </Alert>

                  <Button 
                    onClick={connectWithAPI} 
                    disabled={!apiConfig.serverUrl || !apiConfig.apiKey || !apiConfig.instanceName || connectionStatus === 'connecting'}
                    className="w-full"
                  >
                    {connectionStatus === 'connecting' ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Conectando...
                      </>
                    ) : (
                      <>
                        <Key className="h-4 w-4 mr-2" />
                        Conectar via API
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}

        {/* Help Section */}
        <Card>
          <CardHeader>
            <CardTitle>Precisa de ajuda?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h4 className="font-semibold mb-2">QR Code não funciona?</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Verifique sua conexão com a internet</li>
                  <li>• Certifique-se de estar usando WhatsApp Business</li>
                  <li>• Tente gerar um novo QR Code</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Problemas com a API?</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Verifique se a URL está correta</li>
                  <li>• Confirme se a chave API é válida</li>
                  <li>• Teste a conexão com o servidor</li>
                </ul>
              </div>
            </div>
            <div className="flex gap-2 pt-4 border-t">
              <Button variant="outline" size="sm">
                Ver Documentação
              </Button>
              <Button variant="outline" size="sm">
                Contatar Suporte
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}