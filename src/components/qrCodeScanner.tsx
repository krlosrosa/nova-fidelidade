"use client";

import { Html5QrcodeScanner } from "html5-qrcode";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

type Props = {
  setText: Dispatch<SetStateAction<string>>;
  showScanner: Dispatch<SetStateAction<boolean>>;
};

const QrScanner = ({ setText, showScanner }: Props) => {
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [error, setError] = useState<string>("");

  // Solicita permissão da câmera assim que o componente monta
  useEffect(() => {
    const requestCameraPermission = async () => {
      try {
        // Solicita permissão explícita para a câmera
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { 
            facingMode: 'environment' // Prefere câmera traseira
          } 
        });
        
        // Para o stream imediatamente após obter permissão
        stream.getTracks().forEach(track => track.stop());
        setPermissionGranted(true);
      } catch (err) {
        console.error("Erro ao solicitar permissão da câmera:", err);
        setError("Permissão da câmera negada. Por favor, permita o acesso à câmera.");
      }
    };

    requestCameraPermission();
  }, []);

  useEffect(() => {
    // Só inicia o scanner após obter permissão
    if (!permissionGranted) return;

    const scanner = new Html5QrcodeScanner(
      "qr-reader",
      { 
        fps: 10, 
        qrbox: 250,
        // Configurações para melhorar a experiência
        rememberLastUsedCamera: true, // Lembra da última câmera usada
        supportedScanTypes: [], // Usa configuração padrão (QR codes)
        showTorchButtonIfSupported: true, // Mostra botão da lanterna se disponível
        showZoomSliderIfSupported: true, // Mostra controle de zoom se disponível
        defaultZoomValueIfSupported: 1, // Zoom padrão
        // Prefere câmera traseira
        videoConstraints: {
          facingMode: 'environment'
        }
      },
      false
    );

    const onSuccess = (decodedText: string) => {
      setText(decodedText);
      showScanner(false);
      scanner.clear().catch((error) => {
        console.error("Erro ao limpar scanner após leitura:", error);
      });
    };

    const onError = (error: any) => {
      // Só mostra erros relevantes, não os de "QR code não encontrado"
      if (!error.toString().includes('No MultiFormat Readers') && 
          !error.toString().includes('NotFoundException')) {
        console.warn("Erro do scanner:", error);
      }
    };

    scanner.render(onSuccess, onError);

    return () => {
      scanner.clear().catch((error) => {
        console.error("Erro ao limpar scanner:", error);
      });
    };
  }, [setText, showScanner, permissionGranted]);

  if (error) {
    return (
      <div className="p-4">
        <h1 className="text-xl font-bold mb-4 text-red-600">Erro de Permissão</h1>
        <p className="text-red-500 mb-4">{error}</p>
        <p className="text-sm text-gray-600">
          Para usar o scanner QR, você precisa permitir o acesso à câmera. 
          Verifique as configurações do seu navegador e recarregue a página.
        </p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Recarregar Página
        </button>
      </div>
    );
  }

  if (!permissionGranted) {
    return (
      <div className="p-4">
        <h1 className="text-xl font-bold mb-4">Ler QR Code</h1>
        <p className="text-gray-600">Solicitando permissão da câmera...</p>
        <div className="mt-4 flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Ler QR Code</h1>
      <div id="qr-reader" className="w-full" />
      <div className="mt-4 text-sm text-gray-600">
        <p>💡 Dicas:</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Mantenha o QR code bem iluminado</li>
          <li>Posicione o código no centro da tela</li>
          <li>Use a lanterna se disponível em ambientes escuros</li>
        </ul>
      </div>
    </div>
  );
};

export default QrScanner;