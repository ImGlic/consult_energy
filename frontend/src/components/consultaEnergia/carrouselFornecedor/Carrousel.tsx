import React, { useState, useEffect } from "react";
import { Fornecedor } from "../Consulta";
import { useSpring, animated } from '@react-spring/web';
import { FaWhatsapp, FaStar } from 'react-icons/fa';

interface CarrosselFornecedorProps {
  fornecedores: Fornecedor[];
}

const CarrosselFornecedor: React.FC<CarrosselFornecedorProps> = ({ fornecedores }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animationProps, setAnimationProps] = useSpring(() => ({
    opacity: 1,
    transform: 'translateX(0%)',
    config: { tension: 300, friction: 30 },
  }));

  const [qtdItensPagina, setQtdItensPagina] = useState(2);
  const [isLargeScreen, setIsLargeScreen] = useState<boolean>(window.innerWidth >= 960);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 960) {
        setQtdItensPagina(1);
        setIsLargeScreen(false);
      } else {
        setQtdItensPagina(2);
        setIsLargeScreen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); 

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const totalItens = fornecedores.length;
  const totalPages = Math.ceil(totalItens / qtdItensPagina);

  useEffect(() => {
    setAnimationProps({ opacity: 1, transform: 'translateX(0%)' });
  }, [currentIndex, setAnimationProps]);

  const handlePrev = () => {
    setAnimationProps({ opacity: 0, transform: 'translateX(-100%)' });
    setTimeout(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === 0 ? Math.max(totalItens - qtdItensPagina, 0) : prevIndex - qtdItensPagina
      );
      setAnimationProps({ opacity: 1, transform: 'translateX(0%)' });
    }, 300);
  };

  const handleNext = () => {
    setAnimationProps({ opacity: 0, transform: 'translateX(100%)' });
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex + qtdItensPagina >= totalItens
          ? 0
          : prevIndex + qtdItensPagina
      );
      setAnimationProps({ opacity: 1, transform: 'translateX(0%)' });
    }, 300);
  };

  const displayedFornecedores = fornecedores.slice(
    currentIndex,
    currentIndex + qtdItensPagina
  );

  const currentPage = Math.floor(currentIndex / qtdItensPagina) + 1;

  const renderStars = (avaliacao_media: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar
          key={i}
          className={`w-4 h-4 ${i <= avaliacao_media ? 'text-yellow-400' : 'text-gray-400'}`}
        />
      );
    }
    return stars;
  };

  return (
    <div className="relative w-full max-w-full mx-auto rounded-xl p-4">
      {fornecedores.length > 0 && (
        <>
          <div className="flex items-center justify-between">
            {totalPages > 1 && (
              <button
                className="text-white bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-l-xl mr-2"
                onClick={handlePrev}
                disabled={currentIndex === 0}
              >
                {"<"}
              </button>
            )}

            <div className="flex w-full overflow-hidden">
              <animated.div
                className="flex w-full"
                style={animationProps}
              >
                {displayedFornecedores.map((fornecedor, index) => (
                  <div
                    key={fornecedor.nome}
                    className={`text-center text-white mx-2 flex-shrink-0 bg-gray-900 rounded-lg shadow-lg p-4 content-evenly ${
                      index !== displayedFornecedores.length - 1 ? 'mr-4' : ''
                    }`}
                    style={{ width: `calc(100% / ${qtdItensPagina} - 16px)` }} 
                  >
                    <div className="flex flex-col justify-center mb-2">
                      <p className="text-lg font-semibold mb-1">{fornecedor.avaliacao_media.toFixed(1)}</p>
                      <div className="flex justify-center mb-2">
                        {renderStars(fornecedor.avaliacao_media)}
                      </div>
                    </div>
                    <div className="flex justify-center mb-4">
                      <img
                        src={fornecedor.logo}
                        alt={fornecedor.nome}
                        className="max-w-full h-auto"
                        style={{ maxHeight: '100px', objectFit: 'contain' }}
                      />
                    </div>
                    <h3 className="text-xl font-semibold">{fornecedor.nome}</h3>
                    <p>{fornecedor.estado}</p>
                    <p>R${fornecedor.custo_por_kwh.toFixed(2)}/kWh</p>
                    <p>Limite min:{fornecedor.limite_minimo_kwh}/kWh</p>
                    <a
                      href={`https://wa.me/${fornecedor.telefone}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center mt-4 bg-green-500 text-white py-2 px-4 rounded-lg hover:text-[#383131]"
                    >
                      <FaWhatsapp className="w-6 h-6 mr-2" />
                      <span className="hover:text-[#383131]">Entrar em contato</span>
                    </a>
                  </div>
                ))}
              </animated.div>
            </div>

            {totalPages > 1 && (
              <button
                className="text-white bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-r-xl ml-2"
                onClick={handleNext}
                disabled={currentIndex + qtdItensPagina >= totalItens}
              >
                {">"}
              </button>
            )}
          </div>

          {isLargeScreen && (
            <div className="text-center text-white mt-4">
              Página {currentPage} de {totalPages}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CarrosselFornecedor;
