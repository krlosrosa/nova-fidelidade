'use client'
import React, { useState } from 'react';
import { Wheel } from 'react-custom-roulette';

const PremiosBarbearia = () => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [premioGanho, setPremioGanho] = useState<string | null>(null); // Correção aqui
  const [mostrarPremio, setMostrarPremio] = useState(false);

  const data = [
    { option: 'Corte Grátis', style: { backgroundColor: '#1E3A8A', textColor: 'white' } },
    { option: 'Barba Grátis', style: { backgroundColor: '#1E40AF', textColor: 'white' } },
    { option: '10% Desconto', style: { backgroundColor: '#1E3A8A', textColor: 'white' } },
    { option: 'Produto Gratis', style: { backgroundColor: '#1E40AF', textColor: 'white' } },
    { option: 'Corte + Barba', style: { backgroundColor: '#1E3A8A', textColor: 'white' } },
    { option: '25% Desconto', style: { backgroundColor: '#1E40AF', textColor: 'white' } },
    { option: 'Kit Completo', style: { backgroundColor: '#1E3A8A', textColor: 'white' } },
    { option: 'Gire Novamente', style: { backgroundColor: '#1E40AF', textColor: 'white' } },
  ];

  const handleSpinClick = () => {
    if (!mustSpin) {
      const newPrizeNumber = Math.floor(Math.random() * data.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
      setMostrarPremio(false);
    }
  };

  const onStopSpinning = () => {
    setMustSpin(false);
    setPremioGanho(data[prizeNumber].option); // Agora isso vai funcionar
    setMostrarPremio(true);
  };
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-blue-900 mb-2">Barbearia Estilo Clássico</h1>
        <h2 className="text-2xl font-semibold text-blue-800">Roleta de Prêmios</h2>
        <p className="text-gray-600 mt-2">Gire a roleta e ganhe prêmios especiais!</p>
      </header>

      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
        <div className="mb-8 flex justify-center">
          <Wheel
            mustStartSpinning={mustSpin}
            prizeNumber={prizeNumber}
            data={data}
            onStopSpinning={onStopSpinning}
            backgroundColors={['#1E3A8A', '#1E40AF']}
            textColors={['#ffffff']}
            outerBorderColor="#1E3A8A"
            outerBorderWidth={10}
            innerBorderColor="#1E3A8A"
            radiusLineColor="#1E3A8A"
            radiusLineWidth={2}
            spinDuration={0.5}
            fontSize={16}
          />
        </div>

        <button
          onClick={handleSpinClick}
          disabled={mustSpin}
          className={`w-full py-3 px-4 rounded-lg font-bold text-white transition-colors ${mustSpin ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-900 hover:bg-blue-800'}`}
        >
          {mustSpin ? 'Girando...' : 'Girar Roleta'}
        </button>

        {mostrarPremio && (
          <div className="mt-6 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 rounded">
            <p className="font-bold">Parabéns!</p>
            <p>Você ganhou: <span className="font-bold">{premioGanho}</span></p>
            <p className="mt-2 text-sm">Apresente esta mensagem na barbearia para resgatar seu prêmio.</p>
          </div>
        )}

        <div className="mt-8 border-t pt-4">
          <h3 className="font-bold text-blue-900 mb-2">Termos e Condições:</h3>
          <ul className="text-xs text-gray-600 list-disc pl-5 space-y-1">
            <li>Válido apenas para clientes que realizarem serviço na barbearia</li>
            <li>Prêmios não cumulativos</li>
            <li>Válido por 30 dias após o sorteio</li>
            <li>Limitado a um prêmio por cliente por mês</li>
          </ul>
        </div>
      </div>

      <footer className="mt-8 text-center text-gray-500 text-sm">
        <p>Barbearia Estilo Clássico © {new Date().getFullYear()}</p>
        <p>Rua do Corte, 123 - Centro</p>
      </footer>
    </div>
  );
};

export default PremiosBarbearia;