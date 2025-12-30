"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faQuestionCircle,
  faChevronDown,
  faChevronUp,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { HeaderNavigation } from "@/app/components/header-navigation/header-navigation";
import { FooterSection } from "@/app/components/footer-section/footer-section";

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      category: "Sobre o Plano de Treino",
      questions: [
        {
          question: "Como funciona o plano de treino personalizado?",
          answer:
            "Nosso sistema de IA analisa suas informações (objetivos, experiência, disponibilidade, limitações físicas) e cria um plano de treino único e personalizado para você. O plano inclui exercícios, séries, repetições e progressão semanal adaptados ao seu perfil.",
        },
        {
          question: "O plano é adequado para iniciantes?",
          answer:
            "Sim! Nossa IA cria planos para todos os níveis, desde iniciantes até avançados. Basta informar sua experiência atual no formulário e a IA ajustará o plano de acordo com seu nível.",
        },
        {
          question: "Posso usar o plano na academia ou em casa?",
          answer:
            "Sim! Ao preencher o formulário, você pode indicar onde prefere treinar. A IA criará um plano adaptado ao ambiente escolhido, seja academia, casa ou ambos.",
        },
        {
          question:
            "O plano inclui exercícios para lesões ou limitações físicas?",
          answer:
            "Sim! Durante o cadastro, você pode informar qualquer lesão ou limitação física. A IA considerará essas informações e criará um plano seguro, evitando exercícios que possam agravar sua condição.",
        },
        {
          question: "Quanto tempo leva para receber meu plano?",
          answer:
            "Após completar o cadastro e o pagamento, você recebe seu plano personalizado imediatamente. O processo é totalmente automatizado e instantâneo.",
        },
      ],
    },
    {
      category: "Pagamento",
      questions: [
        {
          question: "Qual é o valor do plano?",
          answer:
            "O plano custa R$ 12,90. É um pagamento único que dá acesso permanente ao seu plano personalizado completo. Não há mensalidades ou renovação automática.",
        },
        {
          question: "Quais formas de pagamento são aceitas?",
          answer:
            "Atualmente aceitamos pagamento via PIX, que oferece aprovação instantânea. Estamos trabalhando para incluir outras formas de pagamento em breve.",
        },
        {
          question: "Preciso pagar mensalmente?",
          answer:
            "Não! O plano é uma compra única de R$ 12,90. Após o pagamento, você tem acesso permanente ao seu plano personalizado, sem necessidade de renovação ou pagamentos adicionais.",
        },
        {
          question: "Posso comprar mais de um plano?",
          answer:
            "Sim! Se você quiser um novo plano personalizado com objetivos diferentes ou informações atualizadas, pode fazer uma nova compra a qualquer momento.",
        },
        {
          question: "O que acontece após o pagamento?",
          answer:
            "Após o pagamento via PIX ser confirmado (aprovação instantânea), você recebe imediatamente o acesso ao seu plano personalizado completo. O acesso é permanente e não expira.",
        },
        {
          question: "É possível solicitar reembolso?",
          answer:
            "Não, não é possível solicitar reembolso em situações normais. Nossos serviços são personalizados e gerados por inteligência artificial. Após a confirmação do pagamento, o valor é imediatamente utilizado para gerar seu treino personalizado exclusivo, adaptado às suas necessidades individuais. Conforme o Código de Defesa do Consumidor (Lei nº 8.078/1990), o direito de arrependimento de 7 dias não se aplica a produtos ou serviços personalizados que são confeccionados de acordo com as especificações do consumidor, pois não podem ser reutilizados ou revendidos a terceiros. No entanto, caso ocorra algum erro na geração do seu plano, faremos o reembolso imediatamente.",
        },
      ],
    },
    {
      category: "Sobre a IA",
      questions: [
        {
          question: "Como a IA cria meu plano?",
          answer:
            "Nossa IA utiliza algoritmos avançados e uma biblioteca com centenas de exercícios diferentes. Ela analisa todas as suas informações (objetivos, experiência, disponibilidade, limitações) e combina exercícios de forma otimizada para criar o plano perfeito para você.",
        },
        {
          question: "A IA ajusta o plano conforme eu evoluo?",
          answer:
            "Atualmente, o plano é gerado uma vez com base nas informações fornecidas. Estamos trabalhando em funcionalidades futuras que permitirão ajustes automáticos conforme seu progresso.",
        },
        {
          question: "Os planos são realmente personalizados?",
          answer:
            "Sim! Cada plano é único. Nossa IA não usa templates ou planos prontos. Cada pessoa recebe um plano criado especificamente para suas necessidades, objetivos e perfil.",
        },
        {
          question: "A IA é baseada em ciência?",
          answer:
            "Sim! Nossos algoritmos são baseados em princípios científicos de treinamento e fisiologia do exercício. A IA foi treinada com conhecimento de profissionais de educação física e ciências do esporte.",
        },
      ],
    },
    {
      category: "Cupons e Influencers",
      questions: [
        {
          question: "Como funcionam os cupons de desconto?",
          answer:
            "Influencers cadastrados recebem um cupom exclusivo que oferece 20% de desconto para seus seguidores. A cada venda realizada com o cupom, o influencer ganha 20% de comissão sobre o valor da compra.",
        },
        {
          question: "Como me torno um influencer parceiro?",
          answer:
            "Basta acessar a página de influencers e preencher o formulário com suas informações. Nossa equipe analisa seu perfil e, após aprovação, você recebe seu cupom exclusivo em até 48 horas.",
        },
        {
          question: "Quanto eu ganho como influencer?",
          answer:
            "Você ganha 20% de comissão sobre cada venda realizada com seu cupom. Por exemplo, se alguém comprar o plano de R$ 12,90 com seu cupom (com desconto de 20%), você ganha R$ 2,06 por venda. Quanto mais vendas, mais você ganha!",
        },
        {
          question: "Como recebo minha comissão?",
          answer:
            "As comissões são pagas a cada 30 dias via PIX para a chave cadastrada no seu painel de influencer. Você pode acompanhar suas vendas e ganhos em tempo real através do painel, e os pagamentos são processados automaticamente no final de cada ciclo de 30 dias.",
        },
        {
          question: "O que acontece com minha comissão se houver reembolso?",
          answer:
            "Caso seja emitido um reembolso para um cliente que utilizou seu cupom, você perderá a comissão referente àquela venda. Isso acontece porque a comissão do influencer é calculada sobre o valor da venda, e se a venda é cancelada através de reembolso, não há valor a ser comissionado. A venda constará como reembolsada no seu histórico e não será contabilizada no pagamento mensal.",
        },
      ],
    },
    {
      category: "Política de Reembolso",
      questions: [
        {
          question: "Por que não é possível solicitar reembolso?",
          answer:
            "Não oferecemos reembolso porque nossos serviços são personalizados e gerados por inteligência artificial. Após a confirmação do pagamento, o valor é imediatamente utilizado para processar seus dados e gerar seu treino personalizado exclusivo, adaptado às suas necessidades, objetivos, experiência e limitações físicas. Uma vez que o serviço foi prestado e o produto personalizado foi gerado, não é possível reverter o processo. No entanto, caso ocorra algum erro na geração do seu plano, faremos o reembolso imediatamente.",
        },
        {
          question: "Qual é a base legal para a política de não reembolso?",
          answer:
            "Conforme o Código de Defesa do Consumidor (Lei nº 8.078/1990), o direito de arrependimento de 7 dias aplica-se a compras realizadas fora do estabelecimento comercial. No entanto, esse direito não é absoluto. O Art. 49 do CDC estabelece exceções, e produtos ou serviços personalizados que são confeccionados de acordo com as especificações do consumidor não estão sujeitos ao direito de arrependimento, pois não podem ser reutilizados ou revendidos a terceiros. Nossos planos de treino são gerados exclusivamente para cada cliente, tornando impossível sua reutilização.",
        },
        {
          question: "O que acontece com meu pagamento após a compra?",
          answer:
            "Seu pagamento é imediatamente utilizado para processar seus dados através de nossa inteligência artificial e gerar seu plano de treino personalizado. O processo é automatizado e ocorre logo após a confirmação do pagamento via PIX. Por isso, não é possível realizar reembolso, pois o serviço já foi prestado e o produto personalizado já foi gerado especificamente para você.",
        },
        {
          question: "E se houver erro na geração do meu plano?",
          answer:
            "Caso ocorra algum erro técnico na geração do seu plano de treino, faremos o reembolso imediatamente. Entre em contato conosco por email informando o problema e nossa equipe verificará a situação. Se confirmarmos que houve um erro na geração do plano, processaremos o reembolso na mesma hora via PIX para a conta de origem do pagamento.",
        },
        {
          question: "E se eu não estiver satisfeito com o plano gerado?",
          answer:
            "Entendemos que cada pessoa tem expectativas diferentes. Se você não estiver satisfeito com seu plano, entre em contato conosco por email. Embora não possamos oferecer reembolso devido à natureza personalizada do serviço (a menos que haja erro na geração), podemos ajudar a ajustar ou esclarecer dúvidas sobre seu plano. Nossa equipe está disponível para auxiliar você a aproveitar ao máximo seu treino personalizado.",
        },
      ],
    },
    {
      category: "Suporte e Dúvidas",
      questions: [
        {
          question: "Como entro em contato com o suporte?",
          answer:
            "O suporte é realizado exclusivamente por email. Entre em contato através do email fornecido no seu plano ou através do email de contato do site. Respondemos em até 24 horas úteis.",
        },
        {
          question: "Posso baixar meu plano em PDF?",
          answer:
            "Sim! Após receber seu plano, você pode baixá-lo em formato PDF diretamente da sua página de treino. Isso permite que você tenha acesso offline ao seu plano.",
        },
        {
          question: "O plano inclui dicas de nutrição?",
          answer:
            "Sim! Seu plano personalizado inclui dicas gerais de nutrição adaptadas aos seus objetivos. No entanto, para um plano nutricional completo e personalizado, recomendamos consultar um nutricionista.",
        },
        {
          question: "Posso compartilhar meu plano com outras pessoas?",
          answer:
            "O plano é personalizado e criado especificamente para você. Embora você possa visualizá-lo, recomendamos que cada pessoa tenha seu próprio plano personalizado, pois as necessidades e objetivos são individuais.",
        },
      ],
    },
  ];

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-900">
      <HeaderNavigation />
      <div className="pt-20 sm:pt-24 md:pt-28 pb-12 sm:pb-16 md:pb-20">
        {/* Hero Section */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16 md:mb-20">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-200 text-purple-700 text-xs font-semibold mb-6">
              <FontAwesomeIcon icon={faQuestionCircle} className="text-xs" />
              <span>Perguntas Frequentes</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4 leading-tight">
              <span className="block text-gray-900">Tire Suas</span>
              <span className="block bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
                Dúvidas
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Encontre respostas para as perguntas mais comuns sobre nosso
              serviço de treino personalizado com IA
            </p>
          </div>
        </div>

        {/* FAQ Sections */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16 md:mb-20">
          <div className="max-w-4xl mx-auto space-y-12">
            {faqs.map((category, categoryIndex) => (
              <div key={categoryIndex} className="space-y-4">
                <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-6">
                  {category.category}
                </h2>
                <div className="space-y-3">
                  {category.questions.map((faq, questionIndex) => {
                    const globalIndex = categoryIndex * 100 + questionIndex;
                    const isOpen = openIndex === globalIndex;

                    return (
                      <div
                        key={questionIndex}
                        className="bg-white border-2 border-gray-200 rounded-xl shadow-lg overflow-hidden transition-all hover:shadow-xl"
                      >
                        <button
                          onClick={() => toggleQuestion(globalIndex)}
                          className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors cursor-pointer"
                        >
                          <span className="text-lg font-bold text-gray-900 flex-1">
                            {faq.question}
                          </span>
                          <FontAwesomeIcon
                            icon={isOpen ? faChevronUp : faChevronDown}
                            className={`text-purple-600 transition-transform flex-shrink-0 ${
                              isOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        {isOpen && (
                          <div className="px-6 pb-5 pt-0 animate-fadeIn">
                            <div className="pt-4 border-t border-gray-200">
                              <p className="text-gray-600 leading-relaxed">
                                {faq.answer}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Still Have Questions Section */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-3xl p-8 sm:p-12 text-center shadow-xl">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <FontAwesomeIcon
                icon={faQuestionCircle}
                className="text-3xl text-white"
              />
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
              Ainda tem dúvidas?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Não encontrou a resposta que procurava? Entre em contato conosco e
              nossa equipe terá prazer em ajudar você.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 rounded-lg text-white font-bold text-lg hover:shadow-xl hover:shadow-purple-500/50 transition-all transform hover:scale-105 cursor-pointer"
              >
                <span>Criar Meu Plano</span>
                <FontAwesomeIcon icon={faCheckCircle} className="text-base" />
              </Link>
              <Link
                href="/how-it-works"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-purple-200 rounded-lg text-purple-600 font-bold text-lg hover:bg-purple-50 transition-all transform hover:scale-105 cursor-pointer"
              >
                <span>Como Funciona</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <FooterSection />
    </div>
  );
}
