"use client";

import { Html5QrcodeScanner } from "html5-qrcode";
import { Dispatch, SetStateAction, useEffect } from "react";

type Props = {
  setText: Dispatch<SetStateAction<string>>;
  showScanner: Dispatch<SetStateAction<boolean>>;
};

const QrScanner = ({ setText, showScanner }: Props) => {
  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "qr-reader",
      { fps: 10, qrbox: 250 },
      false
    );

    const onSuccess = (decodedText: string) => {
      setText(decodedText);
      showScanner(false)
      scanner.clear().catch((error) => {
        console.error("Erro ao limpar scanner após leitura:", error);
      });
    };

    const onError = (error: any) => {
      console.warn("Erro (ignorar se for 'no QR code found'):", error);
    };

    scanner.render(onSuccess, onError);

    return () => {
      scanner.clear().catch((error) => {
        console.error("Erro ao limpar scanner:", error);
      });
    };
  }, [setText]);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Ler QR Code</h1>
      <div id="qr-reader" className="w-full" />
    </div>
  );
};

export default QrScanner;
