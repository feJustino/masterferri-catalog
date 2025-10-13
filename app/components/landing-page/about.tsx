import { Link } from 'lucide-react';
import Image from 'next/image';

export default function About() {
  return (
    <section className="py-16 bg-gray-150 shadow-xl rounded-xl my-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Sobre a MasterFerri
            </h2>
            <div className="space-y-4 text-gray-600">
              <p>
                A MasterFerri é uma empresa especializada em peças automotivas,
                com mais de uma década de experiência no mercado brasileiro.
                Nosso compromisso é oferecer produtos de alta qualidade com
                preços justos e atendimento diferenciado.
              </p>
              <p>
                Trabalhamos com as melhores marcas do mercado e mantemos um
                estoque sempre atualizado para atender às necessidades dos
                nossos clientes com agilidade e eficiência.
              </p>
              <p>
                Nossa equipe técnica está sempre pronta para ajudar na escolha
                da peça ideal para seu veículo, garantindo compatibilidade e
                performance.
              </p>
            </div>
            <div className="mt-8">
              <Link href="/sobre">
                <button className="btn-secondary">Saiba Mais</button>
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
              <Image
                src="/workshop.png"
                alt="Oficina automotiva"
                fill
                className="object-fill"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
