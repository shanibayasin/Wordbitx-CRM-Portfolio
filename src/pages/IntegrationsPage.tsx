import React, { useState } from 'react';
import { Search, ArrowRight, ExternalLink, Check, Plus, Key, Webhook, X } from 'lucide-react';
import { INTEGRATIONS_DATA, IntegrationDetail } from '../data/integrationsData';
import { Button } from '../components/ui/Button';
import { useNavigation } from '../context/NavigationContext';

export const IntegrationsPage: React.FC = () => {
  const [selectedCat, setSelectedCat] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [connectModalItem, setConnectModalItem] = useState<IntegrationDetail | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectSuccess, setConnectSuccess] = useState(false);
  const { navigate } = useNavigation();

  const categories = ['All', 'Communication', 'Telephony', 'Sales', 'Productivity', 'Developer', 'Automation'];

  const filtered = INTEGRATIONS_DATA.filter((item) => {
    const matchesCat = selectedCat === 'All' || item.category === selectedCat;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleSimulateConnect = () => {
    setIsConnecting(true);
    setTimeout(() => {
      setIsConnecting(false);
      setConnectSuccess(true);
      setTimeout(() => {
        setConnectSuccess(false);
        setConnectModalItem(null);
      }, 1500);
    }, 800);
  };

  return (
    <div className="w-full py-12 md:py-20 bg-[#f5f8f6] dark:bg-[#071714]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
            Ecosystem Directory
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white tracking-tight text-balance">
            Connect the communication & telephony tools you rely on.
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed text-balance">
            Plug your existing email hosts, telephony carriers, messaging channels, and payment systems into WordbitX without replacing your hardware.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 p-2 bg-white dark:bg-[#0b1f1b] rounded-2xl border border-slate-200/80 dark:border-[#183932] shadow-xs">
          <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto p-1 text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`px-3 py-1.5 rounded-xl font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  selectedCat === cat
                    ? 'bg-[#0b1f1b] text-white dark:bg-emerald-500 dark:text-[#0b1f1b] font-semibold shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search integrations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-[#0e2722] border border-slate-200 dark:border-[#183932] rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-emerald-600"
            />
          </div>
        </div>

        {/* Integrations Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-2xl bg-white dark:bg-[#0b1f1b] border border-slate-200/80 dark:border-[#183932] shadow-xs flex flex-col justify-between space-y-5 hover:border-emerald-300 dark:hover:border-emerald-700/60 transition-colors"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`px-2.5 py-1 rounded-xl text-xs font-bold ${item.iconColor}`}>
                    {item.name.split(' ')[0]}
                  </span>
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                      item.status === 'Available'
                        ? 'bg-emerald-50 dark:bg-[#122e28] text-emerald-800 dark:text-emerald-300 border border-emerald-200/80 dark:border-[#1e483e]'
                        : item.status === 'Connect'
                        ? 'bg-emerald-50/80 dark:bg-[#122e28] text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-[#1e483e]'
                        : item.status === 'Enterprise'
                        ? 'bg-teal-50 dark:bg-teal-950/40 text-teal-800 dark:text-teal-300 border border-teal-200 dark:border-teal-800'
                        : 'bg-slate-100 dark:bg-[#122e28] text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>

                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  {item.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-snug">
                  {item.tagline}
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed pt-1">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-[#183932] flex items-center justify-between">
                <span className="text-[11px] text-slate-400 font-medium">
                  {item.category}
                </span>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setConnectModalItem(item)}
                >
                  Configure
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Missing integration bar */}
        <div className="p-8 rounded-2xl bg-white dark:bg-[#0b1f1b] border border-slate-200/80 dark:border-[#183932] max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Need a custom telephony or internal ERP bridge?</h4>
            <p className="text-xs text-slate-500 mt-0.5">Use our REST API and webhooks, or request a custom adapter from our team.</p>
          </div>
          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate('/contact')}
            className="bg-[#0b1f1b] hover:bg-[#12332c] border-transparent text-white"
          >
            Request Integration
          </Button>
        </div>

        {/* Connection Modal */}
        {connectModalItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
            <div className="bg-white dark:bg-[#0b1f1b] rounded-2xl border border-slate-200/80 dark:border-[#183932] max-w-md w-full p-6 shadow-2xl relative">
              <button
                onClick={() => setConnectModalItem(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <span className={`px-2.5 py-1 rounded-xl text-xs font-bold ${connectModalItem.iconColor}`}>
                  {connectModalItem.name.split(' ')[0]}
                </span>
                <div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white">
                    Connect {connectModalItem.name}
                  </h3>
                  <span className="text-xs text-slate-500">Status: {connectModalItem.status}</span>
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                This integration enables real-time synchronization between WordbitX customer records and {connectModalItem.name}.
              </p>

              <div className="space-y-3 p-3.5 bg-slate-50 dark:bg-[#0e2722] rounded-xl border border-slate-200/80 dark:border-[#183932] text-xs">
                <div>
                  <label className="text-[11px] font-medium text-slate-500 block mb-1">API Key / Account SID</label>
                  <input
                    type="password"
                    defaultValue="wbx_live_pk_test_sample"
                    className="w-full p-2 text-xs bg-white dark:bg-[#071714] border border-slate-300 dark:border-[#183932] rounded-lg text-slate-900 dark:text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-medium text-slate-500 block mb-1">Target Workspace</label>
                  <select className="w-full p-2 text-xs bg-white dark:bg-[#071714] border border-slate-300 dark:border-[#183932] rounded-lg text-slate-900 dark:text-white">
                    <option>ABC Technologies — Primary Workspace</option>
                    <option>Customer Support Desk</option>
                  </select>
                </div>
              </div>

              {connectSuccess ? (
                <div className="mt-4 p-3 bg-emerald-50 dark:bg-[#122e28] text-emerald-700 dark:text-emerald-300 rounded-xl text-xs text-center font-semibold border border-emerald-200 dark:border-[#1e483e]">
                  ✓ Connected successfully to WordbitX!
                </div>
              ) : (
                <div className="mt-6 flex justify-end gap-2">
                  <Button variant="outline" size="sm" onClick={() => setConnectModalItem(null)}>
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={handleSimulateConnect}
                    isLoading={isConnecting}
                    className="bg-[#0b1f1b] hover:bg-[#12332c] border-transparent text-white"
                  >
                    Test & Save Connection
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
