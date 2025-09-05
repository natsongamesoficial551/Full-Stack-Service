import React, { useState, useEffect } from 'react';
import { 
  Instagram, 
  Globe, 
  Youtube, 
  MessageCircle, 
  Linkedin, 
  Phone, 
  Code, 
  Palette, 
  Smartphone, 
  Zap,
  ArrowRight,
  Star,
  CheckCircle,
  Layers,
  Monitor,
  Database,
  Sparkles,
  ChevronDown
} from 'lucide-react';

function App() {
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-black"></div>
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-blue-400 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-xl border-b border-blue-500/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center transform rotate-12 hover:rotate-0 transition-transform duration-500">
                  <Code className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-ping"></div>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                NATANDEV
              </span>
            </div>
            
            <div className="hidden md:flex space-x-8">
              {['home', 'sobre', 'servicos', 'contato'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`px-4 py-2 rounded-full transition-all duration-300 ${
                    activeSection === section 
                      ? 'bg-blue-500 text-white' 
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="mb-8">
            <div className="inline-block p-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full mb-6 backdrop-blur-sm border border-blue-500/30">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Code className="w-12 h-12 text-white" />
              </div>
            </div>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
              SERVIÇOS
            </span>
            <br />
            <span className="text-white">FULL-STACK</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Transformo suas ideias em experiências digitais extraordinárias com tecnologia de ponta
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={() => scrollToSection('sobre')}
              className="group px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full font-semibold text-lg hover:scale-105 transition-all duration-300 flex items-center space-x-2 shadow-2xl hover:shadow-blue-500/25"
            >
              <span>Descobrir Mais</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button 
              onClick={() => scrollToSection('contato')}
              className="px-8 py-4 border-2 border-blue-500 rounded-full font-semibold text-lg hover:bg-blue-500 hover:text-white transition-all duration-300"
            >
              Falar Comigo
            </button>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-blue-400" />
        </div>
      </section>

      {/* About Section */}
      <section id="sobre" className="py-20 relative z-10">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                SOBRE
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="relative p-8 bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-3xl border border-blue-500/20 backdrop-blur-sm hover:scale-105 transition-all duration-500">
                  <div className="absolute -top-4 -left-4 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-lg leading-relaxed text-gray-300">
                    <span className="text-blue-400 font-semibold">Olá,</span> aqui eu ofereço serviço Full-Stack para seu site, como funciona meu trabalho?
                  </p>
                </div>
                
                <div className="relative p-8 bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-3xl border border-purple-500/20 backdrop-blur-sm hover:scale-105 transition-all duration-500">
                  <div className="absolute -top-4 -left-4 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                    <Code className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-lg leading-relaxed text-gray-300">
                    Eu crio a estrutura do site manualmente, demoro mais ou menos umas 3h a 4h para desenvolver a estrutura.
                  </p>
                </div>
                
                <div className="relative p-8 bg-gradient-to-br from-green-900/30 to-teal-900/30 rounded-3xl border border-green-500/20 backdrop-blur-sm hover:scale-105 transition-all duration-500">
                  <div className="absolute -top-4 -left-4 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <Palette className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-lg leading-relaxed text-gray-300">
                    Após isso, uso Inteligência Artificial para inovar o visual e deixar <span className="text-green-400 font-bold">DO JEITO QUE VOCÊ QUISER!</span>
                  </p>
                </div>
                
                <div className="relative p-8 bg-gradient-to-br from-orange-900/30 to-red-900/30 rounded-3xl border border-orange-500/20 backdrop-blur-sm hover:scale-105 transition-all duration-500">
                  <div className="absolute -top-4 -left-4 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-lg leading-relaxed text-gray-300">
                    Reviso o código e conserto erros ou adiciono algo que esteja faltando. <span className="text-orange-400 font-bold">Venha fazer o seu site!</span>
                  </p>
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-3xl"></div>
                <div className="relative bg-black/50 backdrop-blur-sm rounded-3xl p-8 border border-blue-500/20">
                  <div className="grid grid-cols-2 gap-6">
                    {[
                      { icon: Monitor, label: 'Frontend', value: 'Iniciante' },
                      { icon: Database, label: 'Backend', value: 'Iniciante' },
                      { icon: Smartphone, label: 'Mobile', value: 'Iniciante' },
                      { icon: Layers, label: 'Full-Stack', value: 'Iniciante' }
                    ].map((skill, index) => {
                      const IconComponent = skill.icon;
                      return (
                        <div key={index} className="text-center p-4 bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-2xl border border-blue-500/10">
                          <IconComponent className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-300 mb-1">{skill.label}</p>
                          <p className="text-sm font-bold text-white">{skill.value}</p>
                        </div>
                      );
                    })}
                    
                    <div className="col-span-2 text-center p-4 bg-gradient-to-br from-green-900/20 to-teal-900/20 rounded-2xl border border-green-500/10">
                      <div className="w-8 h-8 text-green-400 mx-auto mb-2">
                        🤖
                      </div>
                      <p className="text-sm text-gray-300 mb-1">IA</p>
                      <p className="text-sm font-bold text-white">Intermediário Especialista</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicos" className="py-20 relative z-10">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                SERVIÇOS
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
            <p className="text-xl text-gray-300 mt-6 max-w-3xl mx-auto">
              Escolha o plano ideal para seu projeto. Pagamento único para desenvolvimento + custos mensais de hospedagem e domínio.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[
              {
                icon: Monitor,
                title: 'Básico',
                description: 'Perfeito para sites institucionais e portfólios profissionais',
                features: ['Front-end completo', 'Domínio próprio', 'Hospedagem configurada', 'Design responsivo'],
                initialPrice: 'R$ 134,99',
                monthlyPrice: 'R$ 18,32',
                monthlyBreakdown: 'R$ 14,99 (hospedagem) + R$ 3,33 (domínio)',
                color: 'from-blue-500 to-cyan-500',
                bgColor: 'from-blue-900/20 to-cyan-900/20',
                borderColor: 'border-blue-500/20',
                popular: false
              },
              {
                icon: Database,
                title: 'Premium',
                description: 'Ideal para sites com funcionalidades interativas e formulários',
                features: ['Tudo do Básico', 'Back-end básico', 'Formulários funcionais', 'Login simples'],
                initialPrice: 'R$ 179,99',
                monthlyPrice: 'R$ 18,32',
                monthlyBreakdown: 'R$ 14,99 (hospedagem) + R$ 3,33 (domínio)',
                color: 'from-purple-500 to-pink-500',
                bgColor: 'from-purple-900/20 to-pink-900/20',
                borderColor: 'border-purple-500/20',
                popular: true
              },
              {
                icon: Zap,
                title: 'Developer',
                description: 'Solução completa para projetos profissionais e empresariais',
                features: ['Tudo do Premium', 'SEO básico', 'Suporte 30 dias', 'Hospedagem premium'],
                initialPrice: 'R$ 265,99',
                monthlyPrice: 'R$ 46,32',
                monthlyBreakdown: 'R$ 39,99 (hospedagem) + R$ 6,33 (domínio)',
                color: 'from-green-500 to-teal-500',
                bgColor: 'from-green-900/20 to-teal-900/20',
                borderColor: 'border-green-500/20',
                popular: false
              }
            ].map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div
                  key={index}
                  className={`group relative p-8 bg-gradient-to-br ${service.bgColor} rounded-3xl border-2 ${service.borderColor} backdrop-blur-sm hover:scale-105 transition-all duration-500 overflow-hidden ${service.popular ? 'ring-2 ring-purple-500 ring-opacity-50' : ''}`}
                >
                  {service.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-bold">
                      MAIS POPULAR
                    </div>
                  )}
                  
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className={`relative w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-300 leading-relaxed mb-6">
                    {service.description}
                  </p>
                  
                  {/* Pricing */}
                  <div className="mb-6 p-4 bg-black/30 rounded-2xl border border-white/10">
                    <div className="text-center mb-4">
                      <div className="text-3xl font-black text-white mb-1">
                        {service.initialPrice}
                      </div>
                      <div className="text-sm text-gray-400">
                        Pagamento único para desenvolvimento
                      </div>
                    </div>
                    
                    <div className="border-t border-white/10 pt-4">
                      <div className="text-center">
                        <div className="text-xl font-bold text-blue-400 mb-1">
                          {service.monthlyPrice}/mês
                        </div>
                        <div className="text-xs text-gray-500">
                          {service.monthlyBreakdown}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-2">
                        <Star className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm text-gray-400">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <ul className="mt-6">
                    <li>
                      <a
                        href={
                          service.title === 'Básico' ? 'https://w.app/sldc02' :
                          service.title === 'Premium' ? 'https://w.app/zxjuck' :
                          service.title === 'Developer' ? 'https://w.app/hbyork' : '#'
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-full block py-3 px-6 bg-gradient-to-r ${service.color} rounded-xl font-semibold text-white hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl text-center no-underline`}
                      >
                        Escolher Plano
                      </a>
                    </li>
                  </ul>
                </div>
              );
            })}
          </div>
          
          {/* Additional Info */}
          <div className="mt-16 text-center">
            <div className="max-w-4xl mx-auto p-8 bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-3xl border border-blue-500/20 backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-white mb-4">
                💡 Como Funciona o Pagamento?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
                    <div>
                      <h4 className="font-semibold text-white">Pagamento Inicial</h4>
                      <p className="text-gray-300 text-sm">Valor único para desenvolvimento completo do seu site</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
                    <div>
                      <h4 className="font-semibold text-white">Entrega do Projeto</h4>
                      <p className="text-gray-300 text-sm">Site completo, testado e pronto para uso</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
                    <div>
                      <h4 className="font-semibold text-white">Custos Mensais</h4>
                      <p className="text-gray-300 text-sm">Apenas hospedagem e domínio para manter seu site online</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-sm">4</div>
                    <div>
                      <h4 className="font-semibold text-white">Suporte Contínuo</h4>
                      <p className="text-gray-300 text-sm">Manutenção e atualizações quando necessário</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contato" className="py-20 relative z-10">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-pink-400 to-red-400 bg-clip-text text-transparent">
                CONTATO
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-red-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { 
                  icon: Instagram, 
                  text: 'Instagram', 
                  link: 'https://www.instagram.com/nborges.ofc/', 
                  color: 'from-pink-500 to-purple-600',
                  description: '@nborges.ofc'
                },
                { 
                  icon: Globe, 
                  text: 'Portfólio', 
                  link: 'https://natandev02.netlify.app/', 
                  color: 'from-blue-500 to-cyan-600',
                  description: 'Veja meus trabalhos'
                },
                { 
                  icon: Youtube, 
                  text: 'Youtube', 
                  link: 'https://www.youtube.com/@natsongames498', 
                  color: 'from-red-500 to-red-600',
                  description: 'Tutoriais e conteúdo'
                },
                { 
                  icon: MessageCircle, 
                  text: 'Discord', 
                  link: '#', 
                  color: 'from-indigo-500 to-purple-600',
                  description: 'Chat em tempo real'
                },
                { 
                  icon: Linkedin, 
                  text: 'LinkedIn', 
                  link: '#', 
                  color: 'from-blue-600 to-blue-700',
                  description: 'Rede profissional'
                },
                { 
                  icon: Phone, 
                  text: 'WhatsApp', 
                  link: 'https://wa.me/5521992826074', 
                  color: 'from-green-500 to-green-600',
                  description: 'Conversa direta'
                }
              ].map((contact, index) => {
                const IconComponent = contact.icon;
                return (
                  <a
                    key={index}
                    href={contact.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group relative p-8 bg-gradient-to-br ${contact.color} rounded-3xl shadow-2xl hover:shadow-4xl transform hover:-translate-y-2 transition-all duration-500 overflow-hidden`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <div className="relative flex flex-col items-center text-center space-y-4">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-all duration-300 group-hover:scale-110">
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      
                      <div>
                        <h3 className="font-bold text-xl text-white mb-1 group-hover:scale-105 transition-transform duration-300">
                          {contact.text}
                        </h3>
                        <p className="text-white/80 text-sm">
                          {contact.description}
                        </p>
                      </div>
                    </div>
                    
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ArrowRight className="w-5 h-5 text-white" />
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 relative z-10 border-t border-blue-500/20">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="mb-8">
              <h3 className="text-3xl md:text-4xl font-black mb-4">
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  NATAN BORGES PODE TE ENTREGAR O MELHOR SITE!!
                </span>
              </h3>
              <div className="w-32 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mx-auto rounded-full"></div>
            </div>
            
            <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
              Desenvolvendo soluções digitais inovadoras que transformam ideias em realidade. 
              Cada projeto é uma obra de arte tecnológica única.
            </p>
            
            <div className="flex justify-center items-center space-x-4 text-gray-500">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span>© 2025 NATANDEV - Todos os direitos reservados</span>
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;