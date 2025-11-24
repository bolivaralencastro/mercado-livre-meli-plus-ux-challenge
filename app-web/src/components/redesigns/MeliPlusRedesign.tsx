import React from 'react';
import { ChevronLeft, ChevronDown, Check, Plus } from 'lucide-react';

export default function MeliPlusRedesign() {
  return (
      <div className="w-full h-full bg-white relative flex flex-col overflow-hidden">
        
        <div className="flex-1 overflow-y-auto no-scrollbar">
        {/* ========================================== */}
        {/* 1. HEADER (Amarelo)                        */}
        {/* ========================================== */}
        <div className="bg-[#FFF159] relative z-10 pb-20">
            {/* Navbar */}
            <div className="p-4 pt-8 flex items-center">
                <button className="text-gray-900">
                    <ChevronLeft size={28} />
                </button>
            </div>

            {/* Headline */}
            <div className="flex flex-col items-center px-6 mt-2">
                <div className="bg-[#4A0099] text-white px-4 py-0.5 rounded-full font-extrabold italic flex items-center text-xl tracking-tighter mb-5 shadow-sm">
                    meli<span className="text-white not-italic ml-0.5">+</span>
                </div>
                <h1 className="text-center text-gray-900 text-[22px] font-medium leading-[1.3] max-w-xs">
                    Consiga frete grátis, parcelas extras sem juros, cashback e benefícios em entretenimento
                </h1>
            </div>

            {/* Background Elements */}
            <div className="w-full h-32 mt-6 relative flex justify-center items-end">
               <div className="absolute w-full flex justify-center space-x-4 opacity-90 bottom-[-40px] z-20">
                    <div className="w-20 h-20 bg-yellow-600/20 rounded-full blur-xl absolute right-12 bottom-10"></div>
                    <div className="w-24 h-24 bg-white/40 rounded-full blur-xl absolute bottom-12"></div>
                    <div className="w-20 h-20 bg-black/10 rounded-full blur-xl absolute left-12 bottom-20"></div>
               </div>
            </div>
        </div>

        {/* Divisor Curvo 1 (Amarelo -> Roxo Escuro) */}
        <div className="relative w-full -mt-24 z-0">
             <svg className="block w-full h-24" viewBox="0 0 1440 320" preserveAspectRatio="none">
                <path fill="#581C96" fillOpacity="1" d="M0,224L80,213.3C160,203,320,181,480,181.3C640,181,800,203,960,213.3C1120,224,1280,224,1360,224L1440,224L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
            </svg>
        </div>

        {/* ========================================== */}
        {/* 2. MELI+ ESSENCIAL (Roxo Escuro)           */}
        {/* ========================================== */}
        <div className="bg-gradient-to-b from-[#581C96] to-[#742BC8] pt-0 px-6 relative z-10 -mt-1 pb-16">
            
            {/* Caixa 3D */}
            <div className="relative -mt-36 mb-8 flex justify-center">
                <div className="w-64 h-48 bg-gradient-to-br from-yellow-600 to-yellow-800 rounded-lg shadow-2xl flex items-center justify-center relative transform rotate-1 border-t-4 border-yellow-400/50 z-20">
                    <div className="flex items-center space-x-2 opacity-60 mix-blend-multiply">
                        <div className="w-8 h-8 rounded-full border-2 border-black/40"></div>
                        <div className="text-xs font-bold text-black/60 leading-tight">mercado<br/>livre</div>
                    </div>
                     {/* Elementos flutuantes caixa */}
                     <div className="absolute -top-16 -left-4 w-20 h-28 bg-gray-800 rounded rotate-[-20deg] shadow-lg border border-gray-600"></div>
                     <div className="absolute -top-20 left-12 w-24 h-24 bg-gray-900 rounded-full shadow-lg"></div>
                     <div className="absolute -top-12 right-[-20px] w-24 h-24 bg-yellow-200 rounded-full border-4 border-gray-300 shadow-lg"></div>
                </div>
            </div>

            {/* Título */}
            <div className="text-center text-white mb-8">
                <h2 className="text-2xl font-bold mb-1">Meli+ Essencial</h2>
                <p className="text-lg font-normal opacity-95">Assine por R$ 9,90/mês</p>
            </div>
            
            <div className="text-center mb-8 px-4">
                <p className="text-white text-sm font-normal leading-relaxed opacity-90">
                    Economize em compras e pagamentos, e faça seu dinheiro render.
                </p>
            </div>

            {/* Lista Benefícios */}
            <div className="space-y-3">
                <div className="bg-white rounded-lg p-4 flex items-center shadow-md">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-4 text-gray-800 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    <div className="text-sm text-gray-800">Frete grátis a partir de R$ 29 <span className="text-[10px] align-top">(1)</span></div>
                </div>
                <div className="bg-white rounded-lg p-4 flex items-center shadow-md">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-4 text-gray-800 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                    </div>
                    <div className="text-sm text-gray-800">Até 3 parcelas extras sem juros</div>
                </div>
                <div className="bg-white rounded-lg p-4 flex items-center shadow-md">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-4 text-gray-800 flex-shrink-0">
                         <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    <div className="text-sm text-gray-800">Cashback em compras e pagamentos</div>
                </div>
                <div className="bg-white rounded-lg p-4 flex items-center shadow-md">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-4 text-gray-800 flex-shrink-0 font-bold">+$</div>
                    <div className="text-sm text-gray-800">Seu dinheiro rende mais no Mercado Pago</div>
                </div>
            </div>
        </div>

        {/* ========================================== */}
        {/* 3. TRANSIÇÃO (Roxo Escuro -> Pastel)       */}
        {/* ========================================== */}
        <div className="relative w-full -mt-1 z-20">
             <svg className="block w-full h-16" viewBox="0 0 1440 320" preserveAspectRatio="none">
                <path fill="#F5F0FA" fillOpacity="1" d="M0,96L80,112C160,128,320,160,480,165.3C640,171,800,149,960,133.3C1120,117,1280,107,1360,101.3L1440,96L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
            </svg>
        </div>

        {/* ========================================== */}
        {/* 4. MELI+ TOTAL (Fundo Pastel)              */}
        {/* ========================================== */}
        <div className="bg-[#F5F0FA] px-5 pb-10 pt-2 -mt-1">

            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-1">Meli+ Total</h2>
                <p className="text-lg text-gray-900 font-normal">Assine por R$ 17,90/mês</p>
                <p className="text-gray-500 text-sm mt-4">Curta os melhores filmes, séries e música.</p>
            </div>

            {/* CARD DISNEY (Visual atualizado) */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
                <div className="p-5 pb-4">
                    <div className="flex items-start mb-3">
                        {/* Avatar Circular HBO (Conforme print) */}
                        <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center flex-shrink-0 mr-3 p-1">
                            <svg viewBox="0 0 24 24" className="w-full h-full text-purple-900" fill="currentColor">
                                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22C6.486 22 2 17.514 2 12S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/>
                                <text x="50%" y="54%" dominantBaseline="middle" textAnchor="middle" fontSize="6" fontWeight="bold" fill="#4A0099">HBO</text>
                            </svg>
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 text-[15px] leading-tight">Disney+ Padrão com anúncios</h3>
                        </div>
                    </div>

                    <p className="text-sm text-gray-600 mb-4">Filmes, séries e o esporte da ESPN</p>

                    {/* Cards 1:1 */}
                    <div className="flex gap-3 overflow-x-auto no-scrollbar">
                        <div className="flex-shrink-0 w-[48%] relative aspect-square rounded-lg overflow-hidden">
                            <img src="https://lumiere-a.akamaihd.net/v1/images/p_lightyear_23180_05c06497.jpeg" className="w-full h-full object-cover" alt="Lightyear" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                            <span className="absolute bottom-3 left-3 text-white font-bold text-sm">Ligthyear</span>
                        </div>
                        <div className="flex-shrink-0 w-[48%] relative aspect-square rounded-lg overflow-hidden">
                             <img src="https://lumiere-a.akamaihd.net/v1/images/p_thorloveandthunder_23194_a5a73e6e.jpeg" className="w-full h-full object-cover" alt="Thor" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                            <span className="absolute bottom-3 left-3 text-white font-bold text-sm">Thor</span>
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-100 px-5 py-4 bg-gray-50/50">
                    <p className="text-xs text-gray-600 leading-relaxed">
                        Ao ser Meli+, é possível escolher o plano do Disney+ mais conveniente para você.
                    </p>
                </div>
            </div>

            {/* CARD DEEZER */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
                <div className="p-5 pb-4">
                    <div className="flex items-center mb-3">
                        <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center flex-shrink-0 mr-3 p-2 bg-white">
                             <svg viewBox="0 0 24 24" className="w-full h-full text-black" fill="currentColor"><path d="M4 16h3v5H4v-5zm5-5h3v10H9V11zm5-2h3v12h-3V9zm5-7h3v19h-3V2z"/></svg>
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 text-[15px]">Deezer Premium</h3>
                        </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">Música sem anúncios por 12 meses</p>

                    <div className="flex gap-3 overflow-x-auto no-scrollbar">
                         <div className="flex-shrink-0 w-[48%] relative aspect-square rounded-lg overflow-hidden bg-red-100">
                             <div className="absolute inset-0 flex items-center justify-center bg-orange-200 text-center">
                                 <span className="font-bold text-red-600 text-xl tracking-tighter transform -rotate-6">EL<br/>COMIENZO</span>
                             </div>
                             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                             <span className="absolute bottom-3 left-3 text-white font-bold text-sm">Grupo Frontera</span>
                         </div>
                         <div className="flex-shrink-0 w-[48%] relative aspect-square rounded-lg overflow-hidden">
                             <img src="https://upload.wikimedia.org/wikipedia/en/2/27/Julieta_Venegas_-_Tu_Historia.png" className="w-full h-full object-cover" alt="Julieta Venegas" />
                             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                             <span className="absolute bottom-3 left-3 text-white font-bold text-sm">Julieta Venegas</span>
                         </div>
                    </div>
                </div>
            </div>

            {/* Descontos Extras (Cards Brancos) */}
            <div className="bg-white rounded-xl shadow-sm p-5 mb-8">
                 <h4 className="text-sm font-bold text-gray-900 mb-4">Descontos em outras plataformas de conteúdo</h4>
                 
                 <div className="grid grid-cols-2 gap-3">
                    
                    {/* CARD MAX (Pixel Perfect) */}
                    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden relative h-44 shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
                        
                        {/* 1. Header Azul Sólido */}
                        <div className="h-[52px] bg-[#0025CC] w-full"></div>
                        
                        {/* 2. Logo Container Flutuante (Centralizado) */}
                        <div className="absolute top-[26px] left-1/2 transform -translate-x-1/2 w-[60px] h-[60px] bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center z-10">
                            {/* Simulação Logo Max */}
                            <span className="text-[#0025CC] font-black text-xl tracking-tighter">max</span>
                        </div>
                        
                        {/* 3. Corpo do Texto */}
                        <div className="pt-[42px] pb-4 text-center">
                            <p className="font-bold text-gray-900 text-[15px] mb-0.5">Max</p>
                            <p className="text-gray-500 text-[13px]">30% OFF</p>
                        </div>
                    </div>
                    
                    {/* CARD PARAMOUNT+ (Mesma estrutura) */}
                    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden relative h-44 shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
                        
                        {/* 1. Header Azul Claro */}
                        <div className="h-[52px] bg-[#0064FF] w-full"></div>
                        
                        {/* 2. Logo Container */}
                        <div className="absolute top-[26px] left-1/2 transform -translate-x-1/2 w-[60px] h-[60px] bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center z-10">
                            {/* Simulação Logo Paramount */}
                            <div className="w-8 h-8 rounded-full bg-[#0064FF] flex items-center justify-center">
                                <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5"><path d="M2 20h20L12 4z"/></svg>
                            </div>
                        </div>
                        
                        {/* 3. Corpo do Texto */}
                        <div className="pt-[42px] pb-4 text-center">
                            <p className="font-bold text-gray-900 text-[15px] mb-0.5">Paramount+</p>
                            <p className="text-gray-500 text-[13px]">30% OFF</p>
                        </div>
                    </div>

                 </div>
            </div>

             {/* CTA */}
             <div className="mb-4">
                <button className="w-full bg-[#3483FA] text-white font-bold py-3.5 rounded-md hover:bg-blue-600 transition shadow-sm text-sm">
                    Escolher plano
                </button>
            </div>
        </div>

        {/* ========================================== */}
        {/* 5. FOOTER (Fundo Branco)                   */}
        {/* ========================================== */}
        <div className="bg-white px-5 pt-8 pb-12">
            <h3 className="font-bold text-gray-900 mb-4 text-lg">Perguntas frequentes</h3>
            
            <div className="space-y-4 mb-8">
                <div className="flex justify-between items-start py-3 border-b border-gray-100 cursor-pointer">
                    <span className="text-sm text-gray-600 pr-4">Se eu assinar um dos planos do Meli+, posso trocar depois?</span>
                    <ChevronDown className="w-5 h-5 text-[#3483FA]" />
                </div>
                <div className="flex justify-between items-start py-3 border-b border-gray-100 cursor-pointer">
                    <span className="text-sm text-gray-600 pr-4">Se eu assinar o Meli+, terei acesso ao Disney+ e à Deezer Premium sem custo extra?</span>
                     <ChevronDown className="w-5 h-5 text-[#3483FA]" />
                </div>
            </div>

            <div className="text-xs text-gray-400 space-y-2 leading-relaxed">
                <p>Os benefícios do Meli+ são válidos para usuários maiores de idade.</p>
                <p>(1) Frete grátis para produtos do Full selecionados na modalidade de entrega "Seu dia de entregas".</p>
            </div>
        </div>

        {/* Home Indicator */}
        <div className="h-6 w-full flex justify-center items-center pb-2 pointer-events-none">
            <div className="w-32 h-1 bg-transparent rounded-full"></div>
        </div>

      </div>
      </div>
  );
}
