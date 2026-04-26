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
  Shield
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

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled ? 'bg-bg-deep/90 backdrop-blur-md border-b border-white/10 py-5' : 'bg-transparent py-8'
    }`}>
      <div className="container mx-auto px-12 flex items-center justify-between">
        <a href="#hero" className="flex items-center gap-3 no-underline">
          <div className="w-8 h-8 bg-primary-dark flex items-center justify-center font-bold text-xs rotate-45 text-white">
            <span className="-rotate-45">C</span>
          </div>
          <span className="font-bold text-lg tracking-[0.2em] uppercase text-white">CORE.OS</span>
        </a>

        <div className="hidden md:flex items-center gap-10">
          {['Runtime', 'Memory', 'Agents', 'Apps', 'Privacy'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className="text-[11px] uppercase tracking-[0.3em] font-bold text-zinc-500 hover:text-white transition-colors no-underline"
            >
              {item}
            </a>
          ))}
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

        <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
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
            <button className="absolute top-8 right-12 text-white" onClick={() => setIsMenuOpen(false)}><X size={32}/></button>
            {['Runtime', 'Memory', 'Agents', 'Apps', 'Privacy'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                onClick={() => setIsMenuOpen(false)}
                className="text-4xl font-black uppercase tracking-tighter text-zinc-700 hover:text-white"
              >
                {item}.
              </a>
            ))}
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

const Hero = () => {
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
            className="flex items-center gap-4 mb-8 justify-center md:justify-start"
          >
            <span className="w-12 h-[1px] bg-primary"></span>
            <span className="text-primary text-[10px] font-mono uppercase tracking-[0.4em] font-black">Personal Intelligence Runtime</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-[60px] md:text-[120px] font-black leading-[0.85] tracking-tighter mb-12 uppercase italic text-white"
          >
            LOCAL<br />
            <span className="text-zinc-700">KERNEL.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="max-w-xl text-lg md:text-xl text-zinc-500 mb-16 leading-relaxed font-light mx-auto md:mx-0"
          >
            Cortex Lab is a deeply integrated cross-platform architecture. Seamlessly synchronize your creative workflow between web environments and mobile interfaces.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col md:flex-row items-center gap-12 justify-center md:justify-start"
          >
            <div className="flex flex-col items-center md:items-start">
              <span className="text-5xl font-light text-white tracking-tighter">99.9%</span>
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-zinc-600">Uptime Reliability</span>
            </div>
            <div className="w-[1px] h-12 bg-white/10 hidden md:block"></div>
            <div className="flex flex-col items-center md:items-start">
              <span className="text-5xl font-light text-white tracking-tighter">12ms</span>
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-zinc-600">Local Latency</span>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 mt-16 justify-center md:justify-start"
          >
            <a 
              href="https://cortex-frontend-t53t.onrender.com/" 
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-5 bg-white text-black font-black uppercase text-sm tracking-widest hover:bg-primary hover:text-white transition-all no-underline text-center"
            >
              Launch Web
            </a>
            <a 
              href="https://expo.dev/artifacts/eas/enUc5KavUq11GRceauQrWr.apk"
              className="px-10 py-5 border-2 border-white/10 text-white font-black uppercase text-sm tracking-widest hover:bg-white/5 transition-all no-underline text-center"
            >
              Get Android
            </a>
          </motion.div>
        </div>
        
        <div className="col-span-12 lg:col-span-4 hidden lg:flex items-center justify-center relative">
          <div className="writing-vertical text-zinc-800 text-[10px] uppercase tracking-[0.6em] font-black pointer-events-none select-none absolute right-0 scale-y-[-1] transform">ESTABLISHED.MMXXVI</div>
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
            <div className="space-y-6">
              <div className="h-32 bg-bg-deep border border-white/5 rounded-sm p-6 flex flex-col justify-end text-white">
                <div className="text-[10px] uppercase tracking-widest text-zinc-600 mb-1">DATA_VOLUME</div>
                <div className="text-3xl font-light">74.2GB</div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="h-24 border border-zinc-800 flex items-center justify-center">
                  <Activity size={24} className="text-zinc-700" />
                </div>
                <div className="h-24 bg-primary rounded-sm p-4 flex flex-col justify-between text-white">
                  <span className="text-[9px] uppercase tracking-widest font-black text-white/60">SYNC</span>
                  <span className="text-xl font-bold">100%</span>
                </div>
              </div>
              <div className="h-20 border border-zinc-700 border-dashed rounded-sm flex items-center justify-center text-zinc-700 text-[9px] uppercase tracking-[0.3em] font-black">VISUALIZER.OS</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

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

const Apps = () => {
  const apps = [
    { icon: '💾', name: 'FORGE', tag: 'Today' },
    { icon: '📖', name: 'CHRONICLE', tag: 'Months' },
    { icon: '🪞', name: 'MIRROR', tag: 'Months' },
    { icon: '👁️', name: 'PRESENCE', tag: 'Today' },
    { icon: '🔮', name: 'ORACLE', tag: 'Months' },
    { icon: '💡', name: 'INSIGHT', tag: 'Months' },
    { icon: '📜', name: 'NARRATIVE', tag: 'Years' },
    { icon: '⚠️', name: 'BEACON', tag: 'Months' },
    { icon: '🎯', name: 'ACCEL', tag: 'Today' },
    { icon: '🗺️', name: 'LOCUS', tag: 'Years' },
  ];

  return (
    <section id="apps" className="py-32 bg-white text-bg-deep border-b-8 border-bg-deep">
      <div className="container mx-auto px-12">
        <SectionHeader 
          dark={false}
          eyebrow="Applications"
          title={<>EXTRACTED<br /><span className="text-zinc-400">TOOLS.</span></>}
          description="Each tool is a purpose-built abstraction of the core runtime. Interface with the dimensions that matter most."
        />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {apps.map((app, i) => (
            <motion.div 
              key={i}
              className="p-10 border border-zinc-100 hover:bg-zinc-50 transition-all group"
            >
              <div className="text-4xl mb-8 group-hover:scale-110 transition-transform">
                {app.icon}
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
          <div className="w-64 h-64 border-8 border-primary rounded-full flex items-center justify-center text-5xl">
            🔒
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
  return (
    <div className="min-h-screen text-bg-deep selection:bg-primary/10 selection:text-primary overflow-x-hidden">
      <Navbar />
      <Hero />
      <div className="py-12 bg-bg-deep">
        <InteractiveDemo />
      </div>
      <Runtime />
      <Memory />
      <Agents />
      <Apps />
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

      <Footer />
    </div>
  );
}
