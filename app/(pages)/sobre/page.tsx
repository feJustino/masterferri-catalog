import type { NextPage } from 'next';
import Head from 'next/head';

const Sobre: NextPage = () => {
  return (
    <>
      <Head>
        <title>Sobre Nós - MasterFerri</title>
        <meta
          name="description"
          content="Conheça a história da MasterFerri, nossa missão e nosso compromisso com a qualidade em peças automotivas."
        />
      </Head>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Sobre a MasterFerri
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Mais de uma década de experiência no mercado automotivo, sempre com
            foco na qualidade e satisfação do cliente.
          </p>
        </div>

        {/* Company Story */}
        <div className="prose prose-lg prose-gray max-w-none space-y-8">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Nossa História
            </h2>
            <p className="text-gray-600 leading-relaxed">
              A MasterFerri nasceu em 2013 com o objetivo de revolucionar o
              mercado de peças automotivas no Brasil. Fundada por profissionais
              com vasta experiência no setor, a empresa começou como um pequeno
              distribuidor regional e hoje atende clientes em todo o território
              nacional.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Desde o início, nosso compromisso sempre foi oferecer produtos de
              alta qualidade com preços justos, combinando tecnologia moderna
              com atendimento personalizado. Acreditamos que cada cliente merece
              ter acesso às melhores peças para manter seu veículo sempre em
              perfeito estado.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Nossa Missão
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Fornecer peças automotivas de qualidade superior com excelência no
              atendimento, contribuindo para a segurança e performance dos
              veículos de nossos clientes. Buscamos constantemente inovação e
              melhoria contínua em nossos processos para garantir a melhor
              experiência de compra.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Nossos Valores
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Qualidade
                </h3>
                <p className="text-gray-600">
                  Trabalhamos apenas com fornecedores certificados e peças que
                  passam por rigoroso controle de qualidade.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Confiabilidade
                </h3>
                <p className="text-gray-600">
                  Construímos relacionamentos duradouros baseados na
                  transparência e cumprimento de prazos.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Inovação
                </h3>
                <p className="text-gray-600">
                  Investimos em tecnologia para oferecer a melhor experiência de
                  compra online e offline.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Atendimento
                </h3>
                <p className="text-gray-600">
                  Nossa equipe está sempre pronta para orientar e ajudar na
                  escolha da peça ideal.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Por que nos escolher?
            </h2>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <svg
                  className="w-6 h-6 text-primary-600 mt-0.5 mr-3 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Mais de 10.000 peças em estoque para pronta entrega</span>
              </li>
              <li className="flex items-start">
                <svg
                  className="w-6 h-6 text-primary-600 mt-0.5 mr-3 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>
                  Parcerias com as melhores marcas do mercado nacional e
                  internacional
                </span>
              </li>
              <li className="flex items-start">
                <svg
                  className="w-6 h-6 text-primary-600 mt-0.5 mr-3 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>
                  Equipe técnica especializada para orientação na compra
                </span>
              </li>
              <li className="flex items-start">
                <svg
                  className="w-6 h-6 text-primary-600 mt-0.5 mr-3 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>
                  Sistema de logística eficiente com entrega para todo o Brasil
                </span>
              </li>
              <li className="flex items-start">
                <svg
                  className="w-6 h-6 text-primary-600 mt-0.5 mr-3 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Garantia de fábrica em todos os produtos</span>
              </li>
              <li className="flex items-start">
                <svg
                  className="w-6 h-6 text-primary-600 mt-0.5 mr-3 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>
                  Atendimento personalizado via WhatsApp, telefone e e-mail
                </span>
              </li>
            </ul>
          </div>

          <div className="bg-primary-50 p-8 rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 text-center">
              Nosso Compromisso
            </h2>
            <p className="text-gray-600 leading-relaxed text-center">
              Na MasterFerri, cada cliente é único e merece um atendimento
              especial. Nosso compromisso vai além da simples venda de peças -
              queremos ser seu parceiro de confiança na manutenção e cuidado do
              seu veículo. Investimos constantemente em tecnologia, treinamento
              da equipe e melhoria dos processos para garantir que você tenha
              sempre a melhor experiência conosco.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
export default Sobre;
