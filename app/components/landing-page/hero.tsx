import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen bg-[url('/hero.jpg')] bg-cover bg-center bg-blend-overlay bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-cover bg-center rounded-lg shadow-lg  m-auto">
        <div className="text-center bg-gray-200/50 py-2 rounded-xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Peças Automotivas
            <span className="block text-secondary-500">de Qualidade</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Encontre as melhores peças para seu veículo com qualidade garantida
            e preços competitivos. Entrega rápida para todo o Brasil.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/catalogo">
              <button className="bg-secondary-500 text-primary-600 hover:bg-secondary-600 font-semibold py-3 px-8 rounded-lg text-lg transition-colors">
                Ver Catálogo
              </button>
            </Link>
            <Link href="/contato">
              <button className="border-2 border-secondary-500 text-secondary-500 hover:bg-secondary-500 hover:text-primary-600 font-semibold py-3 px-8 rounded-lg text-lg transition-colors">
                Fale Conosco
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
