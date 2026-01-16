import React, { useState } from 'react';
import { 
  Heart, 
  Users, 
  Eye, 
  Building2, 
  Brain, 
  TrendingDown,
  Stethoscope,
  MessageCircleHeart,
  BarChart3,
  Pill,
  Clock,
  MapPin,
  UserCheck,
  Phone,
  Smile,
  Globe,
  ShieldCheck,
  Package,
  DollarSign,
  Landmark,
  LineChart,
  Sparkles,
  HeartHandshake,
  Activity,
  Zap,
  Network,
  Mic,
  MessageSquare,
  CreditCard,
  Database,
  Bot,
  Headphones
} from 'lucide-react';

const SaludCompartidaInvestorPage = () => {
  const [activeSection, setActiveSection] = useState('problem');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white">
      
      {/* Navigation Tabs */}
      <div className="flex justify-center pt-8 pb-4 gap-4 flex-wrap px-4">
        <button 
          onClick={() => setActiveSection('problem')}
          className={`px-6 py-3 rounded-full font-bold transition-all ${
            activeSection === 'problem' 
              ? 'bg-cyan-500 text-black' 
              : 'bg-transparent border border-cyan-500 text-cyan-400 hover:bg-cyan-500/20'
          }`}
        >
          The Problem
        </button>
        <button 
          onClick={() => setActiveSection('solution')}
          className={`px-6 py-3 rounded-full font-bold transition-all ${
            activeSection === 'solution' 
              ? 'bg-emerald-500 text-black' 
              : 'bg-transparent border border-emerald-500 text-emerald-400 hover:bg-emerald-500/20'
          }`}
        >
          The Solution
        </button>
        <button 
          onClick={() => setActiveSection('tech')}
          className={`px-6 py-3 rounded-full font-bold transition-all ${
            activeSection === 'tech' 
              ? 'bg-purple-500 text-black' 
              : 'bg-transparent border border-purple-500 text-purple-400 hover:bg-purple-500/20'
          }`}
        >
          The Technology
        </button>
      </div>

      {/* THE PROBLEM SECTION */}
      {activeSection === 'problem' && (
        <div className="px-6 md:px-16 py-12">
          
          {/* Hero */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="text-cyan-400">Three Hidden Crises.</span>
              <br />
              <span className="text-white">Zero Scaled Solutions.</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              23.5 million families receiving remittances are trapped in a cycle that no one is addressing—until now.
            </p>
          </div>

          {/* Crisis 1: Healthcare */}
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-500/20 to-red-600/10 border border-red-500/30 flex items-center justify-center">
                <Stethoscope className="w-7 h-7 text-red-400" strokeWidth={1.5} />
              </div>
              <h2 className="text-3xl font-bold text-red-400">Crisis #1: The Healthcare Abyss</h2>
            </div>
            
            <div className="grid md:grid-cols-4 gap-4 mb-6">
              {[
                { number: "54M", label: "Mexicans with ZERO healthcare options" },
                { number: "28 weeks", label: "Average wait for a procedure" },
                { number: "6+ months", label: "Of remittances lost to one hospitalization" },
                { number: "32%", label: "Medicine cost increase (2018-2024)" }
              ].map((stat, i) => (
                <div key={i} className="bg-red-950/40 border border-red-500/30 rounded-xl p-6 text-center">
                  <div className="text-3xl font-black text-red-400">{stat.number}</div>
                  <div className="text-sm text-gray-400 mt-2">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Crisis 2: Loneliness Epidemic */}
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500/20 to-purple-600/10 border border-purple-500/30 flex items-center justify-center">
                <HeartHandshake className="w-7 h-7 text-purple-400" strokeWidth={1.5} />
              </div>
              <h2 className="text-3xl font-bold text-purple-400">Crisis #2: The Silent Loneliness Epidemic</h2>
            </div>

            <div className="bg-purple-950/30 border border-purple-500/30 rounded-2xl p-8 mb-6">
              <p className="text-lg text-gray-300 mb-6">
                While migrants work 12-hour shifts to send money home, their parents age <span className="text-purple-400 font-bold">alone</span>. 
                No one has 10 minutes to talk to grandma. The result? A public health crisis hiding in plain sight.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { number: "75%", label: "of elderly with health issues experience severe loneliness" },
                  { number: "60%", label: "higher dementia risk from chronic loneliness" },
                  { number: "24%", label: "higher depression rates—yet zero access to mental health care" }
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="text-4xl font-black text-purple-400">{stat.number}</div>
                    <div className="text-sm text-gray-400 mt-2">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 border border-purple-500/20 rounded-xl p-6">
              <p className="text-lg italic text-gray-300">
                "Loneliness is equivalent to smoking 15 cigarettes a day in terms of health impact. 
                It must be addressed with the same urgency as other health threats."
              </p>
              <p className="text-sm text-purple-400 mt-2">— Perspectives on Psychological Science</p>
            </div>
          </div>

          {/* Crisis 3: The Invisible Market */}
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 border border-amber-500/30 flex items-center justify-center">
                <Eye className="w-7 h-7 text-amber-400" strokeWidth={1.5} />
              </div>
              <h2 className="text-3xl font-bold text-amber-400">Crisis #3: The Invisible $64.7B Market</h2>
            </div>

            <div className="bg-amber-950/30 border border-amber-500/30 rounded-2xl p-8">
              <p className="text-xl text-white font-semibold mb-6">
                The base of the pyramid is <span className="text-amber-400">invisible</span> to the world.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-lg font-bold text-amber-400 mb-4">What Companies DON'T Know:</h3>
                  <ul className="space-y-3">
                    {[
                      "What package sizes they can actually afford",
                      "Which products they need but can't find",
                      "How they make healthcare decisions",
                      "What financial services they're missing",
                      "Regional variations across 10 countries"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-300">
                        <span className="text-amber-400 mt-1">✕</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-black/30 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-amber-400 mb-4">The Consequence:</h3>
                  <p className="text-gray-300 mb-4">
                    CPG companies design products for the middle class. Pharmaceutical companies market to urban populations. 
                    Financial services require documentation they don't have.
                  </p>
                  <p className="text-white font-semibold">
                    23.5 million families are <span className="text-amber-400">excluded by design</span>—not by intention.
                  </p>
                </div>
              </div>

              <div className="bg-black/40 rounded-xl p-6 border-l-4 border-amber-500">
                <p className="text-gray-300">
                  <span className="text-amber-400 font-bold">Example:</span> A mother in Oaxaca can't buy the detergent her family needs 
                  because it only comes in sizes too large for her budget. The company doesn't know—because no one is asking her.
                </p>
              </div>
            </div>
          </div>

          {/* The Cost to Society */}
          <div className="bg-gradient-to-r from-slate-800/60 to-slate-900/60 border border-cyan-500/20 rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-cyan-400 mb-8 text-center">The Cost to Governments & Society</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-cyan-600/10 border border-cyan-500/30 flex items-center justify-center mx-auto mb-4">
                  <Landmark className="w-8 h-8 text-cyan-400" strokeWidth={1.5} />
                </div>
                <h3 className="font-bold text-white mb-2">Government Healthcare Burden</h3>
                <p className="text-sm text-gray-400">Untreated conditions become emergencies. Public systems collapse under preventable cases.</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-cyan-600/10 border border-cyan-500/30 flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-8 h-8 text-cyan-400" strokeWidth={1.5} />
                </div>
                <h3 className="font-bold text-white mb-2">Mental Health Crisis</h3>
                <p className="text-sm text-gray-400">Depression and cognitive decline from loneliness create cascading social costs.</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-cyan-600/10 border border-cyan-500/30 flex items-center justify-center mx-auto mb-4">
                  <TrendingDown className="w-8 h-8 text-cyan-400" strokeWidth={1.5} />
                </div>
                <h3 className="font-bold text-white mb-2">Economic Exclusion</h3>
                <p className="text-sm text-gray-400">Without data, products aren't designed for them. The cycle of poverty continues.</p>
              </div>
            </div>
          </div>

          {/* Quote */}
          <div className="text-center py-8">
            <p className="text-2xl italic text-gray-400 max-w-4xl mx-auto">
              "I send $500 every month, but when my mother got sick, I couldn't buy her medicine. 
              And when I call, she says she's fine—but I know she's <span className="text-cyan-400">alone all day</span>."
            </p>
            <p className="text-cyan-400 mt-4">— Miguel, Construction Worker, Los Angeles</p>
          </div>

        </div>
      )}

      {/* THE SOLUTION SECTION */}
      {activeSection === 'solution' && (
        <div className="px-6 md:px-16 py-12">
          
          {/* Hero */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="text-emerald-400">One Platform.</span>
              <br />
              <span className="text-white">Three Transformations.</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              SaludCompartida is the first AI-powered health platform that transforms remittances into healthcare access, 
              emotional wellbeing, AND actionable market intelligence.
            </p>
          </div>

          {/* Three Pillars */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            
            {/* Pillar 1: Healthcare */}
            <div className="bg-gradient-to-b from-cyan-950/50 to-transparent border border-cyan-500/30 rounded-2xl p-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/30 to-cyan-600/10 border border-cyan-500/40 flex items-center justify-center mb-4 mx-auto">
                <Activity className="w-8 h-8 text-cyan-400" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold text-cyan-400 text-center mb-4">Healthcare Access</h3>
              <ul className="space-y-3">
                {[
                  { icon: Clock, text: "24/7 unlimited telemedicine" },
                  { icon: Brain, text: "4 monthly sessions with licensed psychologist" },
                  { icon: Pill, text: "40-75% pharmacy discounts" },
                  { icon: MapPin, text: "1,700+ pharmacy locations" },
                  { icon: UserCheck, text: "Specialist access with discounts" },
                  { icon: Users, text: "4 family members covered" }
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-300 text-sm">
                    <item.icon className="w-4 h-4 text-cyan-400 flex-shrink-0" strokeWidth={1.5} />
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>

            {/* Pillar 2: AI Companion */}
            <div className="relative bg-gradient-to-b from-pink-950/50 to-transparent border border-pink-500/30 rounded-2xl p-6 transform md:scale-105">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs font-bold px-4 py-1 rounded-full">
                CORE DIFFERENTIATOR
              </div>
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500/30 to-rose-600/10 border border-pink-500/40 flex items-center justify-center mb-4 mx-auto mt-4">
                <MessageCircleHeart className="w-8 h-8 text-pink-400" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold text-pink-400 text-center mb-2">10 AI Companions</h3>
              <p className="text-sm text-gray-400 text-center mb-4 italic">"Meet Lupita, Carmen, María & 7 more"</p>
              <ul className="space-y-3">
                {[
                  { icon: Phone, text: "Voice calls that sound 100% human" },
                  { icon: MessageSquare, text: "WhatsApp daily check-ins" },
                  { icon: Pill, text: "Medication reminders with empathy" },
                  { icon: Globe, text: "Regional accents & cultural mirroring" },
                  { icon: Heart, text: "Personality-matched to user profile" },
                  { icon: Headphones, text: "Active listening, emotional presence" }
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-300 text-sm">
                    <item.icon className="w-4 h-4 text-pink-400 flex-shrink-0" strokeWidth={1.5} />
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>

            {/* Pillar 3: Data Intelligence */}
            <div className="bg-gradient-to-b from-amber-950/50 to-transparent border border-amber-500/30 rounded-2xl p-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500/30 to-amber-600/10 border border-amber-500/40 flex items-center justify-center mb-4 mx-auto">
                <BarChart3 className="w-8 h-8 text-amber-400" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold text-amber-400 text-center mb-4">Data Intelligence</h3>
              <ul className="space-y-3">
                {[
                  { icon: LineChart, text: "Aggregated behavioral insights" },
                  { icon: Users, text: "Real needs, not assumptions" },
                  { icon: Globe, text: "Regional variations mapped" },
                  { icon: Package, text: "Product preference patterns" },
                  { icon: Stethoscope, text: "Healthcare decision drivers" },
                  { icon: Database, text: "Demographics + conversation data" }
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-300 text-sm">
                    <item.icon className="w-4 h-4 text-amber-400 flex-shrink-0" strokeWidth={1.5} />
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Competitive Advantage */}
          <div className="bg-slate-800/50 border border-emerald-500/30 rounded-2xl p-8 mb-16">
            <h2 className="text-2xl font-bold text-emerald-400 mb-6 text-center">Competitive Pricing Advantage</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-3 text-gray-400 font-medium">Competitor</th>
                    <th className="text-left py-3 text-gray-400 font-medium">Price</th>
                    <th className="text-left py-3 text-gray-400 font-medium">Offering</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: "ElliQ", price: "$249 + $59/mo", offering: "AI companion only (no healthcare)" },
                    { name: "Replika Pro", price: "$14.99/mo", offering: "Chat companion only (text-based)" },
                    { name: "Joy Calls", price: "$9.99/mo add-on", offering: "Daily AI check-ins only (no health)" },
                    { name: "Papa", price: "$20-30/mo", offering: "Human companions (not scalable, no AI)" }
                  ].map((comp, i) => (
                    <tr key={i} className="border-b border-gray-800">
                      <td className="py-3 text-gray-300">{comp.name}</td>
                      <td className="py-3 text-gray-300">{comp.price}</td>
                      <td className="py-3 text-gray-400 text-sm">{comp.offering}</td>
                    </tr>
                  ))}
                  <tr className="bg-emerald-500/10">
                    <td className="py-4 text-emerald-400 font-bold">SaludCompartida</td>
                    <td className="py-4 text-emerald-400 font-bold">$12-18/mo</td>
                    <td className="py-4 text-emerald-400 font-bold">Telemedicine + 4 Psychology Sessions + Pharmacy + 10 AI Voice Agents + WhatsApp + 4 members</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <p className="text-center text-2xl font-bold text-emerald-400 mt-8">
              5x the value. 1/4 the price.
            </p>
          </div>

          {/* Social Impact */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-10">
              <span className="text-white">Beyond Business:</span>
              <span className="text-emerald-400"> Systemic Change</span>
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              
              <div className="bg-gradient-to-br from-emerald-950/40 to-cyan-950/40 border border-emerald-500/30 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                    <Landmark className="w-5 h-5 text-emerald-400" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-bold text-emerald-400">For Governments</h3>
                </div>
                <ul className="space-y-3">
                  {[
                    "Reduced burden on public health systems",
                    "Prevention over emergency intervention",
                    "Mental health crisis mitigation (4 monthly psychology sessions)",
                    "Lower depression and dementia rates",
                    "Data to inform public policy"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-300">
                      <span className="text-emerald-400 mt-1">→</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gradient-to-br from-amber-950/40 to-orange-950/40 border border-amber-500/30 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-amber-400" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-bold text-amber-400">For Industries</h3>
                </div>
                <ul className="space-y-3">
                  {[
                    "CPG: Design products for real needs (right sizes, right prices)",
                    "Pharma: Understand medication barriers and adherence",
                    "Retail: Stock what communities actually want",
                    "Finance: Create accessible services for the unbanked",
                    "Insurance: Risk profiling for underserved markets"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-300">
                      <span className="text-amber-400 mt-1">→</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Valuation Shift */}
          <div className="bg-gradient-to-r from-purple-950/50 to-pink-950/50 border border-purple-500/30 rounded-2xl p-8 mb-16">
            <h2 className="text-2xl font-bold text-center text-white mb-8">
              From Service Aggregator to <span className="text-purple-400">AI Health Tech Platform</span>
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { model: "Service Aggregator", multiple: "2-4x ARR", highlight: false },
                { model: "SaaS Health Tech", multiple: "6-10x ARR", highlight: false },
                { model: "AI Platform + Data", multiple: "10-15x ARR", highlight: true }
              ].map((item, i) => (
                <div key={i} className={`text-center p-6 rounded-xl ${
                  item.highlight 
                    ? 'bg-purple-500/20 border-2 border-purple-500' 
                    : 'bg-black/20 border border-gray-700'
                }`}>
                  <div className={`text-lg mb-2 ${item.highlight ? 'text-purple-400 font-bold' : 'text-gray-400'}`}>
                    {item.model}
                  </div>
                  <div className={`text-3xl font-black ${item.highlight ? 'text-purple-400' : 'text-gray-300'}`}>
                    {item.multiple}
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-8 p-6 bg-black/30 rounded-xl">
              <p className="text-gray-400 mb-2">Additional Revenue Stream (Post-Scale)</p>
              <p className="text-3xl font-bold text-purple-400">$1.8M - $4.6M/year</p>
              <p className="text-sm text-gray-500 mt-2">Aggregated, anonymized behavioral data licensing</p>
            </div>
          </div>

          {/* Final CTA */}
          <div className="text-center py-8">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30 flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-10 h-10 text-emerald-400" strokeWidth={1.5} />
            </div>
            <p className="text-3xl font-bold text-white mb-4">
              SaludCompartida makes the <span className="text-emerald-400">invisible</span> visible.
            </p>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
              We're not just solving healthcare access. We're building the infrastructure 
              to include 23.5 million families in the formal economy—for the first time.
            </p>
            <p className="text-2xl italic text-emerald-400">
              "Be the investor who made healthcare—and dignity—accessible to the forgotten."
            </p>
          </div>

        </div>
      )}

      {/* THE TECHNOLOGY SECTION */}
      {activeSection === 'tech' && (
        <div className="px-6 md:px-16 py-12">
          
          {/* Hero */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="text-purple-400">The Tech Advantage</span>
              <br />
              <span className="text-white">That Creates Unfair Value.</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              While competitors offer single-purpose AI chatbots, we've orchestrated multiple cutting-edge AI systems 
              into one seamless experience—delivering value that simply doesn't exist in the market today.
            </p>
          </div>

          {/* Why Our Tech Creates Competitive Moats */}
          <div className="bg-gradient-to-br from-purple-950/50 to-indigo-950/50 border border-purple-500/30 rounded-2xl p-8 mb-16">
            <h2 className="text-2xl font-bold text-purple-400 mb-8 text-center">Why Our Technology Creates Unfair Advantages</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[
                { 
                  icon: Bot, 
                  title: "10 AI Personalities", 
                  desc: "Not one generic bot—10 distinct companions matched to user age, region & personality",
                  color: "pink"
                },
                { 
                  icon: Mic, 
                  title: "Human-Like Voice", 
                  desc: "Ultra-realistic voice calls that sound indistinguishable from real people",
                  color: "purple"
                },
                { 
                  icon: MessageSquare, 
                  title: "Multi-Channel Reach", 
                  desc: "Voice calls + WhatsApp (inbound & outbound) + Email—all from one AI companion",
                  color: "cyan"
                },
                { 
                  icon: Database, 
                  title: "Enterprise-Grade Scale", 
                  desc: "Built to handle 2,000+ daily conversations (inbound + outbound) per agent system",
                  color: "emerald"
                }
              ].map((item, i) => (
                <div key={i} className={`bg-${item.color}-950/30 border border-${item.color}-500/30 rounded-xl p-6 text-center`}>
                  <div className={`w-14 h-14 rounded-xl bg-${item.color}-500/20 border border-${item.color}-500/30 flex items-center justify-center mx-auto mb-4`}>
                    <item.icon className={`w-7 h-7 text-${item.color}-400`} strokeWidth={1.5} />
                  </div>
                  <h3 className={`font-bold text-${item.color}-400 mb-2`}>{item.title}</h3>
                  <p className="text-sm text-gray-400">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Operational Scale Metrics */}
            <div className="bg-black/40 rounded-xl p-6 border border-purple-500/20">
              <h3 className="text-lg font-bold text-purple-400 mb-4 text-center">Operational Scale: Built for Thousands, Not Hundreds</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-black text-purple-400 mb-2">2,000+</div>
                  <p className="text-sm text-gray-400">Daily conversations per AI system (inbound + outbound combined)</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-pink-400 mb-2">20K+</div>
                  <p className="text-sm text-gray-400">Daily capacity when all 10 agents are active at scale</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-cyan-400 mb-2">24/7</div>
                  <p className="text-sm text-gray-400">Always-on availability with zero downtime or human fatigue</p>
                </div>
              </div>
            </div>
          </div>

          {/* Competitive Technology Comparison */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-10">
              <span className="text-white">How We Stack Up:</span>
              <span className="text-purple-400"> Technology Comparison</span>
            </h2>

            <div className="bg-slate-800/50 border border-purple-500/30 rounded-2xl p-8 mb-8">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-purple-500/30">
                      <th className="text-left py-4 px-4 text-gray-400 font-medium">Competitor</th>
                      <th className="text-left py-4 px-4 text-gray-400 font-medium">Technology</th>
                      <th className="text-left py-4 px-4 text-gray-400 font-medium">Channels</th>
                      <th className="text-left py-4 px-4 text-gray-400 font-medium">Personalization</th>
                      <th className="text-left py-4 px-4 text-gray-400 font-medium">Scale Capacity</th>
                      <th className="text-left py-4 px-4 text-gray-400 font-medium">Healthcare</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-800">
                      <td className="py-4 px-4">
                        <div className="font-semibold text-white">ElliQ</div>
                        <div className="text-xs text-gray-500">($249 device + $59/mo)</div>
                      </td>
                      <td className="py-4 px-4 text-gray-300 text-sm">
                        Text-to-speech robot<br/>
                        <span className="text-xs text-gray-500">Physical device required</span>
                      </td>
                      <td className="py-4 px-4 text-gray-400 text-sm">Voice only (device)</td>
                      <td className="py-4 px-4 text-gray-400 text-sm">Single personality</td>
                      <td className="py-4 px-4 text-gray-400 text-sm">1:1 device-user</td>
                      <td className="py-4 px-4 text-red-400 text-sm">None</td>
                    </tr>
                    
                    <tr className="border-b border-gray-800">
                      <td className="py-4 px-4">
                        <div className="font-semibold text-white">Replika Pro</div>
                        <div className="text-xs text-gray-500">($14.99/mo)</div>
                      </td>
                      <td className="py-4 px-4 text-gray-300 text-sm">
                        GPT-based chatbot<br/>
                        <span className="text-xs text-gray-500">Text & limited voice</span>
                      </td>
                      <td className="py-4 px-4 text-gray-400 text-sm">App only (text-first)</td>
                      <td className="py-4 px-4 text-gray-400 text-sm">Custom avatar, one voice</td>
                      <td className="py-4 px-4 text-gray-400 text-sm">Limited by API costs</td>
                      <td className="py-4 px-4 text-red-400 text-sm">None</td>
                    </tr>
                    
                    <tr className="border-b border-gray-800">
                      <td className="py-4 px-4">
                        <div className="font-semibold text-white">Papa</div>
                        <div className="text-xs text-gray-500">($20-30/mo)</div>
                      </td>
                      <td className="py-4 px-4 text-gray-300 text-sm">
                        Human companions<br/>
                        <span className="text-xs text-gray-500">Not AI—real people</span>
                      </td>
                      <td className="py-4 px-4 text-gray-400 text-sm">Phone, in-person</td>
                      <td className="py-4 px-4 text-amber-400 text-sm">High (real humans)</td>
                      <td className="py-4 px-4 text-red-400 text-sm">Not scalable (humans)</td>
                      <td className="py-4 px-4 text-red-400 text-sm">None</td>
                    </tr>
                    
                    <tr className="border-b border-gray-800">
                      <td className="py-4 px-4">
                        <div className="font-semibold text-white">Joy Calls</div>
                        <div className="text-xs text-gray-500">($9.99/mo add-on)</div>
                      </td>
                      <td className="py-4 px-4 text-gray-300 text-sm">
                        Automated call system<br/>
                        <span className="text-xs text-gray-500">Basic voice AI</span>
                      </td>
                      <td className="py-4 px-4 text-gray-400 text-sm">Phone only (outbound)</td>
                      <td className="py-4 px-4 text-gray-400 text-sm">Minimal personalization</td>
                      <td className="py-4 px-4 text-gray-400 text-sm">Limited daily calls</td>
                      <td className="py-4 px-4 text-red-400 text-sm">None</td>
                    </tr>
                    
                    <tr className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-t-2 border-purple-500">
                      <td className="py-4 px-4">
                        <div className="font-bold text-purple-400 text-lg">SaludCompartida</div>
                        <div className="text-xs text-purple-300">($12-18/mo)</div>
                      </td>
                      <td className="py-4 px-4 text-purple-300 text-sm">
                        <span className="font-semibold">Multi-AI orchestration:</span><br/>
                        • ElevenLabs (Hollywood-grade voice)<br/>
                        • GPT-4 (conversation intelligence)<br/>
                        • 15+ proprietary algorithms<br/>
                        • Empathy-optimized profiles
                      </td>
                      <td className="py-4 px-4 text-purple-300 text-sm">
                        • Voice calls (inbound/outbound)<br/>
                        • WhatsApp (inbound/outbound)<br/>
                        • Email<br/>
                        • SMS backup
                      </td>
                      <td className="py-4 px-4 text-purple-300 text-sm">
                        <span className="font-semibold">10 AI personalities</span><br/>
                        Age, region, accent-matched<br/>
                        Empathy-designed profiles
                      </td>
                      <td className="py-4 px-4 text-emerald-400 text-sm font-semibold">
                        2,000+ daily interactions<br/>
                        per agent system<br/>
                        20K+ at full scale
                      </td>
                      <td className="py-4 px-4 text-emerald-400 text-sm font-semibold">
                        Full healthcare:<br/>
                        • Telemedicine 24/7<br/>
                        • 4 psychology sessions<br/>
                        • 40-75% pharmacy
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-purple-950/40 to-transparent border border-purple-500/30 rounded-xl p-6 text-center">
                <div className="text-4xl font-black text-purple-400 mb-2">10x</div>
                <p className="text-sm text-gray-400">More channels than competitors (voice + WhatsApp both ways + email vs single channel)</p>
              </div>
              <div className="bg-gradient-to-br from-pink-950/40 to-transparent border border-pink-500/30 rounded-xl p-6 text-center">
                <div className="text-4xl font-black text-pink-400 mb-2">15+</div>
                <p className="text-sm text-gray-400">Proprietary algorithms for empathy generation, trust-building, and engagement optimization</p>
              </div>
              <div className="bg-gradient-to-br from-cyan-950/40 to-transparent border border-cyan-500/30 rounded-xl p-6 text-center">
                <div className="text-4xl font-black text-cyan-400 mb-2">2,000+</div>
                <p className="text-sm text-gray-400">Daily conversation capacity per agent system—competitors can't match this scale</p>
              </div>
              <div className="bg-gradient-to-br from-emerald-950/40 to-transparent border border-emerald-500/30 rounded-xl p-6 text-center">
                <div className="text-4xl font-black text-emerald-400 mb-2">Only One</div>
                <p className="text-sm text-gray-400">Combining AI companionship WITH full healthcare access at this price point</p>
              </div>
            </div>
          </div>

          {/* The 10 AI Agents */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-10">
              <span className="text-white">Meet the Team:</span>
              <span className="text-pink-400"> 10 AI Companions</span>
            </h2>

            <div className="bg-pink-950/30 border border-pink-500/30 rounded-2xl p-6 mb-8">
              <p className="text-gray-300 text-center mb-6">
                Unlike generic chatbots, each companion has a <span className="text-pink-400 font-bold">distinct personality</span>, 
                <span className="text-pink-400 font-bold"> ultra-realistic voice</span>, and 
                <span className="text-pink-400 font-bold"> empathy-optimized behavior</span>. 
                Users are automatically matched based on age, region, and emotional preferences using our proprietary matching algorithms.
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-black/30 rounded-lg p-4 text-center">
                  <div className="text-2xl font-black text-pink-400 mb-1">15+</div>
                  <p className="text-xs text-gray-400">Custom algorithms for empathy generation, trust-building, and cultural adaptation</p>
                </div>
                <div className="bg-black/30 rounded-lg p-4 text-center">
                  <div className="text-2xl font-black text-pink-400 mb-1">10</div>
                  <p className="text-xs text-gray-400">Distinct AI personalities with user-profile matching for authentic emotional connection</p>
                </div>
                <div className="bg-black/30 rounded-lg p-4 text-center">
                  <div className="text-2xl font-black text-pink-400 mb-1">2K+</div>
                  <p className="text-xs text-gray-400">Daily conversations handled per agent system (competitors max at ~100-200)</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                { name: "Lupita", age: 65, type: "Maternal", tone: "Warm & protective", segment: "Women 60+" },
                { name: "Carmen", age: 62, type: "Direct", tone: "Practical yet caring", segment: "Women 60+" },
                { name: "Rosa", age: 68, type: "Empathetic", tone: "Active listener", segment: "Women 60+" },
                { name: "Teresa", age: 64, type: "Organized", tone: "Methodical & clear", segment: "Women 60+" },
                { name: "María", age: 32, type: "Modern", tone: "Energetic & friendly", segment: "Women <40" },
                { name: "Ana", age: 35, type: "Educational", tone: "Patient & clear", segment: "Women <40" },
                { name: "Sofía", age: 28, type: "Tech-savvy", tone: "Digital & quick", segment: "Women <40" },
                { name: "Daniela", age: 38, type: "Motivational", tone: "Positive & active", segment: "Women <40" },
                { name: "Carlos", age: 58, type: "Respectful", tone: "Formal yet warm", segment: "Men" },
                { name: "Don Miguel", age: 63, type: "Wise", tone: "Friendly & practical", segment: "Men" }
              ].map((agent, i) => (
                <div key={i} className="bg-gradient-to-b from-pink-950/40 to-transparent border border-pink-500/20 rounded-xl p-4 hover:border-pink-500/50 transition-all">
                  <div className="text-center mb-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500/30 to-rose-500/20 border border-pink-500/40 flex items-center justify-center mx-auto mb-2">
                      <Smile className="w-6 h-6 text-pink-400" />
                    </div>
                    <h4 className="font-bold text-pink-400">{agent.name}</h4>
                    <p className="text-xs text-gray-500">{agent.age} years old</p>
                  </div>
                  <div className="space-y-1 text-xs">
                    <p className="text-gray-400"><span className="text-pink-400 font-semibold">Type:</span> {agent.type}</p>
                    <p className="text-gray-400"><span className="text-pink-400 font-semibold">Tone:</span> {agent.tone}</p>
                    <p className="text-gray-500 italic">{agent.segment}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-black/40 rounded-xl p-6 border-l-4 border-pink-500">
              <p className="text-gray-300">
                <span className="text-pink-400 font-bold">Real-world example:</span> When María (32) in Miami registers her mother (68) in Oaxaca, 
                the system automatically assigns <span className="text-pink-400">Rosa</span> (empathetic, 68) as the AI companion. 
                Rosa calls with a warm Oaxacan accent and speaks at the perfect pace for elderly users.
              </p>
            </div>
          </div>

          {/* How the System Works */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-10">
              <span className="text-white">How It Works:</span>
              <span className="text-purple-400"> From Sign-Up to Daily Engagement</span>
            </h2>

            <div className="space-y-6">
              
              {/* Step 1 */}
              <div className="bg-gradient-to-r from-cyan-950/40 to-blue-950/40 border border-cyan-500/30 rounded-xl p-8">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center flex-shrink-0">
                    <span className="text-3xl font-black text-cyan-400">1</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-cyan-400 mb-3">Migrant Signs Up in 3 Minutes</h3>
                    <p className="text-gray-300 mb-4">
                      A migrant in the U.S. registers online, adds family members in Mexico (up to 4), and pays $12-18/month. 
                      Our AI instantly analyzes demographics and assigns the perfect companion for each family member.
                    </p>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="bg-black/30 rounded-lg p-4">
                        <p className="text-cyan-400 font-semibold mb-1">What We Capture</p>
                        <p className="text-xs text-gray-400">Age, location, health needs, personality preferences</p>
                      </div>
                      <div className="bg-black/30 rounded-lg p-4">
                        <p className="text-cyan-400 font-semibold mb-1">Smart Matching</p>
                        <p className="text-xs text-gray-400">AI assigns age-appropriate companion with regional accent</p>
                      </div>
                      <div className="bg-black/30 rounded-lg p-4">
                        <p className="text-cyan-400 font-semibold mb-1">Instant Access</p>
                        <p className="text-xs text-gray-400">Dual codes sent via WhatsApp & email—ready to use</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="bg-gradient-to-r from-pink-950/40 to-rose-950/40 border border-pink-500/30 rounded-xl p-8">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-pink-500/20 border border-pink-500/30 flex items-center justify-center flex-shrink-0">
                    <span className="text-3xl font-black text-pink-400">2</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-pink-400 mb-3">AI Companion Calls Within 10 Minutes</h3>
                    <p className="text-gray-300 mb-4">
                      The assigned AI companion makes a welcome call that sounds <span className="text-pink-400 font-bold">exactly like a real person</span>. 
                      It introduces itself, learns about the family member, and establishes rapport—all in their regional accent.
                    </p>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="bg-black/30 rounded-lg p-4">
                        <p className="text-pink-400 font-semibold mb-1">Ultra-Realistic Voice</p>
                        <p className="text-xs text-gray-400">Indistinguishable from human conversation</p>
                      </div>
                      <div className="bg-black/30 rounded-lg p-4">
                        <p className="text-pink-400 font-semibold mb-1">Cultural Awareness</p>
                        <p className="text-xs text-gray-400">Speaks with regional accent, understands local customs</p>
                      </div>
                      <div className="bg-black/30 rounded-lg p-4">
                        <p className="text-pink-400 font-semibold mb-1">Emotional Connection</p>
                        <p className="text-xs text-gray-400">Active listening, not just responding</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="bg-gradient-to-r from-emerald-950/40 to-teal-950/40 border border-emerald-500/30 rounded-xl p-8">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
                    <span className="text-3xl font-black text-emerald-400">3</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-emerald-400 mb-3">Daily Engagement Across Channels</h3>
                    <p className="text-gray-300 mb-4">
                      Every day, the AI companion checks in via WhatsApp (text or voice messages), makes phone calls when needed, 
                      and sends medication reminders. The family member can also reach out anytime—it's a true two-way relationship.
                    </p>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="bg-black/30 rounded-lg p-4">
                        <p className="text-emerald-400 font-semibold mb-1">WhatsApp (Inbound & Outbound)</p>
                        <p className="text-xs text-gray-400">Morning check-ins, reminders, they can also message anytime</p>
                      </div>
                      <div className="bg-black/30 rounded-lg p-4">
                        <p className="text-emerald-400 font-semibold mb-1">Voice Calls</p>
                        <p className="text-xs text-gray-400">Scheduled or on-demand conversations</p>
                      </div>
                      <div className="bg-black/30 rounded-lg p-4">
                        <p className="text-emerald-400 font-semibold mb-1">Always Available</p>
                        <p className="text-xs text-gray-400">24/7 companion + healthcare access</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 4 */}
              <div className="bg-gradient-to-r from-amber-950/40 to-orange-950/40 border border-amber-500/30 rounded-xl p-8">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center flex-shrink-0">
                    <span className="text-3xl font-black text-amber-400">4</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-amber-400 mb-3">Data Becomes Market Intelligence</h3>
                    <p className="text-gray-300 mb-4">
                      Every conversation is analyzed (privacy-protected and anonymized) to understand real needs: what products they want, 
                      what healthcare barriers they face, what financial services they need. This data is worth millions to CPG and pharma companies.
                    </p>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="bg-black/30 rounded-lg p-4">
                        <p className="text-amber-400 font-semibold mb-1">Real Behavioral Data</p>
                        <p className="text-xs text-gray-400">Not surveys—actual daily conversations</p>
                      </div>
                      <div className="bg-black/30 rounded-lg p-4">
                        <p className="text-amber-400 font-semibold mb-1">Privacy Protected</p>
                        <p className="text-xs text-gray-400">Aggregated and anonymized insights only</p>
                      </div>
                      <div className="bg-black/30 rounded-lg p-4">
                        <p className="text-amber-400 font-semibold mb-1">New Revenue Stream</p>
                        <p className="text-xs text-gray-400">$1.8M-$4.6M/year potential (post-scale)</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            <div className="mt-8 text-center bg-gradient-to-r from-purple-950/40 to-pink-950/40 border border-purple-500/30 rounded-xl p-8">
              <p className="text-2xl font-bold text-white mb-3">
                The result? <span className="text-purple-400">Reduced loneliness</span>, <span className="text-emerald-400">better health outcomes</span>, 
                and <span className="text-amber-400">data no one else has</span>.
              </p>
              <p className="text-gray-400">
                While competitors offer disconnected services, we've built an AI orchestration that creates value at every layer.
              </p>
            </div>
          </div>

          {/* The Empathy Engine - Our Secret Sauce */}
          <div className="bg-gradient-to-br from-pink-950/50 to-rose-950/50 border border-pink-500/30 rounded-2xl p-8 mb-16">
            <h2 className="text-2xl font-bold text-pink-400 mb-6 text-center">The Empathy Engine: Our Secret Sauce</h2>
            
            <p className="text-gray-300 text-center max-w-3xl mx-auto mb-8">
              Anyone can build a chatbot. We built an <span className="text-pink-400 font-bold">empathy-generating system</span> with 
              15+ proprietary algorithms designed specifically to create authentic emotional connections with elderly users across cultural boundaries.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-black/30 rounded-xl p-6">
                <h3 className="text-lg font-bold text-pink-400 mb-4">Trust-Building Algorithms</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• <span className="text-pink-400">User-Profile Matching:</span> Age, region, personality compatibility scoring</li>
                  <li>• <span className="text-pink-400">Trust Progression Tracking:</span> Adapts conversation depth over time</li>
                  <li>• <span className="text-pink-400">Cultural Mirroring:</span> Regional idioms, speech patterns, references</li>
                  <li>• <span className="text-pink-400">Conversation Pacing:</span> Speed/tone adjusted for elderly users</li>
                  <li>• <span className="text-pink-400">Emotional State Detection:</span> Real-time sentiment analysis</li>
                </ul>
              </div>

              <div className="bg-black/30 rounded-xl p-6">
                <h3 className="text-lg font-bold text-pink-400 mb-4">Engagement Optimization</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• <span className="text-pink-400">Loneliness Severity Assessment:</span> Identifies at-risk users</li>
                  <li>• <span className="text-pink-400">Optimal Contact Timing:</span> When users are most receptive</li>
                  <li>• <span className="text-pink-400">Conversation Topic Selection:</span> Based on user interests/mood</li>
                  <li>• <span className="text-pink-400">Active Listening Simulation:</span> Remembers past conversations</li>
                  <li>• <span className="text-pink-400">Escalation Triggers:</span> Auto-alerts for health/emotional crises</li>
                </ul>
              </div>

              <div className="bg-black/30 rounded-xl p-6">
                <h3 className="text-lg font-bold text-pink-400 mb-4">Healthcare Integration</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• <span className="text-pink-400">Medication Adherence Prediction:</span> Anticipates missed doses</li>
                  <li>• <span className="text-pink-400">Symptom Pattern Recognition:</span> Early health issue detection</li>
                  <li>• <span className="text-pink-400">Healthcare Navigation Guidance:</span> When to see doctor/psychologist</li>
                  <li>• <span className="text-pink-400">Pharmacy Visit Optimization:</span> Discount coordination reminders</li>
                  <li>• <span className="text-pink-400">Family Communication Bridge:</span> Updates migrants on loved ones</li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-r from-pink-500/10 to-rose-500/10 rounded-xl p-6 border border-pink-500/30">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-pink-500/20 border border-pink-500/30 flex items-center justify-center flex-shrink-0">
                  <Heart className="w-6 h-6 text-pink-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Why Competitors Can't Copy This</h3>
                  <p className="text-gray-300 mb-3">
                    These algorithms weren't built by engineers alone—they required collaboration with behavioral psychologists, 
                    geriatric specialists, and cultural anthropologists who understand the <span className="text-pink-400 font-bold">specific emotional needs</span> of 
                    elderly Mexican families separated by migration.
                  </p>
                  <p className="text-pink-400 text-sm italic">
                    ElliQ, Replika, and Joy Calls use generic conversation AI. We built a specialized empathy engine optimized for 
                    our specific user demographic. That's 6+ months of R&D they'd need to replicate—assuming they even know where to start.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* What Makes This Defensible */}
          <div className="bg-gradient-to-br from-purple-950/40 to-indigo-950/40 border border-purple-500/30 rounded-2xl p-8 mb-16">
            <h2 className="text-2xl font-bold text-purple-400 mb-8 text-center">Why This is Hard to Replicate</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              
              <div className="bg-black/30 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Network className="w-8 h-8 text-purple-400" />
                  <h3 className="font-bold text-white text-lg">10-Agent Orchestration + 15+ Algorithms</h3>
                </div>
                <p className="text-gray-300 mb-3">
                  Building ONE AI chatbot is easy—dozens of startups do it. Building a system that intelligently coordinates 
                  10 culturally-tuned agents with <span className="text-purple-400 font-bold">15+ proprietary algorithms</span> for 
                  empathy generation, trust-building, and engagement optimization? That's 6+ months of specialized AI engineering.
                </p>
                <p className="text-purple-400 text-sm italic">
                  Our algorithms include: user-profile matching, emotional state detection, conversation pacing, cultural mirroring, 
                  trust progression scoring, medication adherence prediction, loneliness severity assessment, and more.
                </p>
              </div>

              <div className="bg-black/30 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Mic className="w-8 h-8 text-pink-400" />
                  <h3 className="font-bold text-white text-lg">Enterprise-Scale Voice Infrastructure</h3>
                </div>
                <p className="text-gray-300 mb-3">
                  Most competitors use basic voice bots capped at 100-200 daily calls. We built infrastructure to handle 
                  <span className="text-pink-400 font-bold"> 2,000+ conversations per agent system daily</span> (inbound + outbound). 
                  At full scale with all 10 agents, that's 20,000+ daily interactions—without degradation.
                </p>
                <p className="text-pink-400 text-sm italic">
                  We use ElevenLabs (Hollywood-grade voice AI), custom-tuned voice parameters, and advanced conversation 
                  flow management. Each agent has hundreds of lines of empathy-optimized prompts for natural interactions.
                </p>
              </div>

              <div className="bg-black/30 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Database className="w-8 h-8 text-cyan-400" />
                  <h3 className="font-bold text-white text-lg">Proprietary Data Flywheel</h3>
                </div>
                <p className="text-gray-300 mb-3">
                  Every conversation improves our dataset. By month 12, we'll have behavioral insights on 100,000+ families that 
                  NO ONE else has—making our platform exponentially more valuable to corporate partners and continuously improving our AI.
                </p>
                <p className="text-cyan-400 text-sm italic">
                  More users → better empathy algorithms → more data → higher-value partnerships → better unit economics. 
                  This moat deepens over time. Competitors starting today would be 12+ months behind our data advantage.
                </p>
              </div>

              <div className="bg-black/30 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Globe className="w-8 h-8 text-emerald-400" />
                  <h3 className="font-bold text-white text-lg">Cultural Localization at Scale</h3>
                </div>
                <p className="text-gray-300 mb-3">
                  We don't just translate—we culturally adapt. Each agent understands regional idioms, healthcare customs, 
                  family dynamics, and <span className="text-emerald-400 font-bold">emotional communication patterns</span> specific 
                  to Mexican migration experiences across 10 countries.
                </p>
                <p className="text-emerald-400 text-sm italic">
                  A competitor would need 12-18 months + native cultural consultants + voice AI specialists + behavioral psychologists 
                  to replicate this level of empathy-driven, culturally-authentic interaction design.
                </p>
              </div>

            </div>

            <div className="mt-8 text-center p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-500/30">
              <p className="text-xl font-bold text-white mb-2">
                We're not selling software. We're selling <span className="text-purple-400">6 months of specialized AI engineering</span> + 
                <span className="text-pink-400"> 15+ proprietary algorithms</span> + 
                <span className="text-cyan-400"> enterprise-scale infrastructure</span>.
              </p>
              <p className="text-gray-400 text-sm">
                By the time competitors build something similar, we'll have 100K+ users, proprietary behavioral data worth millions, 
                and a data flywheel they can't catch.
              </p>
            </div>
          </div>

          {/* Live Today */}
          <div className="bg-gradient-to-r from-emerald-950/50 to-cyan-950/50 border border-emerald-500/30 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-emerald-400 mb-6 text-center">This Isn't a Prototype. It's Live Today.</h2>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {[
                { 
                  status: "✅ LIVE", 
                  feature: "Full Registration System", 
                  details: "Demographics capture, 10-agent assignment, instant activation"
                },
                { 
                  status: "✅ LIVE", 
                  feature: "Payment Processing", 
                  details: "Stripe + Square, webhooks, Meta Pixel tracking"
                },
                { 
                  status: "✅ LIVE", 
                  feature: "10 AI Voice Agents", 
                  details: "ElevenLabs voices, ultra-realistic conversations"
                },
                { 
                  status: "✅ LIVE", 
                  feature: "Automated Voice Calls", 
                  details: "Welcome calls, scheduled check-ins, on-demand"
                },
                { 
                  status: "🟡 ACTIVATING", 
                  feature: "WhatsApp Integration", 
                  details: "Inbound & outbound messaging (final approval pending)"
                },
                { 
                  status: "✅ LIVE", 
                  feature: "Data Collection", 
                  details: "Demographics, conversation analytics, behavioral insights"
                }
              ].map((item, i) => (
                <div key={i} className="bg-black/30 rounded-xl p-4 border-l-4 border-emerald-500">
                  <div className={`text-xs font-bold mb-2 ${
                    item.status === '✅ LIVE' ? 'text-emerald-400' : 'text-yellow-400'
                  }`}>
                    {item.status}
                  </div>
                  <h4 className="font-bold text-white mb-1 text-sm">{item.feature}</h4>
                  <p className="text-xs text-gray-400">{item.details}</p>
                </div>
              ))}
            </div>

            <div className="text-center">
              <p className="text-2xl font-bold text-emerald-400 mb-2">
                Most AI health startups are still in PowerPoint mode.
              </p>
              <p className="text-xl text-white">
                We're <span className="text-emerald-400">already operational</span> and ready to scale.
              </p>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};

export default SaludCompartidaInvestorPage;
