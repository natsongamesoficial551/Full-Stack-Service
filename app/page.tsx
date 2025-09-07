import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  CheckCircle,
  Code,
  Globe,
  Zap,
  Star,
  ArrowRight,
  Instagram,
  Youtube,
  MessageCircle,
  Linkedin,
  Phone,
} from "lucide-react"

export default function NatanDevWebsite() {
  const plans = [
    {
      name: "Gratuito",
      price: "R$ 0",
      period: "/único",
      description: "Desenvolvimento gratuito com feedback obrigatório",
      features: [
        "Site básico responsivo",
        "Design simples e limpo",
        "Feedback obrigatório",
        "Suporte por WhatsApp",
        "Entrega em 7 dias",
      ],
      popular: false,
      link: "https://w.app/hicagq",
      gradient: "from-slate-800 to-slate-900",
    },
    {
      name: "Básico",
      price: "R$ 134,99",
      period: "/único",
      monthly: "R$ 18,32/mês",
      description: "Solução completa para pequenos negócios",
      features: [
        "Site profissional responsivo",
        "Design personalizado",
        "Otimização SEO básica",
        "Formulário de contato",
        "Suporte por 30 dias",
        "Entrega em 5 dias",
      ],
      popular: false,
      link: "https://w.app/sldc02",
      gradient: "from-yellow-600/20 to-yellow-700/20",
    },
    {
      name: "Premium",
      price: "R$ 179,99",
      period: "/único",
      monthly: "R$ 18,32/mês",
      description: "Para empresas que querem se destacar",
      features: [
        "Site premium responsivo",
        "Design exclusivo e moderno",
        "Otimização SEO avançada",
        "Integração com redes sociais",
        "Painel administrativo",
        "Suporte por 60 dias",
        "Entrega em 4 dias",
      ],
      popular: true,
      link: "https://w.app/zxjuck",
      gradient: "from-yellow-500/30 to-yellow-600/30",
    },
    {
      name: "Developer",
      price: "R$ 265,99",
      period: "/único",
      monthly: "R$ 46,32/mês",
      description: "Solução completa para desenvolvedores",
      features: [
        "Aplicação web completa",
        "Backend personalizado",
        "Banco de dados integrado",
        "API REST personalizada",
        "Dashboard administrativo",
        "Deploy automático",
        "Suporte por 90 dias",
        "Entrega em 3 dias",
      ],
      popular: false,
      link: "https://w.app/hbyork",
      gradient: "from-yellow-400/40 to-yellow-500/40",
    },
  ]

  const socialLinks = [
    { name: "Instagram", icon: Instagram, url: "https://www.instagram.com/nborges.ofc/" },
    { name: "Portfólio", icon: Globe, url: "https://natandev02.netlify.app/" },
    { name: "YouTube", icon: Youtube, url: "https://www.youtube.com/@natsongames498" },
    { name: "Discord", icon: MessageCircle, url: "#" },
    { name: "LinkedIn", icon: Linkedin, url: "#" },
    { name: "WhatsApp", icon: Phone, url: "https://wa.me/5521992826074" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-black/80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                <Code className="w-6 h-6 text-black" />{" "}
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">NATANDEV</h1>{" "}
                <p className="text-sm text-gray-300">Full-Stack Services</p> {/* Fixed text color to light gray */}
              </div>
            </div>
            <Button className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-white font-semibold px-6">
              <a href="#planos">Começar Projeto</a>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge className="mb-6 bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 text-yellow-400 border-yellow-500/30">
            ✨ Desenvolvedor Full-Stack Especializado
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="text-white">Transforme Sua Ideia em</span>
            <br />
            <span className="text-yellow-400">Realidade Digital</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Desenvolvimento completo de sites e aplicações web com tecnologia de ponta. Criação manual da estrutura,
            inovação com IA e revisão detalhada do código.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-white font-semibold px-8"
              asChild
            >
              <a href="#planos">
                Ver Planos
                <Zap className="w-5 h-5 ml-2" />
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-yellow-500/50 hover:bg-yellow-500/10 bg-transparent text-white hover:text-yellow-400 border-2"
             asChild
            >
              <a href="https://natandev02.netlify.app" target="_blank" rel="noopener noreferrer">
                Conhecer Portfólio
                <Globe className="w-5 h-5 ml-2" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-gray-900/50 to-gray-800/50">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">Como Funciona Meu Trabalho</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Code className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">Estrutura Manual</h3>
                <p className="text-gray-300 leading-relaxed">
                  Desenvolvimento da estrutura base em 3-4 horas com código limpo e otimizado
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-600 to-yellow-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">Inovação com IA</h3>
                <p className="text-gray-300 leading-relaxed">
                  Uso de Inteligência Artificial para criar o visual exatamente como você deseja
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">Revisão Completa</h3>
                <p className="text-gray-300 leading-relaxed">
                  Revisão detalhada do código e correção de erros para garantir qualidade
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="planos" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 text-yellow-400 border-yellow-500/30">
              💎 Planos e Preços
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Escolha o Plano Ideal</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Soluções personalizadas para cada necessidade e orçamento
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {plans.map((plan, index) => (
              <Card
                key={index}
                className={`relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl border-2 bg-gray-900/50 ${
                  plan.popular
                    ? "border-yellow-500 shadow-lg shadow-yellow-500/20"
                    : "border-gray-700 hover:border-yellow-500/50"
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-3 py-1 text-sm font-semibold rounded-bl-lg">
                    <Star className="w-4 h-4 inline mr-1" />
                    Mais Popular
                  </div>
                )}

                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl font-bold text-white">{plan.name}</CardTitle>
                  <CardDescription className="text-gray-300">{plan.description}</CardDescription>
                  <div className="mt-4">
                    <div className="flex items-baseline justify-center">
                      <span className="text-4xl font-bold text-yellow-400">{plan.price}</span>
                      <span className="text-gray-300 ml-1">{plan.period}</span>
                    </div>
                    {plan.monthly && <p className="text-sm text-gray-400 mt-1">{plan.monthly}</p>}
                  </div>
                </CardHeader>

                <CardContent className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                      <span className="text-sm text-gray-200">{feature}</span>
                    </div>
                  ))}
                </CardContent>

                <CardFooter>
                  <Button
                    asChild
                    className={`w-full font-semibold ${
                      plan.popular
                        ? "bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-white"
                        : "bg-gray-800 hover:bg-gray-700 text-white border border-gray-600 hover:border-yellow-500/50"
                    }`}
                  >
                    <a href={plan.link} target="_blank" rel="noopener noreferrer">
                      Escolher Plano
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-gray-900/50 to-gray-800/50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Vamos Conversar</h2>
            <p className="text-xl text-gray-300">Entre em contato através das minhas redes sociais</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-4xl mx-auto">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-gray-900/70 hover:bg-gray-800/70 border border-gray-700 hover:border-yellow-500/50 transition-all duration-300 hover:scale-105 hover:shadow-lg group"
              >
                <social.icon className="w-8 h-8 text-gray-300 group-hover:text-yellow-400 transition-colors" />
                <span className="text-sm font-medium text-gray-200 group-hover:text-yellow-400 transition-colors">
                  {social.name}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-gradient-to-r from-yellow-600/10 to-yellow-700/10 border-t border-gray-700">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center">
              <Code className="w-5 h-5 text-black" />
            </div>
            <span className="text-xl font-bold text-white">NATANDEV</span>
          </div>
          <p className="text-lg font-semibold text-yellow-400 mb-2">NATAN BORGES PODE TE ENTREGAR O MELHOR SITE!</p>
          <p className="text-gray-300">© 2024 NatanDev. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  )
}
