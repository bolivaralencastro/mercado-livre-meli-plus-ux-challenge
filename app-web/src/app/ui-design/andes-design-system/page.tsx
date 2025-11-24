"use client";

import { useState } from "react";
import Image from "next/image";
import AndesButton from "@/components/ui/AndesButton";
import AndesBadge from "@/components/ui/AndesBadge";
import AndesCard from "@/components/ui/AndesCard";
import AndesInput from "@/components/ui/AndesInput";
import AndesCarousel from "@/components/ui/AndesCarousel";
import AndesDropdownMenu from "@/components/ui/AndesDropdownMenu";
import AndesFilterTag from "@/components/ui/AndesFilterTag";
import AndesEmptyState from "@/components/ui/AndesEmptyState";
import AndesCategoryCard from "@/components/ui/AndesCategoryCard";
import AndesGridCard from "@/components/ui/AndesGridCard";
import AndesMoney from "@/components/ui/AndesMoney";
import AndesModal from "@/components/ui/AndesModal";
import AndesSpinner from "@/components/ui/AndesSpinner";
import AndesSwitch from "@/components/ui/AndesSwitch";
import AndesLabel from "@/components/ui/AndesLabel";
import AndesFormGroup from "@/components/ui/AndesFormGroup";

const AndesDesignSystemPage = () => {
  const [openFoundationMenu, setOpenFoundationMenu] = useState(true);
  const [openAtomsMenu, setOpenAtomsMenu] = useState(false);
  const [openMoleculesMenu, setOpenMoleculesMenu] = useState(false);
  const [openOrganismsMenu, setOpenOrganismsMenu] = useState(false);
  const [selectedSection, setSelectedSection] = useState("tokens-colors");
  const [showModal, setShowModal] = useState(false);
  const [showMeliPlusModal, setShowMeliPlusModal] = useState(false);
  const [showOnboardingModal, setShowOnboardingModal] = useState(false);
  const [onboardingSlide, setOnboardingSlide] = useState(0);
  const [switchState, setSwitchState] = useState(false);

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#f5f5f5]">


      {/* Sidebar */}
      <aside className="w-64 h-screen bg-[#f5f5f5] border-r border-black/[0.06] fixed top-0 left-0 flex flex-col overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] z-[100]">
        <nav className="pt-7 px-3 pb-5">
          <div className="mb-8 px-2">
            <Image 
              src="/logos/ANDES-UI-PRETA.png" 
              alt="Andes UI" 
              width={120} 
              height={32} 
              className="h-8 w-auto" 
              unoptimized
            />
          </div>
          <div className="mb-6 flex flex-col gap-0.5">
            <a href="/ui-design" className="flex items-center w-full h-[42px] px-3 no-underline text-black/90 text-sm font-normal rounded-md cursor-pointer transition-colors hover:bg-black/[0.04]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 mr-3 ml-1 opacity-70 grayscale brightness-50">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
              <span className="flex-grow">Início</span>
            </a>
          </div>
          
          {/* FOUNDATION - Design Tokens */}
          <div className="mb-6 flex flex-col gap-0.5">
            <p className="text-black/55 text-xs font-semibold ml-8 mb-1 uppercase">Foundation</p>
            
            <button
              onClick={() => {
                setOpenFoundationMenu(!openFoundationMenu);
                if (!openFoundationMenu) setSelectedSection("tokens-colors");
              }}
              className={`flex items-center w-full h-[42px] px-3 text-sm font-normal rounded-md cursor-pointer transition-colors border-none ${
                openFoundationMenu 
                  ? 'bg-[#e9f5fa] text-[#009ee3] font-semibold' 
                  : 'text-black/90 hover:bg-black/[0.04]'
              }`}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className={`w-4 h-4 mr-3 ml-1 ${openFoundationMenu ? 'opacity-100 [filter:none]' : 'opacity-70 grayscale brightness-50'}`}>
                <circle cx="12" cy="12" r="10"></circle>
                <circle cx="12" cy="12" r="6"></circle>
                <circle cx="12" cy="12" r="2"></circle>
              </svg>
              <span className="flex-grow text-left">Design Tokens</span>
              <svg 
                className={`w-3 h-3 transition-all ${openFoundationMenu ? 'opacity-100 stroke-[#333] rotate-90' : 'opacity-50 stroke-[#333]'}`}
                viewBox="0 0 24 24" 
                fill="none" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
            
            {openFoundationMenu && (
              <div className="ml-6 mt-1 flex flex-col gap-0.5">
                <button onClick={() => setSelectedSection("tokens-colors")} className={`flex items-center h-[38px] px-3 text-sm font-normal rounded-md cursor-pointer transition-colors border-none ${selectedSection === "tokens-colors" ? 'bg-[#e9f5fa] text-[#009ee3] font-semibold' : 'text-black/90 hover:bg-black/[0.04]'}`}>Cores</button>
                <button onClick={() => setSelectedSection("tokens-typography")} className={`flex items-center h-[38px] px-3 text-sm font-normal rounded-md cursor-pointer transition-colors border-none ${selectedSection === "tokens-typography" ? 'bg-[#e9f5fa] text-[#009ee3] font-semibold' : 'text-black/90 hover:bg-black/[0.04]'}`}>Tipografia</button>
                <button onClick={() => setSelectedSection("tokens-spacing")} className={`flex items-center h-[38px] px-3 text-sm font-normal rounded-md cursor-pointer transition-colors border-none ${selectedSection === "tokens-spacing" ? 'bg-[#e9f5fa] text-[#009ee3] font-semibold' : 'text-black/90 hover:bg-black/[0.04]'}`}>Espaçamento</button>
                <button onClick={() => setSelectedSection("tokens-radius")} className={`flex items-center h-[38px] px-3 text-sm font-normal rounded-md cursor-pointer transition-colors border-none ${selectedSection === "tokens-radius" ? 'bg-[#e9f5fa] text-[#009ee3] font-semibold' : 'text-black/90 hover:bg-black/[0.04]'}`}>Bordas</button>
                <button onClick={() => setSelectedSection("tokens-shadows")} className={`flex items-center h-[38px] px-3 text-sm font-normal rounded-md cursor-pointer transition-colors border-none ${selectedSection === "tokens-shadows" ? 'bg-[#e9f5fa] text-[#009ee3] font-semibold' : 'text-black/90 hover:bg-black/[0.04]'}`}>Sombras</button>
              </div>
            )}
          </div>

          {/* ATOMS - Componentes Básicos */}
          <div className="mb-6 flex flex-col gap-0.5">
            <p className="text-black/55 text-xs font-semibold ml-8 mb-1 uppercase">Atoms</p>
            
            <button
              onClick={() => setOpenAtomsMenu(!openAtomsMenu)}
              className="flex items-center w-full h-[42px] px-3 text-black/90 text-sm font-normal rounded-md cursor-pointer transition-colors border-none hover:bg-black/[0.04]"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-3 ml-1 opacity-70 grayscale brightness-50">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                <line x1="12" y1="22.08" x2="12" y2="12"></line>
              </svg>
              <span className="flex-grow text-left">Componentes Básicos</span>
              <svg 
                className={`w-3 h-3 transition-all ${openAtomsMenu ? 'opacity-100 stroke-[#333] rotate-90' : 'opacity-50 stroke-[#333]'}`}
                viewBox="0 0 24 24" 
                fill="none" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>

            {openAtomsMenu && (
              <div className="ml-6 mt-1 flex flex-col gap-0.5">
                <button onClick={() => setSelectedSection("buttons")} className={`flex items-center h-[38px] px-3 text-sm font-normal rounded-md cursor-pointer transition-colors border-none ${selectedSection === "buttons" ? 'bg-[#e9f5fa] text-[#009ee3] font-semibold' : 'text-black/90 hover:bg-black/[0.04]'}`}>Botões</button>
                <button onClick={() => setSelectedSection("badges")} className={`flex items-center h-[38px] px-3 text-sm font-normal rounded-md cursor-pointer transition-colors border-none ${selectedSection === "badges" ? 'bg-[#e9f5fa] text-[#009ee3] font-semibold' : 'text-black/90 hover:bg-black/[0.04]'}`}>Badges</button>
                <button onClick={() => setSelectedSection("inputs")} className={`flex items-center h-[38px] px-3 text-sm font-normal rounded-md cursor-pointer transition-colors border-none ${selectedSection === "inputs" ? 'bg-[#e9f5fa] text-[#009ee3] font-semibold' : 'text-black/90 hover:bg-black/[0.04]'}`}>Inputs</button>
                <button onClick={() => setSelectedSection("label")} className={`flex items-center h-[38px] px-3 text-sm font-normal rounded-md cursor-pointer transition-colors border-none ${selectedSection === "label" ? 'bg-[#e9f5fa] text-[#009ee3] font-semibold' : 'text-black/90 hover:bg-black/[0.04]'}`}>Label</button>
                <button onClick={() => setSelectedSection("switch")} className={`flex items-center h-[38px] px-3 text-sm font-normal rounded-md cursor-pointer transition-colors border-none ${selectedSection === "switch" ? 'bg-[#e9f5fa] text-[#009ee3] font-semibold' : 'text-black/90 hover:bg-black/[0.04]'}`}>Switch</button>
                <button onClick={() => setSelectedSection("spinner")} className={`flex items-center h-[38px] px-3 text-sm font-normal rounded-md cursor-pointer transition-colors border-none ${selectedSection === "spinner" ? 'bg-[#e9f5fa] text-[#009ee3] font-semibold' : 'text-black/90 hover:bg-black/[0.04]'}`}>Spinner</button>
                <button onClick={() => setSelectedSection("money")} className={`flex items-center h-[38px] px-3 text-sm font-normal rounded-md cursor-pointer transition-colors border-none ${selectedSection === "money" ? 'bg-[#e9f5fa] text-[#009ee3] font-semibold' : 'text-black/90 hover:bg-black/[0.04]'}`}>Money</button>
              </div>
            )}
          </div>

          {/* MOLECULES - Componentes Compostos */}
          <div className="mb-6 flex flex-col gap-0.5">
            <p className="text-black/55 text-xs font-semibold ml-8 mb-1 uppercase">Molecules</p>
            
            <button
              onClick={() => setOpenMoleculesMenu(!openMoleculesMenu)}
              className="flex items-center w-full h-[42px] px-3 text-black/90 text-sm font-normal rounded-md cursor-pointer transition-colors border-none hover:bg-black/[0.04]"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-3 ml-1 opacity-70 grayscale brightness-50">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="9" y1="3" x2="9" y2="21"></line>
              </svg>
              <span className="flex-grow text-left">Componentes Compostos</span>
              <svg 
                className={`w-3 h-3 transition-all ${openMoleculesMenu ? 'opacity-100 stroke-[#333] rotate-90' : 'opacity-50 stroke-[#333]'}`}
                viewBox="0 0 24 24" 
                fill="none" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>

            {openMoleculesMenu && (
              <div className="ml-6 mt-1 flex flex-col gap-0.5">
                <button onClick={() => setSelectedSection("formgroup")} className={`flex items-center h-[38px] px-3 text-sm font-normal rounded-md cursor-pointer transition-colors border-none ${selectedSection === "formgroup" ? 'bg-[#e9f5fa] text-[#009ee3] font-semibold' : 'text-black/90 hover:bg-black/[0.04]'}`}>Form Group</button>
                <button onClick={() => setSelectedSection("filtertag")} className={`flex items-center h-[38px] px-3 text-sm font-normal rounded-md cursor-pointer transition-colors border-none ${selectedSection === "filtertag" ? 'bg-[#e9f5fa] text-[#009ee3] font-semibold' : 'text-black/90 hover:bg-black/[0.04]'}`}>Filter Tag</button>
                <button onClick={() => setSelectedSection("cards")} className={`flex items-center h-[38px] px-3 text-sm font-normal rounded-md cursor-pointer transition-colors border-none ${selectedSection === "cards" ? 'bg-[#e9f5fa] text-[#009ee3] font-semibold' : 'text-black/90 hover:bg-black/[0.04]'}`}>Cards</button>
                <button onClick={() => setSelectedSection("gridcard")} className={`flex items-center h-[38px] px-3 text-sm font-normal rounded-md cursor-pointer transition-colors border-none ${selectedSection === "gridcard" ? 'bg-[#e9f5fa] text-[#009ee3] font-semibold' : 'text-black/90 hover:bg-black/[0.04]'}`}>Grid Card</button>
                <button onClick={() => setSelectedSection("categorycard")} className={`flex items-center h-[38px] px-3 text-sm font-normal rounded-md cursor-pointer transition-colors border-none ${selectedSection === "categorycard" ? 'bg-[#e9f5fa] text-[#009ee3] font-semibold' : 'text-black/90 hover:bg-black/[0.04]'}`}>Category Card</button>
                <button onClick={() => setSelectedSection("emptystate")} className={`flex items-center h-[38px] px-3 text-sm font-normal rounded-md cursor-pointer transition-colors border-none ${selectedSection === "emptystate" ? 'bg-[#e9f5fa] text-[#009ee3] font-semibold' : 'text-black/90 hover:bg-black/[0.04]'}`}>Empty State</button>
              </div>
            )}
          </div>

          {/* ORGANISMS - Componentes Complexos */}
          <div className="mb-6 flex flex-col gap-0.5">
            <p className="text-black/55 text-xs font-semibold ml-8 mb-1 uppercase">Organisms</p>
            
            <button
              onClick={() => setOpenOrganismsMenu(!openOrganismsMenu)}
              className="flex items-center w-full h-[42px] px-3 text-black/90 text-sm font-normal rounded-md cursor-pointer transition-colors border-none hover:bg-black/[0.04]"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-3 ml-1 opacity-70 grayscale brightness-50">
                <path d="M3 3h6v6H3zM15 3h6v6h-6zM3 15h6v6H3zM15 15h6v6h-6z"></path>
              </svg>
              <span className="flex-grow text-left">Componentes Complexos</span>
              <svg 
                className={`w-3 h-3 transition-all ${openOrganismsMenu ? 'opacity-100 stroke-[#333] rotate-90' : 'opacity-50 stroke-[#333]'}`}
                viewBox="0 0 24 24" 
                fill="none" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>

            {openOrganismsMenu && (
              <div className="ml-6 mt-1 flex flex-col gap-0.5">
                <button onClick={() => setSelectedSection("dropdown")} className={`flex items-center h-[38px] px-3 text-sm font-normal rounded-md cursor-pointer transition-colors border-none ${selectedSection === "dropdown" ? 'bg-[#e9f5fa] text-[#009ee3] font-semibold' : 'text-black/90 hover:bg-black/[0.04]'}`}>Dropdown Menu</button>
                <button onClick={() => setSelectedSection("carousel")} className={`flex items-center h-[38px] px-3 text-sm font-normal rounded-md cursor-pointer transition-colors border-none ${selectedSection === "carousel" ? 'bg-[#e9f5fa] text-[#009ee3] font-semibold' : 'text-black/90 hover:bg-black/[0.04]'}`}>Carousel</button>
                <button onClick={() => setSelectedSection("modal")} className={`flex items-center h-[38px] px-3 text-sm font-normal rounded-md cursor-pointer transition-colors border-none ${selectedSection === "modal" ? 'bg-[#e9f5fa] text-[#009ee3] font-semibold' : 'text-black/90 hover:bg-black/[0.04]'}`}>Modal</button>
              </div>
            )}
          </div>

          {/* RECURSOS */}
          <div className="mb-6 flex flex-col gap-0.5">
            <p className="text-black/55 text-xs font-semibold ml-8 mb-1 uppercase">Recursos</p>
            <a href="#" className="flex items-center w-full h-[42px] px-3 no-underline text-black/90 text-sm font-normal rounded-md cursor-pointer transition-colors hover:bg-black/[0.04]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 mr-3 ml-1 opacity-70 grayscale brightness-50">
                <circle cx="12" cy="12" r="10"></circle>
                <circle cx="12" cy="12" r="6"></circle>
                <circle cx="12" cy="12" r="2"></circle>
              </svg>
              <span className="flex-grow">Tokens</span>
            </a>
            
            <a href="#" className="flex items-center w-full h-[42px] px-3 no-underline text-black/90 text-sm font-normal rounded-md cursor-pointer transition-colors hover:bg-black/[0.04]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 mr-3 ml-1 opacity-70 grayscale brightness-50">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="9" y1="3" x2="9" y2="21"></line>
              </svg>
              <span className="flex-grow">Layout</span>
            </a>
          </div>

          <div className="mb-6 flex flex-col gap-0.5">
            <p className="text-black/55 text-xs font-semibold ml-8 mb-1 uppercase">RECURSOS</p>
            <a href="#" className="flex items-center w-full h-[42px] px-3 no-underline text-black/90 text-sm font-normal rounded-md cursor-pointer transition-colors hover:bg-black/[0.04]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 mr-3 ml-1 opacity-70 grayscale brightness-50">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
              </svg>
              <span className="flex-grow">Documentação</span>
            </a>
          </div>
        </nav>
      </aside>



      {/* Main Content */}
      <main className="ml-64 mt-0 p-0 w-[calc(100%-16rem)] h-screen overflow-y-auto flex justify-center bg-[#ededed]">
        <div className="w-full max-w-[800px] py-12 px-6 flex flex-col items-center">
          
          {/* ========== DESIGN TOKENS ========== */}
          
          {selectedSection === "tokens-colors" && (
            <div className="w-full">
              <h2 className="text-2xl font-semibold text-black/90 mb-2">Cores</h2>
              <p className="text-sm text-black/55 mb-8">Paleta de cores do sistema Andes Design System</p>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-black/90 mb-4">Cores Primárias</h3>
                  
                  {/* Primary Yellow */}
                  <div className="mb-6">
                    <div className="text-sm font-semibold text-black/90 mb-3">Primary (Yellow)</div>
                    <div className="flex gap-2">
                      {[
                        { name: '900', hex: '#665900', var: '--andes-primary-900' },
                        { name: '800', hex: '#997a00', var: '--andes-primary-800' },
                        { name: '700', hex: '#b38f00', var: '--andes-primary-700' },
                        { name: '600', hex: '#cca300', var: '--andes-primary-600' },
                        { name: '500', hex: '#e6b800', var: '--andes-primary-500' },
                        { name: '400', hex: '#ffe600', var: '--andes-primary' },
                        { name: '300', hex: '#ffeb33', var: '--andes-primary-300' },
                        { name: '200', hex: '#fff066', var: '--andes-primary-200' },
                        { name: '100', hex: '#fff599', var: '--andes-primary-100' },
                        { name: '50', hex: '#fffacc', var: '--andes-primary-50' },
                      ].map((color) => (
                        <div key={color.hex} className="flex-1">
                          <div style={{ 
                            width: '100%', 
                            height: '80px', 
                            backgroundColor: color.hex, 
                            borderRadius: '6px', 
                            border: color.name === '400' ? '3px solid #000' : '1px solid rgba(0,0,0,0.1)',
                            boxShadow: color.name === '400' ? '0 0 0 2px #ffe600' : 'none'
                          }}></div>
                          <div className="mt-2 text-center">
                            <div className="text-xs font-semibold text-black/90">
                              {color.name}
                              {color.name === '400' && <span className="ml-1 text-[10px] bg-black text-white px-1 py-0.5 rounded">MAIN</span>}
                            </div>
                            <div className="text-xs text-black/55">{color.hex}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Secondary Blue */}
                  <div className="mb-6">
                    <div className="text-sm font-semibold text-black/90 mb-3">Secondary (Blue)</div>
                    <div className="flex gap-2">
                      {[
                        { name: '900', hex: '#1a3464', var: '--andes-secondary-900' },
                        { name: '800', hex: '#284d96', var: '--andes-secondary-800' },
                        { name: '700', hex: '#2e60b4', var: '--andes-secondary-700' },
                        { name: '600', hex: '#3173d2', var: '--andes-secondary-600' },
                        { name: '500', hex: '#3483fa', var: '--andes-secondary' },
                        { name: '400', hex: '#5d9bfb', var: '--andes-secondary-400' },
                        { name: '300', hex: '#86b3fc', var: '--andes-secondary-300' },
                        { name: '200', hex: '#afcbfd', var: '--andes-secondary-200' },
                        { name: '100', hex: '#d7e3fe', var: '--andes-secondary-100' },
                        { name: '50', hex: '#ebf1ff', var: '--andes-secondary-50' },
                      ].map((color) => (
                        <div key={color.hex} className="flex-1">
                          <div style={{ 
                            width: '100%', 
                            height: '80px', 
                            backgroundColor: color.hex, 
                            borderRadius: '6px', 
                            border: color.name === '500' ? '3px solid #000' : '1px solid rgba(0,0,0,0.1)',
                            boxShadow: color.name === '500' ? '0 0 0 2px #3483fa' : 'none'
                          }}></div>
                          <div className="mt-2 text-center">
                            <div className="text-xs font-semibold text-black/90">
                              {color.name}
                              {color.name === '500' && <span className="ml-1 text-[10px] bg-black text-white px-1 py-0.5 rounded">MAIN</span>}
                            </div>
                            <div className="text-xs text-black/55">{color.hex}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Meli+ Purple */}
                  <div className="mb-6">
                    <div className="text-sm font-semibold text-black/90 mb-3">Meli+ (Purple)</div>
                    <div className="flex gap-2">
                      {[
                        { name: '900', hex: '#3a0e44', var: '--andes-meliplus-900' },
                        { name: '800', hex: '#571566', var: '--andes-meliplus-800' },
                        { name: '700', hex: '#6e1b88', var: '--andes-meliplus-700' },
                        { name: '600', hex: '#7b1f99', var: '--andes-meliplus-600' },
                        { name: '500', hex: '#8e24aa', var: '--andes-meliplus' },
                        { name: '400', hex: '#a550bb', var: '--andes-meliplus-400' },
                        { name: '300', hex: '#bc7ccc', var: '--andes-meliplus-300' },
                        { name: '200', hex: '#d3a8dd', var: '--andes-meliplus-200' },
                        { name: '100', hex: '#ead4ee', var: '--andes-meliplus-100' },
                        { name: '50', hex: '#f5e9f6', var: '--andes-meliplus-50' },
                      ].map((color) => (
                        <div key={color.hex} className="flex-1">
                          <div style={{ 
                            width: '100%', 
                            height: '80px', 
                            backgroundColor: color.hex, 
                            borderRadius: '6px', 
                            border: color.name === '500' ? '3px solid #000' : '1px solid rgba(0,0,0,0.1)',
                            boxShadow: color.name === '500' ? '0 0 0 2px #8e24aa' : 'none'
                          }}></div>
                          <div className="mt-2 text-center">
                            <div className="text-xs font-semibold text-black/90">
                              {color.name}
                              {color.name === '500' && <span className="ml-1 text-[10px] bg-black text-white px-1 py-0.5 rounded">MAIN</span>}
                            </div>
                            <div className="text-xs text-black/55">{color.hex}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-black/90 mb-4">Cores de Estado</h3>
                  
                  {/* Success Green */}
                  <div className="mb-6">
                    <div className="text-sm font-semibold text-black/90 mb-3">Success (Green)</div>
                    <div className="flex gap-2">
                      {[
                        { name: '900', hex: '#004220', var: '--andes-success-900' },
                        { name: '800', hex: '#006330', var: '--andes-success-800' },
                        { name: '700', hex: '#008440', var: '--andes-success-700' },
                        { name: '600', hex: '#009548', var: '--andes-success-600' },
                        { name: '500', hex: '#00a650', var: '--andes-success' },
                        { name: '400', hex: '#33b873', var: '--andes-success-400' },
                        { name: '300', hex: '#66ca96', var: '--andes-success-300' },
                        { name: '200', hex: '#99dcb9', var: '--andes-success-200' },
                        { name: '100', hex: '#cceedc', var: '--andes-success-100' },
                        { name: '50', hex: '#e5f6ed', var: '--andes-success-50' },
                      ].map((color) => (
                        <div key={color.hex} className="flex-1">
                          <div style={{ width: '100%', height: '80px', backgroundColor: color.hex, borderRadius: '6px', border: '1px solid rgba(0,0,0,0.1)' }}></div>
                          <div className="mt-2 text-center">
                            <div className="text-xs font-semibold text-black/90">{color.name}</div>
                            <div className="text-xs text-black/55">{color.hex}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Warning Orange */}
                  <div className="mb-6">
                    <div className="text-sm font-semibold text-black/90 mb-3">Warning (Orange)</div>
                    <div className="flex gap-2">
                      {[
                        { name: '900', hex: '#663014', var: '--andes-warning-900' },
                        { name: '800', hex: '#99481e', var: '--andes-warning-800' },
                        { name: '700', hex: '#cc6028', var: '--andes-warning-700' },
                        { name: '600', hex: '#e66a2d', var: '--andes-warning-600' },
                        { name: '500', hex: '#ff7733', var: '--andes-warning' },
                        { name: '400', hex: '#ff925c', var: '--andes-warning-400' },
                        { name: '300', hex: '#ffad85', var: '--andes-warning-300' },
                        { name: '200', hex: '#ffc8ad', var: '--andes-warning-200' },
                        { name: '100', hex: '#ffe3d6', var: '--andes-warning-100' },
                        { name: '50', hex: '#fff1ea', var: '--andes-warning-50' },
                      ].map((color) => (
                        <div key={color.hex} className="flex-1">
                          <div style={{ width: '100%', height: '80px', backgroundColor: color.hex, borderRadius: '6px', border: '1px solid rgba(0,0,0,0.1)' }}></div>
                          <div className="mt-2 text-center">
                            <div className="text-xs font-semibold text-black/90">{color.name}</div>
                            <div className="text-xs text-black/55">{color.hex}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Error Red */}
                  <div className="mb-6">
                    <div className="text-sm font-semibold text-black/90 mb-3">Error (Red)</div>
                    <div className="flex gap-2">
                      {[
                        { name: '900', hex: '#611820', var: '--andes-error-900' },
                        { name: '800', hex: '#912430', var: '--andes-error-800' },
                        { name: '700', hex: '#c13040', var: '--andes-error-700' },
                        { name: '600', hex: '#da3747', var: '--andes-error-600' },
                        { name: '500', hex: '#f23d4f', var: '--andes-error' },
                        { name: '400', hex: '#f56472', var: '--andes-error-400' },
                        { name: '300', hex: '#f78b95', var: '--andes-error-300' },
                        { name: '200', hex: '#fab2b9', var: '--andes-error-200' },
                        { name: '100', hex: '#fcd9dc', var: '--andes-error-100' },
                        { name: '50', hex: '#feeced', var: '--andes-error-50' },
                      ].map((color) => (
                        <div key={color.hex} className="flex-1">
                          <div style={{ width: '100%', height: '80px', backgroundColor: color.hex, borderRadius: '6px', border: '1px solid rgba(0,0,0,0.1)' }}></div>
                          <div className="mt-2 text-center">
                            <div className="text-xs font-semibold text-black/90">{color.name}</div>
                            <div className="text-xs text-black/55">{color.hex}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-black/90 mb-4">Escala de Cinzas</h3>
                  <div className="flex gap-2">
                    {[
                      { name: '0', hex: '#ffffff', var: '--andes-gray-0' },
                      { name: '100', hex: '#f5f5f5', var: '--andes-gray-100' },
                      { name: '200', hex: '#ededed', var: '--andes-gray-200' },
                      { name: '300', hex: '#e5e5e5', var: '--andes-gray-300' },
                      { name: '400', hex: '#cccccc', var: '--andes-gray-400' },
                      { name: '500', hex: '#999999', var: '--andes-gray-500' },
                      { name: '600', hex: '#666666', var: '--andes-gray-600' },
                      { name: '700', hex: '#484848', var: '--andes-gray-700' },
                      { name: '800', hex: '#333333', var: '--andes-gray-800' },
                      { name: '900', hex: '#000000', var: '--andes-gray-900' },
                    ].map((color) => (
                      <div key={color.hex} className="flex-1">
                        <div style={{ width: '100%', height: '80px', backgroundColor: color.hex, borderRadius: '6px', border: '1px solid rgba(0,0,0,0.1)' }}></div>
                        <div className="mt-2 text-center">
                          <div className="text-xs font-semibold text-black/90">{color.name}</div>
                          <div className="text-xs text-black/55">{color.hex}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedSection === "tokens-typography" && (
            <div className="w-full">
              <h2 className="text-2xl font-semibold text-black/90 mb-2">Tipografia</h2>
              <p className="text-sm text-black/55 mb-8">Escala tipográfica e fontes do sistema</p>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-semibold text-black/90 mb-4">Família de Fonte</h3>
                  <div className="bg-white rounded-xl p-6 border border-gray-200">
                    <p className="text-3xl" style={{ fontFamily: 'Proxima Nova, -apple-system, Roboto, Arial, sans-serif' }}>
                      Proxima Nova
                    </p>
                    <p className="text-sm text-black/55 mt-2">Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww Xx Yy Zz</p>
                    <p className="text-xs text-black/40 mt-3">--andes-font-family: Proxima Nova, -apple-system, Roboto, Arial, sans-serif</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-black/90 mb-4">Tamanhos</h3>
                  <div className="space-y-4">
                    <div className="bg-white rounded-xl p-4 border border-gray-200 flex items-center justify-between">
                      <span style={{ fontSize: '12px' }}>Extra Small (12px)</span>
                      <span className="text-xs text-black/40">--andes-font-size-xs</span>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-gray-200 flex items-center justify-between">
                      <span style={{ fontSize: '14px' }}>Small (14px)</span>
                      <span className="text-xs text-black/40">--andes-font-size-s</span>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-gray-200 flex items-center justify-between">
                      <span style={{ fontSize: '16px' }}>Medium (16px)</span>
                      <span className="text-xs text-black/40">--andes-font-size-m</span>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-gray-200 flex items-center justify-between">
                      <span style={{ fontSize: '18px' }}>Large (18px)</span>
                      <span className="text-xs text-black/40">--andes-font-size-l</span>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-gray-200 flex items-center justify-between">
                      <span style={{ fontSize: '24px' }}>Extra Large (24px)</span>
                      <span className="text-xs text-black/40">--andes-font-size-xl</span>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-gray-200 flex items-center justify-between">
                      <span style={{ fontSize: '32px' }}>XXL (32px)</span>
                      <span className="text-xs text-black/40">--andes-font-size-xxl</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedSection === "tokens-spacing" && (
            <div className="w-full">
              <h2 className="text-2xl font-semibold text-black/90 mb-2">Espaçamento</h2>
              <p className="text-sm text-black/55 mb-8">Sistema de espaçamento consistente baseado em múltiplos de 4px</p>
              
              <div className="space-y-4">
                {[
                  { value: '4px', var: '--andes-spacing-4' },
                  { value: '8px', var: '--andes-spacing-8' },
                  { value: '12px', var: '--andes-spacing-12' },
                  { value: '16px', var: '--andes-spacing-16' },
                  { value: '20px', var: '--andes-spacing-20' },
                  { value: '24px', var: '--andes-spacing-24' },
                  { value: '32px', var: '--andes-spacing-32' },
                  { value: '40px', var: '--andes-spacing-40' },
                  { value: '48px', var: '--andes-spacing-48' },
                ].map((spacing) => (
                  <div key={spacing.value} className="bg-white rounded-xl p-4 border border-gray-200">
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-sm font-semibold text-black/90">{spacing.value}</div>
                      <div className="text-xs text-black/40">{spacing.var}</div>
                    </div>
                    <div style={{ width: spacing.value, height: '24px', backgroundColor: '#3483fa', borderRadius: '4px' }}></div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedSection === "tokens-radius" && (
            <div className="w-full">
              <h2 className="text-2xl font-semibold text-black/90 mb-2">Raio das Bordas</h2>
              <p className="text-sm text-black/55 mb-8">Valores de border-radius para diferentes elementos</p>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-6 border border-gray-200 text-center">
                  <div style={{ width: '100px', height: '100px', backgroundColor: '#3483fa', borderRadius: '4px', margin: '0 auto 12px' }}></div>
                  <div className="text-sm font-semibold text-black/90">Small</div>
                  <div className="text-xs text-black/55">4px</div>
                  <div className="text-xs text-black/40">--andes-radius-sm</div>
                </div>
                
                <div className="bg-white rounded-xl p-6 border border-gray-200 text-center">
                  <div style={{ width: '100px', height: '100px', backgroundColor: '#3483fa', borderRadius: '6px', margin: '0 auto 12px' }}></div>
                  <div className="text-sm font-semibold text-black/90">Medium</div>
                  <div className="text-xs text-black/55">6px</div>
                  <div className="text-xs text-black/40">--andes-radius-md</div>
                </div>
                
                <div className="bg-white rounded-xl p-6 border border-gray-200 text-center">
                  <div style={{ width: '100px', height: '100px', backgroundColor: '#3483fa', borderRadius: '8px', margin: '0 auto 12px' }}></div>
                  <div className="text-sm font-semibold text-black/90">Large</div>
                  <div className="text-xs text-black/55">8px</div>
                  <div className="text-xs text-black/40">--andes-radius-lg</div>
                </div>
                
                <div className="bg-white rounded-xl p-6 border border-gray-200 text-center">
                  <div style={{ width: '100px', height: '50px', backgroundColor: '#3483fa', borderRadius: '2rem', margin: '25px auto 12px' }}></div>
                  <div className="text-sm font-semibold text-black/90">Pill</div>
                  <div className="text-xs text-black/55">2rem</div>
                  <div className="text-xs text-black/40">--andes-radius-pill</div>
                </div>
              </div>
            </div>
          )}

          {selectedSection === "tokens-shadows" && (
            <div className="w-full">
              <h2 className="text-2xl font-semibold text-black/90 mb-2">Sombras</h2>
              <p className="text-sm text-black/55 mb-8">Níveis de elevação para criar hierarquia visual</p>
              
              <div className="space-y-6">
                <div className="bg-[#f5f5f5] rounded-xl p-8 flex items-center justify-center">
                  <div style={{ 
                    width: '200px', 
                    height: '120px', 
                    backgroundColor: '#ffffff', 
                    borderRadius: '8px',
                    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, .08)'
                  }} className="flex items-center justify-center flex-col">
                    <div className="text-sm font-semibold text-black/90">Shadow Small</div>
                    <div className="text-xs text-black/40 mt-1">--andes-shadow-sm</div>
                    <div className="text-xs text-black/55 mt-2">0 1px 2px rgba(0,0,0,.08)</div>
                  </div>
                </div>

                <div className="bg-[#f5f5f5] rounded-xl p-8 flex items-center justify-center">
                  <div style={{ 
                    width: '200px', 
                    height: '120px', 
                    backgroundColor: '#ffffff', 
                    borderRadius: '8px',
                    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, .12), 0 2px 4px 0 rgba(0, 0, 0, .08)'
                  }} className="flex items-center justify-center flex-col">
                    <div className="text-sm font-semibold text-black/90">Shadow Medium</div>
                    <div className="text-xs text-black/40 mt-1">--andes-shadow-md</div>
                    <div className="text-xs text-black/55 mt-2 px-4 text-center">0 4px 8px rgba(0,0,0,.12)</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========== COMPONENTS ========== */}
          
          {selectedSection === "overview" && (
            <div className="text-center mt-20">
              <div className="mb-6">
                <svg className="w-[120px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200">
                  <g fill="none" fillRule="evenodd">
                    <g transform="translate(-620 -241) translate(620 241)">
                      <path fill="#EEE" stroke="#FFF" strokeWidth="3" d="M105.864 13.25c6.213 0 11.838 2.519 15.91 6.59 4.071 4.072 6.59 9.697 6.59 15.91h0v80.858l11.355.001c1.518 0 2.893-.615 3.889-1.61.995-.996 1.61-2.371 1.61-3.89h0V81.75c0-2.07.84-3.946 2.197-5.303 1.357-1.357 3.232-2.197 5.304-2.197h1.145c2.07 0 3.946.84 5.303 2.197 1.357 1.357 2.197 3.232 2.197 5.303h0v38c0 2.9-1.175 5.525-3.076 7.425-1.9 1.9-4.525 3.075-7.424 3.075h0-22.5v33h-45v-60h-28.5c-2.851 0-5.437-1.136-7.33-2.98-1.892-1.846-3.091-4.4-3.166-7.234h0l-.004-52.286c0-2.03.807-3.873 2.118-5.224 1.311-1.35 3.126-2.209 5.141-2.272h0l1.3-.004c2.03 0 3.873.807 5.223 2.119 1.35 1.31 2.209 3.124 2.273 5.139h0l.003 43.513c0 1.47.576 2.804 1.515 3.79.952 1.001 2.277 1.643 3.752 1.705h0l17.675.005V35.75c0-6.214 2.518-11.839 6.59-15.91 4.072-4.072 9.697-6.59 15.91-6.59z" transform="translate(47.136 15.25)"></path>
                    </g>
                  </g>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-black/90 m-0 mb-2">Andes Design System</h3>
              <p className="text-base font-normal text-black/55 m-0">
                Sistema de design completo com componentes, tokens e padrões de interface do Mercado Livre.
              </p>
            </div>
          )}

          {selectedSection === "buttons" && (
            <div className="w-full">
              <h2 className="text-2xl font-semibold text-black/90 mb-2">Botões</h2>
              <p className="text-sm text-black/55 mb-8">Componentes de ação primária e secundária usando AndesButton</p>
              
              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                <AndesButton variant="action">Comprar agora</AndesButton>
                <AndesButton variant="primary">Assinar Meli+</AndesButton>
                <AndesButton variant="transparent">Adicionar ao carrinho</AndesButton>
                <AndesButton variant="primary" disabled>Desabilitado</AndesButton>
                <AndesButton variant="link">Link simples</AndesButton>
              </div>
            </div>
          )}

          {selectedSection === "label" && (
            <div className="w-full">
              <h2 className="text-2xl font-semibold text-black/90 mb-2">Label</h2>
              <p className="text-sm text-black/55 mb-8">Rótulos para campos de formulário usando AndesLabel</p>
              
              <div className="space-y-8">
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <h3 className="text-sm font-semibold text-black/90 mb-4">Exemplo Básico</h3>
                  <div className="space-y-4">
                    <AndesLabel htmlFor="example1">Nome completo</AndesLabel>
                    <AndesInput id="example1" type="text" placeholder="Digite seu nome" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedSection === "formgroup" && (
            <div className="w-full">
              <h2 className="text-2xl font-semibold text-black/90 mb-2">Form Group</h2>
              <p className="text-sm text-black/55 mb-8">Agrupamento de label e input usando AndesFormGroup</p>
              
              <div className="space-y-8">
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <h3 className="text-sm font-semibold text-black/90 mb-4">Exemplo</h3>
                  <div className="space-y-4">
                    <AndesFormGroup label="Email" htmlFor="email">
                      <AndesInput id="email" type="email" placeholder="seu@email.com" />
                    </AndesFormGroup>
                    <AndesFormGroup label="Senha" htmlFor="password">
                      <AndesInput id="password" type="password" placeholder="••••••••" />
                    </AndesFormGroup>
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedSection === "switch" && (
            <div className="w-full">
              <h2 className="text-2xl font-semibold text-black/90 mb-2">Switch</h2>
              <p className="text-sm text-black/55 mb-8">Toggle switch para opções on/off usando AndesSwitch</p>
              
              <div className="space-y-8">
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <h3 className="text-sm font-semibold text-black/90 mb-4">Interativo</h3>
                  <div className="space-y-4">
                    <AndesSwitch
                      id="switch1"
                      label="Receber notificações por email"
                      checked={switchState}
                      onChange={setSwitchState}
                    />
                    <AndesSwitch
                      id="switch2"
                      label="Ativar modo escuro"
                      checked={false}
                    />
                    <AndesSwitch
                      id="switch3"
                      label="Opção habilitada"
                      checked={true}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedSection === "inputs" && (
            <div className="w-full">
              <h2 className="text-2xl font-semibold text-black/90 mb-2">Inputs</h2>
              <p className="text-sm text-black/55 mb-8">Campos de entrada de dados usando AndesInput</p>
              
              <div className="space-y-8">
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <h3 className="text-sm font-semibold text-black/90 mb-4">Text Input</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-black/70 mb-2">Label</label>
                      <AndesInput type="text" placeholder="Digite algo..." />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-black/70 mb-2">Email</label>
                      <AndesInput type="email" placeholder="seu@email.com" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-black/70 mb-2">Password</label>
                      <AndesInput type="password" placeholder="••••••••" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <h3 className="text-sm font-semibold text-black/90 mb-4">Estados</h3>
                  <div className="space-y-4">
                    <AndesInput type="text" placeholder="Normal" />
                    <AndesInput type="text" placeholder="Desabilitado" disabled />
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedSection === "cards" && (
            <div className="w-full">
              <h2 className="text-2xl font-semibold text-black/90 mb-2">Cards</h2>
              <p className="text-sm text-black/55 mb-8">Containers para conteúdo usando AndesCard</p>
              
              <div className="space-y-8">
                <div className="bg-[#f5f5f5] rounded-xl p-6">
                  <h3 className="text-sm font-semibold text-black/90 mb-4">Card Padrão</h3>
                  <AndesCard className="p-6">
                    <h3 className="text-lg font-semibold text-black/90 mb-2">Título do Card</h3>
                    <p className="text-sm text-black/55 mb-4">
                      Este é um card padrão com título, descrição e bordas arredondadas.
                    </p>
                    <AndesButton variant="primary">Ação</AndesButton>
                  </AndesCard>
                </div>

                <div className="bg-[#f5f5f5] rounded-xl p-6">
                  <h3 className="text-sm font-semibold text-black/90 mb-4">Card com Imagem</h3>
                  <AndesCard className="overflow-hidden">
                    <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-black/90 mb-2">Card Visual</h3>
                      <p className="text-sm text-black/55">Card com área de destaque visual no topo.</p>
                    </div>
                  </AndesCard>
                </div>
              </div>
            </div>
          )}

          {selectedSection === "badges" && (
            <div className="w-full">
              <h2 className="text-2xl font-semibold text-black/90 mb-2">Badges</h2>
              <p className="text-sm text-black/55 mb-8">Indicadores de status e categorias usando AndesBadge</p>
              
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
                <AndesBadge variant="promo">15% OFF</AndesBadge>
                <AndesBadge variant="full">⚡ FULL</AndesBadge>
                <AndesBadge variant="bestseller">1º MAIS VENDIDO</AndesBadge>
                <AndesBadge variant="new">NOVO</AndesBadge>
              </div>
            </div>
          )}

          {selectedSection === "carousel" && (
            <div className="w-full">
              <h2 className="text-2xl font-semibold text-black/90 mb-2">Carousel</h2>
              <p className="text-sm text-black/55 mb-8">Componente de carrossel horizontal usando AndesCarousel</p>
              
              <div className="space-y-8">
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <h3 className="text-sm font-semibold text-black/90 mb-4">Exemplo</h3>
                  <AndesCarousel>
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                      <div key={item} className="min-w-[200px] h-[200px] bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center text-white text-2xl font-bold mr-4">
                        Item {item}
                      </div>
                    ))}
                  </AndesCarousel>
                </div>
              </div>
            </div>
          )}

          {selectedSection === "dropdown" && (
            <div className="w-full">
              <h2 className="text-2xl font-semibold text-black/90 mb-2">Dropdown Menu</h2>
              <p className="text-sm text-black/55 mb-8">Menu suspenso com múltiplos níveis usando AndesDropdownMenu</p>
              
              <div className="space-y-8">
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <h3 className="text-sm font-semibold text-black/90 mb-4">Exemplo Básico</h3>
                  <div className="flex gap-4">
                    <AndesDropdownMenu
                      label="Categorias"
                      items={[
                        { id: "1", label: "Eletrônicos", href: "#" },
                        { id: "2", label: "Moda", href: "#" },
                        { id: "3", label: "Casa", href: "#" },
                      ]}
                    />
                    <AndesDropdownMenu
                      label="Ofertas"
                      items={[
                        { id: "1", label: "Ofertas do Dia", href: "#" },
                        { id: "2", label: "Cupons", href: "#" },
                      ]}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedSection === "filtertag" && (
            <div className="w-full">
              <h2 className="text-2xl font-semibold text-black/90 mb-2">Filter Tag</h2>
              <p className="text-sm text-black/55 mb-8">Tags de filtro removíveis usando AndesFilterTag</p>
              
              <div className="space-y-8">
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <h3 className="text-sm font-semibold text-black/90 mb-4">Com Botão de Remoção</h3>
                  <div className="flex gap-2 flex-wrap">
                    <AndesFilterTag label="Eletrônicos" onRemove={() => alert("Removido!")} />
                    <AndesFilterTag label="Acima de R$ 100" onRemove={() => alert("Removido!")} />
                    <AndesFilterTag label="Frete Grátis" onRemove={() => alert("Removido!")} />
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <h3 className="text-sm font-semibold text-black/90 mb-4">Sem Remoção</h3>
                  <div className="flex gap-2 flex-wrap">
                    <AndesFilterTag label="Categoria Principal" />
                    <AndesFilterTag label="Região" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedSection === "emptystate" && (
            <div className="w-full">
              <h2 className="text-2xl font-semibold text-black/90 mb-2">Empty State</h2>
              <p className="text-sm text-black/55 mb-8">Estados vazios para feedback visual usando AndesEmptyState</p>
              
              <div className="space-y-8">
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <h3 className="text-sm font-semibold text-black/90 mb-4">Com Descrição</h3>
                  <AndesEmptyState
                    icon={
                      <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                      </svg>
                    }
                    title="Nenhum resultado encontrado"
                    description="Tente ajustar os filtros ou fazer uma nova busca."
                  />
                </div>

                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <h3 className="text-sm font-semibold text-black/90 mb-4">Apenas Título</h3>
                  <AndesEmptyState
                    title="Sua sacola está vazia"
                  />
                </div>
              </div>
            </div>
          )}

          {selectedSection === "categorycard" && (
            <div className="w-full">
              <h2 className="text-2xl font-semibold text-black/90 mb-2">Category Card</h2>
              <p className="text-sm text-black/55 mb-8">Cards de categorias com imagem usando AndesCategoryCard</p>
              
              <div className="space-y-8">
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <h3 className="text-sm font-semibold text-black/90 mb-4">Exemplos</h3>
                  <div className="flex gap-4 flex-wrap">
                    <AndesCategoryCard
                      imageUrl="https://http2.mlstatic.com/D_NQ_NP_2X_825305-MLA53279943458_012023-F.webp"
                      text="Eletrônicos"
                      href="#"
                    />
                    <AndesCategoryCard
                      imageUrl="https://http2.mlstatic.com/D_NQ_NP_2X_825305-MLA53279943458_012023-F.webp"
                      text="Moda"
                      href="#"
                    />
                    <AndesCategoryCard
                      imageUrl="https://http2.mlstatic.com/D_NQ_NP_2X_825305-MLA53279943458_012023-F.webp"
                      text="Casa e Jardim"
                      href="#"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedSection === "money" && (
            <div className="w-full">
              <h2 className="text-2xl font-semibold text-black/90 mb-2">Money</h2>
              <p className="text-sm text-black/55 mb-8">Componente para exibir valores monetários usando AndesMoney</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div>
                  <p style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>Preço completo com centavos</p>
                  <AndesMoney amount={1899} cents="90" />
                </div>
                <div>
                  <p style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>Com desconto</p>
                  <AndesMoney amount={2499} cents="00" discount="15% OFF" />
                </div>
                <div>
                  <p style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>Com preço riscado</p>
                  <AndesMoney amount={1999} cents="90" strikeThrough />
                  <AndesMoney amount={1699} cents="90" discount="15% OFF" />
                </div>
                <div>
                  <p style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>Tamanho grande</p>
                  <AndesMoney amount={3499} cents="00" size="large" />
                </div>
              </div>
            </div>
          )}

          {selectedSection === "modal" && (
            <div className="w-full">
              <h2 className="text-2xl font-semibold text-black/90 mb-2">Modal</h2>
              <p className="text-sm text-black/55 mb-8">Diálogo modal usando AndesModal</p>
              
              <div className="space-y-8">
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <h3 className="text-sm font-semibold text-black/90 mb-4">Exemplo</h3>
                  <AndesButton variant="primary" onClick={() => setShowModal(true)}>
                    Abrir Modal
                  </AndesButton>
                  
                  <AndesModal isOpen={showModal} onClose={() => setShowModal(false)}>
                    <div className="p-8">
                      <h3 className="text-xl font-semibold text-black/90 mb-4">Título do Modal</h3>
                      <p className="text-sm text-black/70 mb-6">
                        Este é um exemplo de modal usando o componente AndesModal. Você pode clicar fora ou pressionar ESC para fechar.
                      </p>
                      <div className="flex gap-3">
                        <AndesButton variant="primary" onClick={() => setShowModal(false)}>
                          Confirmar
                        </AndesButton>
                        <AndesButton variant="transparent" onClick={() => setShowModal(false)}>
                          Cancelar
                        </AndesButton>
                      </div>
                    </div>
                  </AndesModal>
                </div>
              </div>
            </div>
          )}

          {selectedSection === "spinner" && (
            <div className="w-full">
              <h2 className="text-2xl font-semibold text-black/90 mb-2">Spinner</h2>
              <p className="text-sm text-black/55 mb-8">Indicador de carregamento usando AndesSpinner</p>
              
              <div className="andes-loading-container">
                <AndesSpinner />
                <div className="andes-loading-text">Mais alguns segundos...</div>
              </div>
            </div>
          )}

          {selectedSection === "gridcard" && (
            <div className="w-full">
              <h2 className="text-2xl font-semibold text-black/90 mb-2">Grid Card</h2>
              <p className="text-sm text-black/55 mb-8">Cards de produto para listagens usando AndesGridCard</p>
              
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <AndesGridCard
                  imageUrl="https://http2.mlstatic.com/D_Q_NP_2X_803645-MLA95971342776_102025-E.webp"
                  badgeText="MAIS VENDIDO"
                  title="Smartphone Samsung Galaxy A54 5G"
                  price={1899}
                  priceCents="90"
                  discount="15% OFF"
                  shippingText="Frete grátis"
                />
                <AndesGridCard
                  imageUrl="https://http2.mlstatic.com/D_Q_NP_2X_825305-MLA53279943458_012023-F.webp"
                  title="Notebook Lenovo IdeaPad"
                  price={2499}
                  priceCents="00"
                  shippingText="Frete grátis"
                />
                <AndesGridCard
                  imageUrl="https://http2.mlstatic.com/D_Q_NP_2X_600898-MLA93500836737_092025-E.webp"
                  badgeText="NOVO"
                  title="Fone de Ouvido JBL Tune 520BT"
                  price={299}
                  priceCents="90"
                  shippingText="Envio normal"
                />
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AndesDesignSystemPage;
