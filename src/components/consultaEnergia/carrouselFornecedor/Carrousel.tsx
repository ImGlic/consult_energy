import React, { useState, useEffect } from "react";
import { Fornecedor } from "../Consulta";
import { useSpring, animated } from '@react-spring/web';

// Importe o ícone do WhatsApp
import whatsappIcon from "../../../assets/whatsapp-icon.png"; 

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
  const [imageCache, setImageCache] = useState<Map<string, string>>(new Map());

  const qtdItensPagina = 2;
  const totalItens = fornecedores.length;
  const totalPages = Math.ceil(totalItens / qtdItensPagina);

  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = fornecedores.map(async (fornecedor) => {
        if (!imageCache.has(fornecedor.logo)) {
          try {
            const image = await import(`../../../assets/${fornecedor.logo}`);
            imageCache.set(fornecedor.logo, image.default);
          } catch (error) {
            console.error(`Erro ao carregar imagem: ${fornecedor.logo}`, error);
            imageCache.set(fornecedor.logo, '');
          }
        }
      });
      await Promise.all(imagePromises);
      setImageCache(new Map(imageCache)); 
    };

    preloadImages();
  }, [fornecedores, imageCache]);

  const getImageUrl = (logo: string) => {
    return imageCache.get(logo) || ''; 
  };

  useEffect(() => {
    setAnimationProps({ opacity: 1, transform: 'translateX(0%)' });
  }, [currentIndex, setAnimationProps]);

  const handlePrev = () => {
    setAnimationProps({ opacity: 0, transform: 'translateX(-100%)' });
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? totalItens - qtdItensPagina : prevIndex - qtdItensPagina
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
                {displayedFornecedores.map((fornecedor) => (
                  <div
                    key={fornecedor.nome}
                    className="text-center text-white mx-2 flex-shrink-0 bg-gray-900 rounded-lg shadow-lg p-4"
                    style={{ width: `calc(100% / ${qtdItensPagina})` }}
                  >
                    <div className="flex justify-center mb-4">
                      <img
                        src={getImageUrl(fornecedor.logo)}
                        alt={fornecedor.nome}
                        className="max-w-full h-auto"
                        style={{ maxHeight: '100px', objectFit: 'contain' }}
                      />
                    </div>
                    <h3 className="text-xl font-semibold">{fornecedor.nome}</h3>
                    <p>{fornecedor.estado}</p>
                    <p>R${fornecedor.custo_por_kwh.toFixed(2)}/kWh</p>
                    <div className="flex items-center justify-center mt-4">
                      <img
                        src={whatsappIcon}
                        alt="WhatsApp"
                        className="w-6 h-6 mr-2"
                      />
                      <span>Entrar em contato</span>
                    </div>
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

          <div className="text-center text-white mt-4">
            Página {currentPage} de {totalPages}
          </div>
        </>
      )}
    </div>
  );
};

export default CarrosselFornecedor;