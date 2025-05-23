"use client";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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
  Settings,
  Building2,
  Zap,
  Info,
} from "lucide-react";

export default function WhatsAppConnection() {
  const [connectionStatus, setConnectionStatus] = useState("disconnected"); // disconnected, connecting, connected
  const [activeTab, setActiveTab] = useState("official-api");
  const [connectionType, setConnectionType] = useState(""); // 'official' or 'evolution'
  const [qrCode, setQrCode] = useState("");
  const [isGeneratingQR, setIsGeneratingQR] = useState(false);

  // Configurações API Oficial WhatsApp Business
  const [officialApiConfig, setOfficialApiConfig] = useState({
    accessToken: "",
    phoneNumberId: "",
    businessAccountId: "",
    webhookVerifyToken: "",
  });

  // Configurações Evolution API
  const [evolutionApiConfig, setEvolutionApiConfig] = useState({
    serverUrl: "",
    apiKey: "",
    instanceName: "",
  });

  const [connectionInfo, setConnectionInfo] = useState({
    phoneNumber: "",
    apiType: "",
    connectedAt: "",
  });

  // Conectar com API Oficial do WhatsApp Business
  const connectWithOfficialAPI = async () => {
    if (
      !officialApiConfig.accessToken ||
      !officialApiConfig.phoneNumberId ||
      !officialApiConfig.businessAccountId
    ) {
      return;
    }

    setConnectionStatus("connecting");
    setConnectionType("official");

    // Simular conexão via API Oficial
    setTimeout(() => {
      setConnectionStatus("connected");
      setConnectionInfo({
        phoneNumber: "+55 11 99999-9999",
        apiType: "WhatsApp Business API (Oficial)",
        connectedAt: new Date().toLocaleString("pt-BR"),
      });
    }, 3000);
  };

  // Gerar QR Code para Evolution API
  const generateQRCode = async () => {
    if (
      !evolutionApiConfig.serverUrl ||
      !evolutionApiConfig.apiKey ||
      !evolutionApiConfig.instanceName
    ) {
      return;
    }

    setIsGeneratingQR(true);
    setConnectionStatus("connecting");
    setConnectionType("evolution");

    // Simular chamada para Evolution API gerar QR
    setTimeout(() => {
      setQrCode(
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="
      );
      setIsGeneratingQR(false);
    }, 2000);

    // Simular conexão após escaneamento do QR (10 segundos)
    setTimeout(() => {
      setConnectionStatus("connected");
      setConnectionInfo({
        phoneNumber: "+55 11 99999-9999",
        apiType: "Evolution API (WhatsApp Web)",
        connectedAt: new Date().toLocaleString("pt-BR"),
      });
    }, 10000);
  };

  const disconnect = () => {
    setConnectionStatus("disconnected");
    setConnectionType("");
    setQrCode("");
    setConnectionInfo({
      phoneNumber: "",
      apiType: "",
      connectedAt: "",
    });
  };

  const copyToClipboard = (text: any) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 p-4">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 mb-4">
            <MessageSquare className="h-8 w-8 text-green-600" />
            <h1 className="text-3xl font-bold text-gray-900">
              Conexão WhatsApp
            </h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Configure a conexão do seu WhatsApp para ativar o sistema de
            fidelidade e atendimento com IA. Escolha entre a API Oficial do
            WhatsApp Business ou Evolution API.
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
              <div className="flex items-center gap-2">
                {connectionStatus === "connected" && (
                  <Badge
                    variant="outline"
                    className="bg-gray-100 text-gray-800 border-gray-200"
                  >
                    {connectionType === "official" ? (
                      <span className="flex items-center">
                        <Building2 className="h-3 w-3 mr-1 text-blue-600" />
                        API Oficial
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <Zap className="h-3 w-3 mr-1 text-green-600" />
                        Evolution API
                      </span>
                    )}
                  </Badge>
                )}
                <Badge
                  //@ts-expect-error
                  variant={
                    connectionStatus === "connected"
                      ? "success"
                      : connectionStatus === "connecting"
                      ? "warning"
                      : "destructive"
                  }
                  className={`${
                    connectionStatus === "connected"
                      ? "bg-green-100 text-green-800 border-green-200"
                      : connectionStatus === "connecting"
                      ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                      : "bg-red-100 text-red-800 border-red-200"
                  }`}
                >
                  {connectionStatus === "connected" && (
                    <CheckCircle className="h-3 w-3 mr-1" />
                  )}
                  {connectionStatus === "connecting" && (
                    <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                  )}
                  {connectionStatus === "disconnected" && (
                    <AlertCircle className="h-3 w-3 mr-1" />
                  )}
                  {connectionStatus === "connected"
                    ? "Conectado"
                    : connectionStatus === "connecting"
                    ? "Conectando..."
                    : "Desconectado"}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {connectionStatus === "connected" ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">
                      Número
                    </Label>
                    <p className="text-sm font-mono">
                      {connectionInfo.phoneNumber}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">
                      Tipo de API
                    </Label>
                    <p className="text-sm">{connectionInfo.apiType}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">
                      Conectado em
                    </Label>
                    <p className="text-sm">{connectionInfo.connectedAt}</p>
                  </div>
                </div>
                <Separator />
                <div className="flex gap-2">
                  <Button variant="destructive" size="sm" onClick={disconnect}>
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
                Escolha o método de conexão abaixo para integrar seu WhatsApp ao
                sistema.
              </p>
            )}
          </CardContent>
        </Card>

        {/* Connection Methods */}
        {connectionStatus !== "connected" && (
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger
                value="official-api"
                className="flex items-center gap-2"
              >
                <Building2 className="h-4 w-4" />
                API Oficial
                <Badge
                  variant="outline"
                  className="ml-1 bg-blue-50 text-blue-700 border-blue-200 text-xs"
                >
                  Meta
                </Badge>
              </TabsTrigger>
              <TabsTrigger
                value="evolution-api"
                className="flex items-center gap-2"
              >
                <QrCode className="h-4 w-4" />
                Evolution API
                <Badge
                  variant="outline"
                  className="ml-1 bg-green-50 text-green-700 border-green-200 text-xs"
                >
                  QR Code
                </Badge>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="official-api" className="space-y-4 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Key className="h-5 w-5 text-blue-600" />
                    WhatsApp Business API (Oficial)
                  </CardTitle>
                  <CardDescription>
                    Para empresas que precisam de alta escala e recursos
                    avançados. Requer aprovação do Meta.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="accessToken">Access Token *</Label>
                      <div className="flex gap-2">
                        <Input
                          id="accessToken"
                          type="password"
                          placeholder="EAAxxxxxxxxx..."
                          value={officialApiConfig.accessToken}
                          onChange={(e) =>
                            setOfficialApiConfig({
                              ...officialApiConfig,
                              accessToken: e.target.value,
                            })
                          }
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() =>
                            copyToClipboard(officialApiConfig.accessToken)
                          }
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phoneNumberId">Phone Number ID *</Label>
                      <Input
                        id="phoneNumberId"
                        placeholder="123456789012345"
                        value={officialApiConfig.phoneNumberId}
                        onChange={(e) =>
                          setOfficialApiConfig({
                            ...officialApiConfig,
                            phoneNumberId: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="businessAccountId">
                        Business Account ID *
                      </Label>
                      <Input
                        id="businessAccountId"
                        placeholder="123456789012345"
                        value={officialApiConfig.businessAccountId}
                        onChange={(e) =>
                          setOfficialApiConfig({
                            ...officialApiConfig,
                            businessAccountId: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="webhookVerifyToken">
                        Webhook Verify Token
                      </Label>
                      <Input
                        id="webhookVerifyToken"
                        placeholder="seu-token-verificacao"
                        value={officialApiConfig.webhookVerifyToken}
                        onChange={(e) =>
                          setOfficialApiConfig({
                            ...officialApiConfig,
                            webhookVerifyToken: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertDescription>
                      A API oficial requer aprovação do Meta e configuração no
                      Facebook Developer Console.
                      <a
                        href="#"
                        className="text-blue-600 hover:underline ml-1"
                      >
                        Saiba como configurar
                      </a>
                    </AlertDescription>
                  </Alert>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <h4 className="font-semibold mb-2 text-green-700">
                        ✅ Vantagens
                      </h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Recursos empresariais completos</li>
                        <li>• Suporte oficial do Meta</li>
                        <li>• Alta disponibilidade e confiabilidade</li>
                        <li>• Webhooks nativos</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2 text-red-700">
                        ❌ Requisitos
                      </h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Aprovação do Meta necessária</li>
                        <li>• Configuração técnica avançada</li>
                        <li>• Custos mensais da plataforma</li>
                        <li>• Processo de verificação</li>
                      </ul>
                    </div>
                  </div>

                  <Button
                    onClick={connectWithOfficialAPI}
                    disabled={
                      !officialApiConfig.accessToken ||
                      !officialApiConfig.phoneNumberId ||
                      !officialApiConfig.businessAccountId ||
                      (connectionStatus === "connecting" &&
                        connectionType === "official")
                    }
                    className="w-full"
                    size="lg"
                  >
                    {connectionStatus === "connecting" &&
                    connectionType === "official" ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Conectando com Meta...
                      </>
                    ) : (
                      <>
                        <Key className="h-4 w-4 mr-2" />
                        Conectar API Oficial
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="evolution-api" className="space-y-4 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <QrCode className="h-5 w-5 text-green-600" />
                    Evolution API
                  </CardTitle>
                  <CardDescription>
                    Solução não-oficial que funciona via WhatsApp Web.
                    Configuração rápida com QR Code.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="evolutionServerUrl">
                        URL do Servidor *
                      </Label>
                      <Input
                        id="evolutionServerUrl"
                        placeholder="https://evolution.seuservidor.com"
                        value={evolutionApiConfig.serverUrl}
                        onChange={(e) =>
                          setEvolutionApiConfig({
                            ...evolutionApiConfig,
                            serverUrl: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="evolutionApiKey">API Key *</Label>
                      <div className="flex gap-2">
                        <Input
                          id="evolutionApiKey"
                          type="password"
                          placeholder="sua-api-key-evolution"
                          value={evolutionApiConfig.apiKey}
                          onChange={(e) =>
                            setEvolutionApiConfig({
                              ...evolutionApiConfig,
                              apiKey: e.target.value,
                            })
                          }
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() =>
                            copyToClipboard(evolutionApiConfig.apiKey)
                          }
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="evolutionInstanceName">
                        Nome da Instância *
                      </Label>
                      <Input
                        id="evolutionInstanceName"
                        placeholder="minha-empresa"
                        value={evolutionApiConfig.instanceName}
                        onChange={(e) =>
                          setEvolutionApiConfig({
                            ...evolutionApiConfig,
                            instanceName: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  {!qrCode ? (
                    <div className="space-y-4">
                      <Alert>
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                          Configure os dados acima e clique para gerar o QR Code
                          que deve ser escaneado pelo WhatsApp.
                        </AlertDescription>
                      </Alert>

                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <h4 className="font-semibold mb-2 text-green-700">
                            ✅ Vantagens
                          </h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Configuração em minutos</li>
                            <li>• Sem aprovação necessária</li>
                            <li>• Funciona imediatamente</li>
                            <li>• Custo-benefício excelente</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2 text-amber-700">
                            ⚠️ Considerações
                          </h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Não é oficial do Meta</li>
                            <li>• Depende do WhatsApp Web</li>
                            <li>• Requer servidor próprio</li>
                            <li>• Possível instabilidade</li>
                          </ul>
                        </div>
                      </div>

                      <Button
                        onClick={generateQRCode}
                        disabled={
                          !evolutionApiConfig.serverUrl ||
                          !evolutionApiConfig.apiKey ||
                          !evolutionApiConfig.instanceName ||
                          isGeneratingQR
                        }
                        className="w-full"
                        size="lg"
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
                    <div className="space-y-4">
                      <div className="flex flex-col md:flex-row gap-6 items-center">
                        <div className="text-center">
                          <div className="w-64 h-64 bg-white rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                            {connectionStatus === "connecting" &&
                            connectionType === "evolution" ? (
                              <div className="text-center space-y-2">
                                <div className="w-full h-full bg-gray-100 rounded flex items-center justify-center">
                                  <div className="text-center">
                                    <QrCode className="h-16 w-16 mx-auto mb-2 text-gray-400" />
                                    <p className="text-sm text-gray-500">
                                      QR Code Evolution
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div className="w-full h-full bg-gray-200 rounded flex items-center justify-center">
                                <span className="text-sm text-gray-500">
                                  QR Code Preview
                                </span>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex-1 space-y-4">
                          {connectionStatus === "connecting" &&
                            connectionType === "evolution" && (
                              <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                  <Loader2 className="h-5 w-5 animate-spin text-green-600" />
                                  <span className="text-lg font-medium text-green-600">
                                    Aguardando escaneamento...
                                  </span>
                                </div>
                                <div className="space-y-2 text-sm text-gray-600">
                                  <p className="font-medium">Como escanear:</p>
                                  <ol className="list-decimal list-inside space-y-1">
                                    <li>Abra o WhatsApp no seu celular</li>
                                    <li>
                                      Toque em "Mais opções" (⋯) ou "Menu"
                                    </li>
                                    <li>Selecione "WhatsApp Web"</li>
                                    <li>Toque em "Escanear código"</li>
                                    <li>Aponte a câmera para este QR Code</li>
                                  </ol>
                                </div>
                              </div>
                            )}

                          <Button
                            variant="outline"
                            onClick={generateQRCode}
                            className="w-full"
                          >
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Gerar Novo QR Code
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
}
