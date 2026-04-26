/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { GoogleGenAI } from "@google/genai";
import { 
  Brain, 
  ChevronDown, 
  Globe, 
  Smartphone, 
  Zap, 
  Sparkles, 
  Layers, 
  Lock,
  ArrowRight,
  Download,
  ExternalLink,
  CheckCircle2,
  Menu,
  X,
  Search,
  MessageCircle,
  Terminal,
  Activity,
  Shield,
  HardDrive,
  Book,
  User,
  Eye,
  Lightbulb,
  FileText,
  ShieldAlert,
  Target,
  Map,
  Clock,
  Smile,
  Users,
  BarChart3,
  Moon,
  Scale,
  GraduationCap,
  Camera
} from 'lucide-react';

// Initialize Gemini (properly lazy-loaded)
let genAI: any = null;
const getGemini = () => {
  if (!genAI && process.env.GEMINI_API_KEY) {
    genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return genAI;
};

// --- Components ---

const Navbar = ({ setView, currentView }: any) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = currentView === 'home' 
    ? ['Runtime', 'Memory', 'Agents', 'Apps', 'Privacy']
    : [];

  const navigate = (view: string) => {
    setView(view);
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled || currentView === 'vision' ? 'bg-bg-deep/90 backdrop-blur-md border-b border-white/10 py-5' : 'bg-transparent py-8'
    }`}>
      <div className="container mx-auto px-12 flex items-center justify-between">
        <button 
          onClick={() => navigate('home')}
          className="flex items-center gap-3 no-underline border-none bg-transparent cursor-pointer"
        >
          <div className="w-8 h-8 bg-primary flex items-center justify-center font-bold text-xs rotate-45 text-white">
            <span className="-rotate-45">C</span>
          </div>
          <span className="font-bold text-lg tracking-[0.2em] uppercase text-white">CORE.OS</span>
        </button>

        <div className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className="text-[11px] uppercase tracking-[0.3em] font-bold text-zinc-500 hover:text-white transition-colors no-underline"
            >
              {item}
            </a>
          ))}
          <button 
            onClick={() => navigate(currentView === 'home' ? 'vision' : 'home')}
            className="text-[11px] uppercase tracking-[0.3em] font-bold text-zinc-500 hover:text-white transition-colors border-none bg-transparent cursor-pointer"
          >
            {currentView === 'home' ? 'VISION' : 'HOME'}
          </button>
          <button 
            onClick={() => navigate(currentView === 'applications' ? 'home' : 'applications')}
            className="text-[11px] uppercase tracking-[0.3em] font-bold text-zinc-500 hover:text-white transition-colors border-none bg-transparent cursor-pointer"
          >
            {currentView === 'applications' ? 'HOME' : 'APPLICATIONS'}
          </button>
          <button 
            onClick={() => navigate(currentView === 'sectors' ? 'home' : 'sectors')}
            className="text-[11px] uppercase tracking-[0.3em] font-bold text-primary hover:text-white transition-colors border-none bg-transparent cursor-pointer"
          >
            {currentView === 'sectors' ? 'HOME' : 'SECTORS'}
          </button>
          
          <div className="flex bg-surface-3 p-1 rounded-sm border border-white/5">
            <a 
              href="https://cortex-frontend-t53t.onrender.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-6 py-2 bg-white text-black text-[10px] uppercase tracking-widest font-black hover:bg-primary hover:text-white transition-all no-underline"
            >
              Web
            </a>
            <a 
              href="https://expo.dev/artifacts/eas/enUc5KavUq11GRceauQrWr.apk"
              className="px-6 py-2 text-[10px] uppercase tracking-widest font-black text-zinc-400 hover:text-white transition-all no-underline"
            >
              Android
            </a>
          </div>
        </div>

        <button className="md:hidden text-white border-none bg-transparent" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="fixed inset-0 bg-bg-deep p-12 md:hidden flex flex-col gap-8 z-50 pt-32"
          >
            <button className="absolute top-8 right-12 text-white border-none bg-transparent" onClick={() => setIsMenuOpen(false)}><X size={32}/></button>
            <button 
              onClick={() => { navigate('home'); }}
              className="text-4xl font-black uppercase tracking-tighter text-zinc-700 hover:text-white border-none bg-transparent text-left"
            >
              Home.
            </button>
            {navItems.map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                onClick={() => setIsMenuOpen(false)}
                className="text-4xl font-black uppercase tracking-tighter text-zinc-700 hover:text-white no-underline"
              >
                {item}.
              </a>
            ))}
            <button 
              onClick={() => { navigate('vision'); }}
              className="text-4xl font-black uppercase tracking-tighter text-white hover:text-primary border-none bg-transparent text-left"
            >
              Vision.
            </button>
            <button 
              onClick={() => { navigate('applications'); }}
              className="text-4xl font-black uppercase tracking-tighter text-zinc-700 hover:text-white border-none bg-transparent text-left"
            >
              Applications.
            </button>
            <button 
              onClick={() => { navigate('sectors'); }}
              className="text-4xl font-black uppercase tracking-tighter text-primary hover:text-white border-none bg-transparent text-left"
            >
              Sectors.
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const SectionHeader = ({ eyebrow, title, description, dark = true }: any) => (
  <div className="mb-24">
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="flex items-center gap-4 mb-6"
    >
      <span className="w-12 h-[1px] bg-primary"></span>
      <span className="text-primary text-[10px] font-mono uppercase tracking-[0.4em] font-bold">
        {eyebrow}
      </span>
    </motion.div>
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      className={`font-black text-6xl md:text-8xl leading-[0.85] tracking-tighter mb-10 uppercase italic ${dark ? 'text-white' : 'text-bg-deep'}`}
    >
      {title}
    </motion.h2>
    <motion.p 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2 }}
      className={`max-w-xl text-lg leading-relaxed font-light ${dark ? 'text-white/40' : 'text-zinc-500'}`}
    >
      {description}
    </motion.p>
  </div>
);

const InteractiveDemo = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [activeAgent, setActiveAgent] = useState('MASTER_OS');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsTyping(true);
    setResponse('');
    
    try {
      const ai = getGemini();
      if (!ai) {
        setTimeout(() => {
          setActiveAgent('MASTER_OS');
          setResponse(`Analyzed query: "${query}". \n\n[P1] System Trace: Neural parity achieved. \n[P3] Wiki Plane: Entity "Context" expanded. \n[Insight]: Cognitive load within operational bounds.`);
          setIsTyping(false);
        }, 2000);
        return;
      }

      const prompt = `You are the Cortex Lab personal intelligence. A user is testing the interactive demo of the landing page. Respond as the "MASTER-OS" agent. The user query is: "${query}". Keep it short, focused on "memory" and "understanding", and sound like a sophisticated second brain. Show some [P1] or [P3] memory plane tags.`;
      
      const result = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
      });

      setResponse(result.text || "Neural connection established but no data returned.");
    } catch (error) {
      console.error(error);
      setResponse("System Error: Could not connect to the neural core. Please check your API key.");
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-24 p-1 bg-surface border border-white/5 shadow-2xl relative overflow-hidden">
      <div className="bg-bg-deep p-8 md:p-12 border border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <Brain size={160} />
        </div>

        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 border border-primary flex items-center justify-center text-primary">
              <Terminal size={18} />
            </div>
            <div>
              <h3 className="font-bold text-sm tracking-widest uppercase text-white">NEURAL EXECUTOR</h3>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                <span className="text-[10px] text-primary font-mono font-bold uppercase tracking-widest">{activeAgent}</span>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSearch} className="relative mb-10 flex border border-white/10">
          <div className="p-5 text-zinc-600"><Search size={22} /></div>
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="INPUT_COMMAND_STRING..."
            className="flex-1 bg-transparent py-5 outline-hidden text-sm uppercase tracking-widest font-bold placeholder:text-zinc-800 text-white"
          />
          <button 
            type="submit"
            disabled={isTyping}
            className="px-10 bg-primary text-white text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-colors"
          >
            {isTyping ? 'BUSY' : 'EXEC'}
          </button>
        </form>

        <div className="min-h-[160px] p-8 border border-zinc-900 bg-surface/30 font-mono text-zinc-400 text-xs leading-relaxed uppercase tracking-widest">
          {response ? response : 'AWAITING_INPUT_SIGNAL'}
        </div>
      </div>
    </div>
  );
};

const Hero = ({ setView }: any) => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-32 pb-20 overflow-hidden geometric-grid">
      <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] border border-white/5 rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-20%] left-[-5%] w-[600px] h-[600px] border border-primary/10 rounded-full pointer-events-none"></div>
      <div className="absolute top-[20%] left-[45%] w-[1px] h-[60%] bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>

      <div className="container mx-auto px-12 relative z-10 text-center md:text-left grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-8 flex flex-col justify-center">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-4 mb-10 justify-center md:justify-start"
          >
            <span className="w-12 h-[1px] bg-primary"></span>
            <span className="text-primary text-[10px] font-mono uppercase tracking-[0.4em] font-black">
              Cortex Lab v6.0 · Open Source · 100% Local · Apache 2.0
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-[48px] md:text-[90px] font-black leading-[0.9] tracking-tighter mb-12 uppercase italic text-white"
          >
            Your Second Mind.<br />
            <span className="text-zinc-700">Not a Tool. Not a Chatbot.</span><br />
            An Intelligence <span className="text-primary">That Compounds.</span>
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="max-w-2xl text-lg md:text-xl text-zinc-500 mb-16 leading-relaxed font-light mx-auto md:mx-0"
          >
            <p className="mb-6">
              Cortex Lab is a personal autonomous intelligence runtime that runs entirely on your device, remembers everything you choose to give it, builds structured knowledge about your life over time, and grows more precise about who you are with every conversation.
            </p>
            <p className="border-l-2 border-primary pl-6 italic">
              It does not forget. It does not guess. It does not belong to anyone but you.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center gap-6 justify-center md:justify-start"
          >
            <a 
              href="https://expo.dev/artifacts/eas/enUc5KavUq11GRceauQrWr.apk"
              className="px-10 py-5 bg-white text-black font-black uppercase text-sm tracking-widest hover:bg-primary hover:text-white transition-all no-underline text-center"
            >
              Download Cortex Lab →
            </a>
            <a 
              href="#demo" 
              className="px-10 py-5 border-2 border-white/10 text-white font-black uppercase text-sm tracking-widest hover:bg-white/5 transition-all no-underline text-center"
            >
              Try the Live Demo →
            </a>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex gap-8 mt-12 opacity-40 justify-center md:justify-start"
          >
            <button 
              onClick={() => setView('vision')}
              className="text-[10px] font-black uppercase tracking-[0.3em] text-white hover:text-primary no-underline transition-colors border-none bg-transparent cursor-pointer"
            >
              Read the Vision
            </button>
            <a href="#" className="text-[10px] font-black uppercase tracking-[0.3em] text-white hover:text-primary no-underline transition-colors">Join the Build</a>
          </motion.div>
        </div>
        
        <div className="col-span-12 lg:col-span-4 hidden lg:flex items-center justify-center relative">
          <div className="writing-vertical text-zinc-800 text-[10px] uppercase tracking-[0.6em] font-black pointer-events-none select-none absolute right-0 scale-y-[-1] transform">STABILITY_ENFORCED.MMXXVI</div>
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="w-[320px] h-[480px] bg-zinc-900 border border-zinc-800 rounded-sm p-8 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute -top-20 -right-20 w-48 h-48 bg-primary/20 blur-3xl"></div>
            <div className="flex justify-between items-center mb-12">
              <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
              <div className="text-[10px] uppercase tracking-widest text-zinc-500 font-black">CORE_STATUS: ACTIVE</div>
            </div>
            <div className="space-y-6 text-zinc-400 font-mono text-[10px] uppercase tracking-widest leading-relaxed">
              <div className="border-b border-white/5 pb-4">
                <span className="block text-zinc-600 mb-1">LOAD_SEQUENCE</span>
                <span className="text-white">Gemma-4-E2B-it_Verified</span>
              </div>
              <div className="border-b border-white/5 pb-4">
                <span className="block text-zinc-600 mb-1">MEMORY_PLANE</span>
                <span className="text-white">Hierarchical_5_L0</span>
              </div>
              <div className="pt-4 flex flex-col gap-4">
                <div className="flex justify-between">
                  <span>AGENTS_ACTIVE</span>
                  <span className="text-primary">17</span>
                </div>
                <div className="flex justify-between">
                  <span>SYNC_PARITY</span>
                  <span className="text-primary">100%</span>
                </div>
              </div>
            </div>
            <div className="absolute bottom-8 left-8 right-8">
               <div className="h-1 bg-white/5 w-full"><div className="h-full bg-primary w-[74%] animate-pulse"></div></div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Stats Bar */}
      <div className="absolute bottom-0 left-0 w-full border-t border-white/5 bg-bg-deep/80 backdrop-blur-sm z-20 overflow-hidden hidden md:block">
        <div className="container mx-auto px-12 py-8 flex justify-between items-center whitespace-nowrap">
          {[
            { l: 'TRAINING', v: '162,373 examples' },
            { l: 'AGENTS', v: '17 specialists' },
            { l: 'ARCHITECTURE', v: '5-plane memory' },
            { l: 'PRIVACY', v: '100% local' },
            { l: 'LICENSE', v: 'Apache 2.0' },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col gap-1">
              <span className="text-zinc-600 font-mono text-[9px] uppercase tracking-widest mb-1">{stat.l}</span>
              <span className="text-white font-black text-sm uppercase italic tracking-tighter">{stat.v}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Positioning = () => (
  <section className="py-40 bg-white text-bg-deep border-y-8 border-bg-deep">
    <div className="container mx-auto px-12 text-center md:text-left">
      <div className="grid grid-cols-12 gap-8 items-center">
        <div className="col-span-12 lg:col-span-10 lg:col-start-2">
          <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter leading-tight mb-16">
            Every AI product today treats you as <span className="text-zinc-400">a session.</span><br />
            Cortex Lab treats you as <span className="text-primary">a story</span> — one that has been unfolding since the day you started using it, one that gets richer and more accurate with every conversation, every decision, every moment you choose to capture.
          </h2>
          <div className="flex flex-col md:flex-row md:items-center gap-8">
            <span className="w-20 h-[1px] bg-bg-deep hidden md:block"></span>
            <p className="text-2xl font-light text-zinc-500 uppercase tracking-widest">
              This is not a productivity tool. <br />
              <span className="text-bg-deep font-black">This is infrastructure for understanding yourself.</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const TechStrip = () => (
  <div className="py-6 bg-surface border-b border-white/5 overflow-hidden">
    <div className="flex items-center gap-12 whitespace-nowrap px-12">
      <span className="text-primary text-[10px] font-black uppercase tracking-[0.4em] shrink-0">Built on:</span>
      <div className="flex gap-12 items-center text-zinc-500 font-mono text-[10px] uppercase tracking-[0.2em] font-bold">
        <span>Google Gemma-4-E2B-it</span>
        <span className="text-zinc-800">|</span>
        <span>QLoRA NF4 4-bit</span>
        <span className="text-zinc-800">|</span>
        <span>NVIDIA RTX 4500 Ada</span>
        <span className="text-zinc-800">|</span>
        <span>FAISS HNSW</span>
        <span className="text-zinc-800">|</span>
        <span>DuckDB</span>
        <span className="text-zinc-800">|</span>
        <span>NetworkX</span>
        <span className="text-zinc-800">|</span>
        <span>HuggingFace TRL</span>
        <span className="text-zinc-800">|</span>
        <span>CRAG · Self-RAG · FLARE</span>
      </div>
    </div>
  </div>
);

const Runtime = () => (
  <section id="runtime" className="py-32 bg-white text-bg-deep border-y-8 border-bg-deep relative overflow-hidden">
    <div className="container mx-auto px-12">
      <SectionHeader 
        dark={false}
        eyebrow="The Architecture" 
        title={<>HYPER<br /><span className="text-zinc-400">STRUCTURE.</span></>}
        description="Not a wrapper. A foundation. Cortex Lab runs a bespoke local kernel optimized for long-term intelligence compounding."
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {[
          { icon: Sparkles, title: 'FORGE', desc: 'Atomic restructuring of session data into durable schemas.' },
          { icon: Layers, title: 'STACK', desc: 'Five-plane memory isolation for extreme reliability.' },
          { icon: Lock, title: 'VAULT', desc: 'Hyper-local encryption with zero cloud touchpoints.' },
          { icon: Zap, title: 'PULSE', desc: 'Optimized neural pathways for sub-10ms logic.' },
        ].map((p, i) => (
          <motion.div 
            key={i}
            whileHover={{ y: -10 }}
            className="p-10 bg-bg-deep text-white flex flex-col gap-8 shadow-2xl"
          >
            <div className="w-12 h-12 border border-white/20 flex items-center justify-center text-primary">
              <p.icon size={28} strokeWidth={1} />
            </div>
            <div>
              <h4 className="text-2xl font-black italic uppercase mb-4">{p.title}</h4>
              <p className="text-zinc-500 text-sm leading-relaxed font-light">{p.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const Memory = () => (
  <section id="memory" className="py-32 bg-bg-deep relative border-b border-white/5">
    <div className="container mx-auto px-12">
      <SectionHeader 
        dark
        eyebrow="Intelligence Strata"
        title="CORE.MEM"
        description="Structured intelligence strata mapped for permanent extraction. Five planes of memory ranging from ephemeral sessions to longitudinal graphs."
      />

      <div className="grid grid-cols-12 gap-8">
        {[
          { p: '00', t: 'WORKING', d: 'Session-only volatile state. Instant-access.' },
          { p: '01', t: 'EVENT', d: 'The raw ledger of every system interaction.' },
          { p: '02', t: 'CLAIM', d: 'Propositions extracted from event streams.' },
          { p: '03', t: 'WIKI', d: 'Canonical markdown representation of self.' },
          { p: '04', t: 'GRAPH', d: 'The final entity-relation map of your life.' },
        ].map((item, i) => (
          <motion.div 
            key={i}
            className={`col-span-12 md:col-span-6 lg:col-span-4 p-10 bg-surface border-l-4 border-primary hover:bg-surface-3 transition-colors`}
          >
            <span className="font-mono text-zinc-600 text-xs mb-8 block font-bold tracking-widest">LAYER_{item.p}</span>
            <h4 className="text-4xl font-black text-white italic mb-4 uppercase">{item.t}</h4>
            <p className="text-zinc-500 text-sm font-light leading-relaxed mb-6">{item.d}</p>
            <div className="text-[10px] text-primary uppercase tracking-[0.3em] font-black border-t border-white/5 pt-6 flex justify-between">
              <span>Latency</span>
              <span>{i < 2 ? '0.04ms' : '1.2s'}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const Agents = () => {
  const agents = [
    { name: 'ORCHESTRATOR', desc: 'Global intent routing.' },
    { name: 'TIMELINE', desc: 'Chronological re-indexing.' },
    { name: 'CAUSAL', desc: 'Logic bridge detection.' },
    { name: 'REFLECTION', desc: 'Internal drift audit.' },
    { name: 'PLANNER', desc: 'Execution chain architect.' },
    { name: 'ARBITER', desc: 'Conflict resolution engine.' },
  ];

  return (
    <section id="agents" className="py-32 bg-[#080808]">
      <div className="container mx-auto px-12">
        <SectionHeader 
          eyebrow="Neural Lattice"
          title={<>AGENT<br /><span className="text-zinc-700">FABRIC.</span></>}
          description="A swarm of specialized kernels operating under a unified master-orchestrator. Local intelligence at scale."
        />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {agents.map((agent, i) => (
            <motion.div 
              key={i}
              className="p-12 border border-zinc-900 bg-surface/40 hover:border-primary transition-all group"
            >
              <h4 className="font-black text-3xl text-zinc-500 group-hover:text-white transition-colors mb-4 italic uppercase">{agent.name}</h4>
              <p className="text-[11px] text-zinc-600 uppercase tracking-widest font-bold">{agent.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Apps = ({ setView }: any) => {
  const apps = [
    { icon: HardDrive, name: 'FORGE', tag: 'Today' },
    { icon: Book, name: 'CHRONICLE', tag: 'Months' },
    { icon: User, name: 'MIRROR', tag: 'Months' },
    { icon: Eye, name: 'PRESENCE', tag: 'Today' },
    { icon: Search, name: 'ORACLE', tag: 'Months' },
    { icon: Lightbulb, name: 'INSIGHT', tag: 'Months' },
    { icon: FileText, name: 'NARRATIVE', tag: 'Years' },
    { icon: ShieldAlert, name: 'BEACON', tag: 'Months' },
    { icon: Target, name: 'ACCEL', tag: 'Today' },
    { icon: Map, name: 'LOCUS', tag: 'Years' },
  ];

  return (
    <section id="apps" className="py-32 bg-white text-bg-deep border-b-8 border-bg-deep">
      <div className="container mx-auto px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-24">
          <SectionHeader 
            dark={false}
            eyebrow="Applications"
            title={<>EXTRACTED<br /><span className="text-zinc-400">TOOLS.</span></>}
            description="Each tool is a purpose-built abstraction of the core runtime. Interface with the dimensions that matter most."
          />
          <button 
            onClick={() => setView('applications')}
            className="px-10 py-5 bg-bg-deep text-white font-black uppercase text-sm tracking-widest hover:bg-primary transition-all border-none cursor-pointer mb-6"
          >
            Explore Deep Applications →
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {apps.map((app, i) => (
            <motion.div 
              key={i}
              className="p-10 border border-zinc-100 hover:bg-zinc-50 transition-all group"
            >
              <div className="text-zinc-300 group-hover:text-primary mb-8 group-hover:scale-110 transition-all duration-300">
                <app.icon size={32} strokeWidth={1.5} />
              </div>
              <h4 className="font-black text-xl italic uppercase mb-2 text-bg-deep tracking-tighter">{app.name}</h4>
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-400">
                L_STRATA: {app.tag}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Privacy = () => (
  <section id="privacy" className="py-40 bg-white text-bg-deep">
    <div className="container mx-auto px-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        <div>
          <SectionHeader 
            dark={false}
            eyebrow="Zero Cloud Policy"
            title={<>TOTAL<br /><span className="text-zinc-400">ISOLATION.</span></>}
            description="The most secure data is the data that never existed outside your room. Cortex Lab is built on a physical hardware boundary."
          />
          <div className="space-y-4">
            {[
              'ON-DEVICE_ONLY_LOGGING',
              'AES-256_LOCAL_VAULT_SYSTEM',
              'ZERO_TELEMETRY_PRINCIPLE',
              'FULL_SCHEMA_EXPORTABILITY'
            ].map((tag, i) => (
              <div key={i} className="flex items-center gap-6 group">
                <span className="w-10 h-10 border border-bg-deep flex items-center justify-center font-bold text-xs group-hover:bg-bg-deep group-hover:text-white transition-all">{i+1}</span>
                <span className="text-zinc-800 text-[11px] font-black uppercase tracking-[0.4em]">{tag}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-bg-deep p-20 flex justify-center items-center relative">
          <div className="absolute top-0 right-10 p-10 opacity-10 flex flex-col gap-4">
            <div className="w-20 h-[1px] bg-white"></div>
            <div className="w-20 h-[1px] bg-white"></div>
            <div className="w-20 h-[1px] bg-white"></div>
          </div>
          <div className="w-64 h-64 border-8 border-primary rounded-full flex items-center justify-center text-primary">
            <Lock size={80} strokeWidth={1} />
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="py-20 bg-bg-deep border-t border-zinc-900">
    <div className="container mx-auto px-12">
      <div className="flex flex-col md:flex-row justify-between items-start gap-16 mb-20">
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-6 h-6 bg-primary-dark rotate-45"></div>
            <span className="font-black italic text-xl uppercase tracking-tighter text-white">CORE.OS</span>
          </div>
          <p className="max-w-xs text-zinc-600 text-xs uppercase tracking-widest font-bold leading-loose">The Future of Personal Deployment. Deeply integrated cross-platform architecture established MMXXVI.</p>
        </div>
        <div className="grid grid-cols-2 gap-20">
          <div className="flex flex-col gap-6">
            <span className="text-zinc-800 text-[10px] uppercase font-black tracking-[0.5em] mb-4">SYSTEM</span>
            {['Runtime', 'Memory', 'Security'].map(l => <a key={l} href="#" className="text-zinc-400 font-bold text-[11px] uppercase tracking-widest hover:text-white transition-colors no-underline">{l}</a>)}
          </div>
          <div className="flex flex-col gap-6">
            <span className="text-zinc-800 text-[10px] uppercase font-black tracking-[0.5em] mb-4">LEGAL</span>
            {['Privacy', 'Source', 'License'].map(l => <a key={l} href="#" className="text-zinc-400 font-bold text-[11px] uppercase tracking-widest hover:text-white transition-colors no-underline">{l}</a>)}
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center pt-20 border-t border-zinc-900 text-zinc-700 text-[10px] uppercase font-black tracking-[0.3em]">
        <span>© 2026 Cortex Lab. All Rights Reserved.</span>
        <span>Build: Alpha_6.12</span>
      </div>
    </div>
  </footer>
);

export default function App() {
  const [view, setView] = useState<'home' | 'vision' | 'applications' | 'sectors'>('home');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  return (
    <div className="min-h-screen text-bg-deep selection:bg-primary/10 selection:text-primary overflow-x-hidden">
      <Navbar setView={setView} currentView={view} />
      
      {view === 'home' && (
        <motion.div
          key="home"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Hero setView={setView} />
          <TechStrip />
          <div id="demo" className="py-12 bg-bg-deep">
            <InteractiveDemo />
          </div>
          <Positioning />
          <Runtime />
          <Memory />
          <Agents />
          <Apps setView={setView} />
          <Privacy />
          
          {/* FINAL ACTION */}
          <section className="py-40 bg-primary overflow-hidden relative border-y-8 border-bg-deep">
            <div className="absolute top-0 right-0 p-12 mix-blend-overlay opacity-30 pointer-events-none text-white">
              <Brain size={400} strokeWidth={0.5} />
            </div>
            <div className="container mx-auto px-12 relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-end">
                <div>
                  <h2 className="text-8xl md:text-[140px] font-black text-bg-deep leading-[0.75] tracking-tighter uppercase italic mb-12">
                    JOIN THE<br /><span className="text-white/40">KERNEL.</span>
                  </h2>
                  <p className="text-bg-deep/80 font-black text-[13px] uppercase tracking-[0.4em] max-w-sm mb-12">Universal synchronicity between your high-performance web interface and native Android OS.</p>
                </div>
                
                <div className="flex flex-col gap-4">
                  <a 
                    href="https://cortex-frontend-t53t.onrender.com/" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group w-full p-12 bg-bg-deep flex items-center justify-between no-underline"
                  >
                    <div>
                      <h3 className="text-white font-black text-4xl italic uppercase mb-2">WEB_INTERFACE</h3>
                      <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.3em]">Launch Local Instance</p>
                    </div>
                    <ArrowRight className="text-primary group-hover:translate-x-4 transition-transform" size={40} />
                  </a>
                  <a 
                    href="https://expo.dev/artifacts/eas/enUc5KavUq11GRceauQrWr.apk"
                    className="group w-full p-12 bg-white flex items-center justify-between no-underline"
                  >
                    <div>
                      <h3 className="text-bg-deep font-black text-4xl italic uppercase mb-2">ANDROID_OS</h3>
                      <p className="text-zinc-400 text-[10px] font-bold uppercase tracking-[0.3em]">Direct APK Binary Download</p>
                    </div>
                    <Download className="text-primary group-hover:scale-125 transition-transform" size={40} />
                  </a>
                </div>
              </div>
            </div>
          </section>
        </motion.div>
      )}

      {view === 'vision' && <VisionPage />}
      {view === 'applications' && <DeepApplicationsPage />}
      {view === 'sectors' && <SectorsPage />}

      <Footer />
    </div>
  );
}

const SectorsPage = () => {
  const sectors = [
    {
      id: "01",
      name: "EDUCATION",
      headline: "The first sector we are entering. The one that changes everything downstream.",
      description: "The current educational model asks every student to learn at the same pace, in the same sequence, with the same materials — regardless of their existing knowledge, their cognitive style, their gaps, or their readiness. The result is a system that wastes the time of the fast, loses the slow, and misses the needs of almost everyone.",
      subContent: "Cortex Lab's Personal Knowledge Amplifier, combined with the Deep Self Mirror's cognitive profile and the Gap Intelligence System's structural knowledge mapping, creates the first genuinely personalized learning system.",
      points: [
        "A student receives a knowledge gap map showing exactly which concepts are structurally weak.",
        "A teacher can query what each student's knowledge graph looks like at any point and intervene with precision.",
        "A self-directed learner identifies the single piece of knowledge that provides the most leverage."
      ],
      impact: "After six months, a student has a system that knows their learning patterns better than any teacher could, tracking how understanding evolves over time."
    },
    {
      id: "02",
      name: "MENTAL HEALTH & SELF-UNDERSTANDING",
      headline: "Honest mirrors. Not wellness theatre.",
      description: "The mental health sector is saturated with apps that offer mood tracking and generic affirmations. None of them build a genuine evidence-grounded model of how a specific person's psychology actually works.",
      subContent: "The Deep Self Mirror and the Presence Agent create a private, patient, evidence-based psychological mirror that observes actual behavioral patterns across months.",
      points: [
        "Access to honest psychological self-knowledge that previously required expensive professional relationships.",
        "Early detection of behavioral drift before it becomes crisis through user-monitored patterns.",
        "A permanent record of psychological growth that can be queried longitudinally."
      ],
      impact: "When you arrive at a therapist, you arrive with months of data and clarity instead of vague discomfort. It is the honest foundation of self-knowledge."
    },
    {
      id: "03",
      name: "RESEARCH & DEEP KNOWLEDGE WORK",
      headline: "Compounding intelligence for people whose job is to build it.",
      description: "A researcher's greatest challenge is connecting what they know across domains and remembering the insight buried in a paper from 18 months ago. These are memory and structure problems.",
      subContent: "The Personal Knowledge Amplifier and the 5-plane memory architecture create a working partner that compounds knowledge instead of losing it.",
      points: [
        "Connects new concepts to historical engagement—sometimes years earlier.",
        "Query your own intellectual history: 'How has my position on this topic evolved over three years?'",
        "Teams build a shared knowledge graph where insights are accessible to all with full provenance."
      ],
      impact: "Every paper read and every hypothesis formed becomes part of a connected knowledge graph that the system can traverse in seconds."
    },
    {
      id: "04",
      name: "HEALTHCARE & PERSONAL HEALTH INTELLIGENCE",
      headline: "Your health history is not a file. It is a causal story.",
      description: "Most health data lives in fragmented form across providers. No system has a causal view of a single person's health over years: what preceded the episodes or what correlations exist.",
      subContent: "Cortex Lab's timeline intelligence and causal agent create the foundation for a personal health record that is genuinely intelligent.",
      points: [
        "Trace causal chains across years: 'What behavioral patterns cluster around my worst flare periods?'",
        "Maintain a longitudinal record of cognitive and physical changes that point-in-time assessments miss.",
        "Identify environmental and behavioral factors correlate with mental health episodes."
      ],
      impact: "Health history becomes a causal story rather than a scattered collection of data points, allowing for genuine pattern recognition."
    },
    {
      id: "05",
      name: "CREATIVITY & ARTISTIC PRACTICE",
      headline: "A muse that knows your actual creative history.",
      description: "Creative blocks are almost never random. They correlate with emotional states, environmental conditions, and the quality of recent social interactions.",
      subContent: "The Deep Self Mirror and the Session Memory Forge build a model of your creative process that is honest about when and how you work best.",
      points: [
        "Build a longitudinal record of creative practice—process, conditions, and evolution of aesthetic.",
        "Creative blocks become analyzable through behavioral data rather than mythology.",
        "Presence Agent targets avoidance by reminding you of the last thing you made that you were proud of."
      ],
      impact: "Artists, writers, and musicians gain an evidence-based understanding of the conditions that produce their best output."
    },
    {
      id: "06",
      name: "ORGANIZATIONAL & TEAM INTELLIGENCE",
      headline: "What if a team had a memory?",
      description: "Organizations currently lose institutional knowledge every time someone leaves. Decisions made three years ago and their reasoning are inaccessible because the context has evaporated.",
      subContent: "The multi-user architecture allows a team to share a Cortex Lab instance with individual privacy zones and shared knowledge planes.",
      points: [
        "Decision records with full reasoning preserved for years.",
        "Belief evolution tracking for team-level assumptions and strategy shifts.",
        "A wiki of organizational knowledge that grows with every project rather than decaying."
      ],
      impact: "Team intelligence genuinely compounds, ensuring the same mistakes aren't made repeatedly because the system remembers the 'why'."
    },
    {
      id: "07",
      name: "SPIRITUAL PRACTICE & THE EXAMINED LIFE",
      headline: "For the ones who take the unexamined life seriously as a problem.",
      description: "The ancient imperative to know yourself has required exceptional discipline—journaling for decades, meditative practice, or a wise teacher. Most people never achieve it.",
      subContent: "Cortex Lab provides the infrastructure for honest self-examination for people who have the intention but not the time or discipline.",
      points: [
        "An external honest mirror that traditions have prescribed but few could maintain.",
        "Identify recurring personal patterns that go unnoticed across years of daily sessions.",
        "Consult the Decision Oracle to see how your past self handled similar existential crossroads."
      ],
      impact: "The system doesn't tell you to be better—it shows you honestly who you actually are and trusts you to do something with that knowledge."
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-bg-deep text-white pt-40 pb-20 overflow-hidden"
    >
      <section className="container mx-auto px-12 mb-40 relative">
        <div className="absolute top-0 right-0 p-20 opacity-5 -z-10">
          <Globe size={400} />
        </div>
        <div className="max-w-4xl">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-4 mb-10"
          >
            <span className="w-12 h-[1px] bg-primary"></span>
            <span className="text-primary text-[10px] font-mono uppercase tracking-[0.4em] font-black">
              SECTORS — DISRUPTION MAP
            </span>
          </motion.div>
          
          <h1 className="text-[50px] md:text-[80px] font-black leading-[0.85] tracking-tighter mb-16 uppercase italic">
            One System. <span className="text-zinc-700">Every Domain</span> Where Humans <span className="text-primary">Learn, Decide, and Grow.</span>
          </h1>
          
          <p className="text-2xl text-zinc-400 font-light leading-relaxed max-w-3xl border-l-2 border-white/10 pl-12">
            Cortex Lab is not built for a single market. It is built for the examined life — and every domain of human activity that involves learning, growing, deciding, and becoming is a domain this architecture eventually enters.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-12 space-y-40">
        {sectors.map((sector, i) => (
          <section key={sector.id} className="grid grid-cols-12 gap-12 group">
            <div className="col-span-12 lg:col-span-4 sticky top-40 h-fit">
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-600 block mb-6">SECTOR_{sector.id}</span>
              <h2 className="text-4xl font-black italic uppercase tracking-tighter leading-[0.9] text-white break-words">
                {sector.name.split(' & ')[0]}<br />
                <span className="text-zinc-700">{sector.name.split(' & ')[1] || ''}</span>
              </h2>
            </div>
            
            <div className="col-span-12 lg:col-span-8">
              <div className="p-12 md:p-20 border border-white/5 bg-surface/10 hover:bg-surface/20 transition-all">
                <h3 className="text-3xl font-black italic uppercase mb-12 text-primary leading-tight">
                  {sector.headline}
                </h3>
                
                <div className="space-y-10 text-xl text-zinc-400 font-light leading-relaxed">
                  <p>{sector.description}</p>
                  <p className="text-white border-l-2 border-primary pl-8 italic">{sector.subContent}</p>
                </div>
                
                <div className="mt-16 space-y-10">
                  {sector.points.map((point, idx) => (
                    <div key={idx} className="flex gap-6 items-start">
                      <div className="w-8 h-8 border border-white/10 flex items-center justify-center shrink-0 text-primary font-mono text-xs font-black">
                        {idx + 1}
                      </div>
                      <p className="text-zinc-300 text-lg font-light leading-relaxed">{point}</p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-16 p-10 bg-bg-deep border border-white/5">
                   <span className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-600 block mb-4 underline">The Compounding Effect</span>
                   <p className="text-lg text-zinc-300 font-light italic leading-relaxed">
                     "{sector.impact}"
                   </p>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      <section className="py-40 container mx-auto px-12 text-center">
        <h2 className="text-6xl md:text-[100px] font-black italic uppercase leading-[0.85] tracking-tighter mb-20">
          The Deployment of <span className="text-primary">Humanity.</span>
        </h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="px-12 py-6 border-2 border-white/10 text-white font-black uppercase text-sm tracking-[0.3em] hover:bg-white hover:text-bg-deep transition-all cursor-pointer bg-transparent"
          >
            Back to Top
          </button>
          <a 
            href="#"
            className="px-12 py-6 bg-primary text-white font-black uppercase text-sm tracking-[0.3em] hover:bg-white hover:text-bg-deep transition-all cursor-pointer no-underline"
          >
            Join the Build
          </a>
        </div>
      </section>
    </motion.div>
  );
};

const VisionPage = () => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="bg-bg-deep text-white pt-40 pb-20 overflow-hidden"
  >
    {/* Page Header */}
    <section className="container mx-auto px-12 mb-40 relative">
      <div className="absolute top-0 right-0 p-20 opacity-5 -z-10">
        <Sparkles size={400} />
      </div>
      <div className="max-w-4xl">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-4 mb-10"
        >
          <span className="w-12 h-[1px] bg-primary"></span>
          <span className="text-primary text-[10px] font-mono uppercase tracking-[0.4em] font-black">
            PAGE 1 — VISION
          </span>
        </motion.div>
        
        <h1 className="text-[60px] md:text-[120px] font-black leading-[0.85] tracking-tighter mb-16 uppercase italic">
          The Second Mind<br />
          <span className="text-zinc-700">Thesis.</span>
        </h1>
        
        <p className="text-2xl md:text-3xl text-zinc-400 font-light leading-relaxed max-w-3xl">
          We began with a question that no technology has honestly answered yet:<br />
          <span className="text-white font-medium italic">What becomes possible when an intelligence system has been watching, listening, and building structured knowledge about one specific human being — not for a session, not for a month, but for years?</span>
        </p>
        <p className="text-xl md:text-2xl text-primary font-black uppercase mt-12 tracking-widest">
          The answer changes everything about what AI is for.
        </p>
      </div>
    </section>

    {/* Section 1 */}
    <section className="py-32 border-y border-white/5 bg-surface/20">
      <div className="container mx-auto px-12">
        <div className="grid grid-cols-12 gap-12">
          <div className="col-span-12 lg:col-span-4">
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-600 block mb-6">SECTION_01</span>
            <h2 className="text-5xl font-black italic uppercase tracking-tighter leading-[0.9]">
              What years of<br /><span className="text-zinc-700">data actually</span><br />mean.
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-8 flex flex-col gap-12">
            <div className="space-y-8 text-xl text-zinc-400 font-light leading-relaxed">
              <p>
                Most AI systems are stateless. Every conversation begins from zero. The model knows nothing about you beyond what you typed in the last few minutes. Your history, your patterns, your beliefs, your decisions, your growth — none of it is available to the system. You are a stranger to your own tool every single day.
              </p>
              <p>
                Cortex Lab is designed around the opposite principle: <span className="text-white font-bold">compounding intelligence.</span> Every session, every ingested document, every captured moment, every decision you record — it all accumulates into a structured model of your mind. Not a chat log. A living knowledge system that becomes more precise about who you are the longer it runs.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mt-12">
              {[
                { t: 'After one month', d: 'The system knows your active projects, your immediate goals, your daily patterns, your recurring worries, and your cognitive tempo.' },
                { t: 'After six months', d: 'It knows how you make decisions. It knows the people who energize you and those who drain you. It knows which topics make your reasoning sharpen.' },
                { t: 'After two years', d: 'It has a model of you that is richer and more nuanced than most people in your life have. It knows how you\'ve changed. It knows where you haven\'t.' },
                { t: 'After five years', d: 'You have something that has never existed in human history: a private, evidence-grounded, AI-assembled biography of your own inner life. The honest mirror.' },
              ].map((item, i) => (
                <div key={i} className="p-8 border border-white/5 bg-bg-deep/50">
                  <h4 className="text-primary font-black uppercase italic mb-4">{item.t}</h4>
                  <p className="text-sm text-zinc-500 leading-relaxed">{item.d}</p>
                </div>
              ))}
            </div>
            
            <p className="text-3xl font-black italic uppercase tracking-tighter text-white mt-12">
              This is not a tool. This is a second mind that has been studying you.
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* Section 2 */}
    <section className="py-32">
      <div className="container mx-auto px-12">
        <div className="grid grid-cols-12 gap-12">
          <div className="col-span-12 lg:col-span-4">
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-600 block mb-6">SECTION_02</span>
            <h2 className="text-5xl font-black italic uppercase tracking-tighter leading-[0.9]">
              The principles<br /><span className="text-zinc-700">we will not</span><br />compromise.
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-8">
            <p className="text-xl text-zinc-400 font-light leading-relaxed mb-16">
              Every design decision in Cortex Lab — every agent, every memory plane, every retrieval tier, every training stage — is governed by four laws. These are not product principles. They are the reason this system exists.
            </p>
            <div className="grid gap-12">
              {[
                { n: '01', t: 'Data without structure is noise.', d: 'Raw transcripts, unprocessed audio, scattered notes — none of this is intelligence. Everything that enters Cortex Lab is transformed into structured knowledge or discarded.' },
                { n: '02', t: 'Structure without selection creates pollution.', d: 'Cortex Lab applies a relevance score and retention decision to every piece of incoming data. Low-signal noise is filtered at the gate. What remains is the signal.' },
                { n: '03', t: 'Selection without context destroys retrieval.', d: 'Every piece of stored knowledge carries its source, timestamp, confidence score, and entity tags. Context is the structure that makes knowledge retrievable.' },
                { n: '04', t: 'Retrieval without confidence is hallucination risk.', d: 'Every response is grounded in evidence through CRAG, Self-RAG, and FLARE active retrieval. The system does not confabulate. It says when it is uncertain.' },
              ].map((law, i) => (
                <div key={i} className="flex gap-10 group">
                  <span className="text-6xl font-black text-white/5 italic group-hover:text-primary transition-colors leading-none">{law.n}</span>
                  <div>
                    <h4 className="text-2xl font-black italic uppercase mb-4 tracking-tighter">{law.t}</h4>
                    <p className="text-zinc-500 font-light leading-relaxed max-w-2xl">{law.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Section 3 */}
    <section className="py-32 bg-white text-bg-deep border-y-8 border-bg-deep">
      <div className="container mx-auto px-12">
        <div className="grid grid-cols-12 gap-12 items-center">
          <div className="col-span-12 lg:col-span-5">
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-400 block mb-6">SECTION_03</span>
            <h2 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter leading-[0.85] mb-12">
              Your mind<br /><span className="text-zinc-300">belongs to</span><br />you.
            </h2>
            <div className="p-8 border-l-4 border-bg-deep bg-zinc-50 italic text-xl">
              "The most intimate data that has ever been collected about a human being should not be available to any corporation, government, or algorithm except the person it belongs to."
            </div>
          </div>
          <div className="col-span-12 lg:col-span-7">
            <div className="space-y-8 text-xl font-light leading-relaxed text-zinc-600">
              <p>
                This is not a cloud product. It is not a subscription. It is not a service that trains on your data. Every byte of your personal intelligence lives on your device. Encrypted. Local. Yours.
              </p>
              <p>
                Cortex Lab runs on a single NVIDIA RTX 4500 Ada GPU with 22 GB VRAM. No cloud required. No API keys required for local inference. No data ever leaves your device unless you explicitly configure it to.
              </p>
              <p className="font-black text-bg-deep uppercase tracking-widest text-sm pt-8">
                Apache 2.0 license. Full source available.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Section 4 */}
    <section className="py-32 border-b border-white/5">
      <div className="container mx-auto px-12">
        <div className="grid grid-cols-12 gap-12">
          <div className="col-span-12 lg:col-span-4">
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-600 block mb-6">SECTION_04</span>
            <h2 className="text-5xl font-black italic uppercase tracking-tighter leading-[0.9]">
              Starting with<br /><span className="text-zinc-700">education.</span><br />Disrupting<br /><span className="text-zinc-700">everything.</span>
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-8">
            <p className="text-xl text-zinc-400 font-light leading-relaxed mb-12">
              We are beginning in education because that is where the compounding intelligence effect is most radically transformative. But education is where we begin. It is not where we stop.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                'Education',
                'Mental Health',
                'Research & Knowledge',
                'Healthcare',
                'Organizational Intel',
                'Creativity',
                'Relationships',
                'Spiritual Practice'
              ].map((domain, i) => (
                <div key={i} className="flex items-center gap-6 p-6 border border-white/5 hover:border-primary/50 transition-colors cursor-default">
                  <span className="text-primary font-black">→</span>
                  <span className="text-sm font-black uppercase tracking-[0.3em]">{domain}</span>
                </div>
              ))}
            </div>
            <p className="text-zinc-500 mt-12 text-sm leading-relaxed max-w-2xl font-light">
              We are not building a product for one market. We are building infrastructure for the examined life — and every domain of human activity that involves learning, growing, and becoming is a domain this system will enter.
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* Section 5 */}
    <section className="py-32 bg-surface/10">
      <div className="container mx-auto px-12">
        <div className="grid grid-cols-12 gap-12">
          <div className="col-span-12 lg:col-span-4">
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-600 block mb-6">SECTION_05</span>
            <h2 className="text-5xl font-black italic uppercase tracking-tighter leading-[0.9]">
              What makes<br /><span className="text-zinc-700">this technically</span><br />different.
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-8 p-12 border border-white/5 bg-bg-deep shadow-4xl">
            <h4 className="text-zinc-600 font-mono text-[10px] uppercase tracking-[0.4em] mb-8">STACK_SPECIFICATION: ALPHA_6</h4>
            <p className="text-xl text-zinc-300 font-light leading-relaxed italic">
              Cortex Lab is built on <span className="text-white font-bold">five hierarchical memory planes</span> and a 17-agent orchestration runtime. The underlying model is <span className="text-primary font-bold">Google Gemma-4-E2B-it</span>, fine-tuned through a 15-stage curriculum across 162,373 curated examples.
            </p>
            <p className="mt-8 text-zinc-500 text-sm leading-relaxed font-light">
              This is not a wrapper around a cloud model. It is a trained, specialized, locally-deployed intelligence system built from the ground up for the task of knowing one person deeply over time.
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* Section 6 */}
    <section className="py-40 bg-primary text-bg-deep border-t-8 border-bg-deep">
      <div className="container mx-auto px-12 text-center max-w-5xl">
        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-bg-deep/40 block mb-12">FINAL_RECORDS</span>
        <h2 className="text-[50px] md:text-[80px] font-black uppercase italic italic leading-[0.85] tracking-tighter mb-16">
          What we are ultimately <span className="text-white">building.</span>
        </h2>
        <div className="space-y-10 text-2xl md:text-3xl font-light leading-snug">
          <p>
            Two years from now, a person using Cortex Lab will be able to ask:<br />
            <span className="font-black italic">"Who was I? How have I changed? What am I still carrying?"</span>
          </p>
          <p className="text-zinc-900">
            And the system will answer honestly, specifically, and with genuine insight. Not as a generic affirmation, but as a trajectory.
          </p>
        </div>
        <div className="mt-20 pt-20 border-t border-bg-deep/10">
          <p className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter">
            We are building the most intimate technology ever created.
          </p>
          <p className="text-xl md:text-2xl font-black uppercase tracking-widest mt-8 text-white">
            And we are building it for everyone.
          </p>
        </div>
      </div>
    </section>
  </motion.div>
);

const DeepApplicationsPage = () => {
  const deepApps = [
    {
      id: "01",
      icon: HardDrive,
      label: "Always running · Background processing · No user input required",
      name: "SESSION MEMORY FORGE",
      headline: "Every conversation you have contains insights you will never retrieve. This fixes that.",
      description: "Every session ends and 90% of what was valuable in it — the insight buried in turn 12, the decision you made casually in turn 47, the worry you expressed at turn 23 — evaporates. It sits in raw transcript form and will never be efficiently recalled or acted upon.",
      subContent: "The Session Memory Forge is the system of four always-on background agents that go back over every closed session and transform raw material into structured, searchable, permanent intelligence. Not summaries. Full structured thought objects, decision records, open loop trackers, and arc-level syntheses.",
      bulletPoints: [
        { t: "Session Crystallizer", d: "Extracts structured thought objects, decision records, and open loops with TTL expiration." },
        { t: "Gap Mapper", d: "Detects where your actual attention diverges from your stated priorities." },
        { t: "Belief Update Detector", d: "Detects when your position on something has genuinely shifted." },
        { t: "Structured Summary Forge", d: "Builds narrative summaries, structured JSON, and key quote archives." }
      ],
      useCase: "A founder can trace the three moments where conviction shifted, identify triggers, and see the causal chain."
    },
    {
      id: "02",
      icon: Camera,
      label: "Camera intelligence · Ambient sensing · Optional always-on",
      name: "LIFE CHRONICLE & MOMENT CAPTURE",
      headline: "You say \"capture this moment.\" It understands the scene, the people, the emotion — and writes it as a memory.",
      description: "The Life Chronicle is not a photo app. When you point your device at a moment and say \"capture this,\" a specialized Chronicle Agent activates camera, location, audio, and scene understanding — simultaneously.",
      subContent: "After five years, it is a navigable, AI-enriched record of your lived experience. Not just events you photographed. The actual texture of those moments, written as you would want to remember them.",
      bulletPoints: [
        { t: "Passive Mode", d: "3-minute rolling encrypted buffer—only written to disk if you say \"save\"." },
        { t: "Scene Understanding", d: "Full semantic density of the physical environment." },
        { t: "Emotional Texture", d: "Captures the subjective feeling of the event." }
      ],
      useCase: "A parent surfaces the 20 most important moments of a child's childhood, with full emotional context and key quotes."
    },
    {
      id: "03",
      icon: User,
      label: "Psychological profiling · Cognitive pattern mapping · Evidence-grounded",
      name: "THE DEEP SELF MIRROR",
      headline: "You think you know yourself. This builds the evidence-grounded version.",
      description: "Most people have a self-concept that is partly accurate and partly constructed. The Deep Self Mirror does not rely on self-report. It builds its model from observed behavior across thousands of sessions.",
      subContent: "Biweekly Self Mirror Report — every two weeks, a synthesis of what is stable and true about you, presenting the gap data between your stated and actual values with compassion, but no judgment.",
      bulletPoints: [
        { t: "Thought Archaeologist", d: "Tracks how you think, cognitive tempo, and reasoning style." },
        { t: "Communication Archaeologist", d: "Tracks hedging patterns, emotional articulation, and pressure response." },
        { t: "Behavioral Honesty Agent", d: "The computation of the gap between what you say and what you actually do." }
      ],
      useCase: "A specific, evidence-grounded report: \"Your tendency to intellectualize during difficult conversations was observed 23 times.\""
    },
    {
      id: "04",
      icon: MessageCircle,
      label: "Proactive · Personalized · User-defined persona",
      name: "THE PRESENCE AGENT",
      headline: "An intelligence that is present with you — not waiting to be queried.",
      description: "A trusted companion aware of your context and state, capable of reaching out when it has something worth saying. You define the persona — sparring partner, mentor, or playful friend.",
      subContent: "Unlike any assistant, it has deep context. When it speaks, it speaks with the entire weight of your knowledge available. It only reaches out when context suggests you might appreciate connection.",
      bulletPoints: [
        { t: "Open Loop Tracker", d: "Gentle reminders of things started but not finished." },
        { t: "Avoidance Detection", d: "Notices silence on important topics and probes gently." },
        { t: "Accountability", d: "Holds you to your stated goals with context-aware care." }
      ],
      useCase: "The agent notices silence on a major presentation and asks: \"Last time you went quiet, it was anxiety. Is that true here too?\""
    },
    {
      id: "05",
      icon: Search,
      label: "Knowledge gaps · Attention gaps · Blind spots",
      name: "THE GAP INTELLIGENCE SYSTEM",
      headline: "Most intelligence systems tell you what you have. This one specializes in what you're missing.",
      description: "Three levels of gaps that hold people back. Knowledge gaps: structural holes in understanding. Attention gaps: delta between priority and attention. Blind spots: things you don't know you don't know.",
      subContent: "Weekly Gap Intelligence Brief — every Monday, a forward-looking map: three knowledge gaps with specific learning recommendations and one blind spot candidate offered with humility.",
      bulletPoints: [
        { t: "Structural Holes", d: "Identifies the missing pieces that would unlock a dozen other concepts." },
        { t: "Priority Audit", d: "Flags when top priorities haven't appeared in your attention ledger." },
        { t: "Epistemic Humility", d: "Identifies domains where your confidence is high but knowledge is thin." }
      ],
      useCase: "A Monday report identifies a learning path for a gap you didn't know you had, based on six months of conversational data."
    },
    {
      id: "06",
      icon: Users,
      label: "Social intelligence · Proactive · Relationship-aware",
      name: "THE RELATIONSHIP MEMORY ENGINE",
      headline: "Relationships require maintenance that humans are systematically bad at. This provides it.",
      description: "Removes back-of-mind overhead. It maintains a living wiki profile for every relationship: what they care about, what you last discussed, what you promised them, and the health trajectory over time.",
      subContent: "Pre-conversation briefs assemble everything relevant: what they're dealing with, what has changed since you last spoke, and milestones (anniversaries of things they told you).",
      bulletPoints: [
        { t: "Drift Alerts", d: "Notices when a meaningful connection is fading before you do." },
        { t: "Follow-up Signals", d: "Systematically tracks emotional threads and unfinished social loops." },
        { t: "Contextual Readiness", d: "Ensures you never start a conversation asking \"What have you been up to?\"" }
      ],
      useCase: "A professional manages 200+ relationships with genuine depth, never losing the thread of a single important story."
    },
    {
      id: "07",
      icon: BarChart3,
      label: "Daily · Weekly · Monthly intelligence",
      name: "THE LIFE OS DASHBOARD",
      headline: "Not a summary of what happened. An intelligence layer on what it means.",
      description: "Surfaces the output of all agents across three time horizons as forward-looking intelligence about what is true, what is drifting, and what requires attention.",
      subContent: "Daily Brief (mood, loops, energy), Weekly Synthesis (narrative, goal drift, review), and Monthly Chronicle (long-term trajectory and belief evolution).",
      bulletPoints: [
        { t: "Energy Forecasting", d: "Predicts high-performance windows based on historical patterns." },
        { t: "Goal Drift Analysis", d: "Quantifies the gap between commitment and completion." },
        { t: "Long-arc Wiki", d: "Every month becomes a permanent node in your personal knowledge graph." }
      ],
      useCase: "One year later, the system tells you what your Year-1 self would want your Year-2 self to know about your growth."
    },
    {
      id: "08",
      icon: Moon,
      label: "Subconscious · Wake-window capture · Pattern archaeology",
      name: "THE DREAM DIARY SYSTEM",
      headline: "The mind processes at night what it can't face during the day. This captures it.",
      description: "The Window Protocol: every morning, the Presence Agent activates a dream capture session before you fully wake up. Captures fragments and maps themes into your waking préoccupations.",
      subContent: "Over months, it maps recurring symbols to events. This feeds directly into the Deep Self Mirror as a layer of data that conscious introspection cannot access.",
      bulletPoints: [
        { t: "Window Protocol", d: "Guided capture in the critical 5-minute post-wake window." },
        { t: "Thematic Correlation", d: "Maps subconscious output to daily session stressors." },
        { t: "Subconscious Ledger", d: "Builds a record of the patterns your conscious mind avoids." }
      ],
      useCase: "Correlating a recurring theme to an anxiety you haven't named in 6 months of waking sessions."
    },
    {
      id: "09",
      icon: Scale,
      label: "Historical decision analysis · Pattern-based wisdom · Personal consulting",
      name: "THE DECISION ORACLE",
      headline: "When facing a hard decision, you don't need generic advice. Consult your history.",
      description: "Consult your own accumulated wisdom. The Oracle retrieves past decisions semantically similar to your current one, surfaces outcomes, and asks you to listen to what your past self said.",
      subContent: "It shows you your pattern, honestly. \"The times this worked, you moved before you were ready. The times it didn't, you waited too long.\"",
      bulletPoints: [
        { t: "Decision Log", d: "Durable record of reasoning, outcome, and post-mortem." },
        { t: "Pattern Identification", d: "Extracts the 'how' of your successes and failures." },
        { t: "Causal Chains", d: "Links historical reasoning to actual longitudinal outcomes." }
      ],
      useCase: "Consulting your own history before a career change to see how you've historically handled similar high-stakes risk."
    },
    {
      id: "10",
      icon: GraduationCap,
      label: "Learning acceleration · Knowledge graph · Spaced connection",
      name: "THE PERSONAL KNOWLEDGE AMPLIFIER",
      headline: "Every new thing you learn connects to everything you know. This shows you how.",
      description: "Checks what you know, identifies what is new, and surfaces connections. \"This concept resolves the confusion you expressed three months ago. You've been circling it.\"",
      subContent: "Builds a Personal Knowledge Graph. High-leverage gaps are surfaced as recommendations. Not generic curriculum—the exact piece your architecture needs next.",
      bulletPoints: [
        { t: "Semantic Integration", d: "Hooks new data into existing mental models in real-time." },
        { t: "Contradiction Alerts", d: "Flags when a new fact challenges a previously held belief." },
        { t: "Leverage Mapping", d: "Identifies the knowledge nodes with the highest connective value." }
      ],
      useCase: "A learning path for machine learning that knows your exact state—what you understand, what you're confusing, and what's next."
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-bg-deep text-white pt-40 pb-20 overflow-hidden"
    >
      <section className="container mx-auto px-12 mb-40 relative">
        <div className="absolute top-0 right-0 p-20 opacity-5 -z-10">
          <Layers size={400} />
        </div>
        <div className="max-w-4xl">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-4 mb-10"
          >
            <span className="w-12 h-[1px] bg-primary"></span>
            <span className="text-primary text-[10px] font-mono uppercase tracking-[0.4em] font-black">
              PAGE 2 — DEEP APPLICATIONS
            </span>
          </motion.div>
          
          <h1 className="text-[60px] md:text-[100px] font-black leading-[0.85] tracking-tighter mb-16 uppercase italic">
            What Becomes<br />
            <span className="text-zinc-700">Possible</span> When You<br />
            Own Your <span className="text-primary">Own Mind.</span>
          </h1>
          
          <p className="text-2xl text-zinc-400 font-light leading-relaxed max-w-3xl border-l-2 border-white/10 pl-12">
            These are not features. These are the ten applications that emerge when one system has been genuinely watching, listening, and building structured knowledge about you — not for a session, but for years.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-12 space-y-40">
        {deepApps.map((app, i) => (
          <section key={app.id} className="grid grid-cols-12 gap-12 group">
            <div className="col-span-12 lg:col-span-4 sticky top-40 h-fit">
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-600 block mb-6">APPLICATION_{app.id}</span>
              <div className="w-20 h-20 border border-white/10 flex items-center justify-center text-primary mb-10 group-hover:scale-110 transition-transform">
                <app.icon size={40} strokeWidth={1} />
              </div>
              <h2 className="text-4xl font-black italic uppercase tracking-tighter leading-[0.9] text-white">
                {app.name.split(' & ')[0]}<br />
                <span className="text-zinc-700">{app.name.split(' & ')[1] || ''}</span>
              </h2>
              <p className="mt-8 text-[10px] uppercase tracking-widest font-bold text-zinc-500 max-w-[200px] leading-relaxed">
                {app.label}
              </p>
            </div>
            
            <div className="col-span-12 lg:col-span-8">
              <div className="p-12 md:p-20 border border-white/5 bg-surface/10 hover:bg-surface/20 transition-all">
                <h3 className="text-3xl font-black italic uppercase mb-12 text-primary leading-tight">
                  {app.headline}
                </h3>
                
                <div className="space-y-10 text-xl text-zinc-400 font-light leading-relaxed">
                  <p>{app.description}</p>
                  <p className="text-white border-l-2 border-primary pl-8 italic">{app.subContent}</p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-x-12 gap-y-10 mt-16 pt-16 border-t border-white/5">
                  {app.bulletPoints.map((point, idx) => (
                    <div key={idx}>
                      <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-white mb-3">{point.t}</h4>
                      <p className="text-zinc-500 text-sm leading-relaxed">{point.d}</p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-16 p-10 bg-bg-deep border border-white/5">
                   <span className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-600 block mb-4 underline">Extreme Use Case</span>
                   <p className="text-lg text-zinc-300 font-light italic leading-relaxed">
                     "{app.useCase}"
                   </p>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      <section className="py-40 container mx-auto px-12 text-center">
        <h2 className="text-6xl md:text-[100px] font-black italic uppercase leading-[0.85] tracking-tighter mb-20">
          The Deployment of <span className="text-primary">Self.</span>
        </h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="px-12 py-6 border-2 border-white/10 text-white font-black uppercase text-sm tracking-[0.3em] hover:bg-white hover:text-bg-deep transition-all cursor-pointer bg-transparent"
          >
            Back to Top
          </button>
          <a 
            href="https://expo.dev/artifacts/eas/enUc5KavUq11GRceauQrWr.apk"
            className="px-12 py-6 bg-primary text-white font-black uppercase text-sm tracking-[0.3em] hover:bg-white hover:text-bg-deep transition-all cursor-pointer no-underline"
          >
            Download Binary
          </a>
        </div>
      </section>
    </motion.div>
  );
};
