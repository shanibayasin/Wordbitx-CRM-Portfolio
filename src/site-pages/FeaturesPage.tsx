'use client';

import React, { useState } from 'react';
import { ArrowRight, Check, Search, Filter, Layers, Sparkles, Target, Headphones, GitPullRequest, Bot, Shield, BarChart3 } from 'lucide-react';
import { FEATURES_DATA, FeatureDetail } from '../data/featuresData';
import { Button } from '../components/ui/Button';
import { useNavigation } from '../context/NavigationContext';

export const FeaturesPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const { navigate, openExploreDemo } = useNavigation();

  const categories = ['All', 'Sales', 'Operations', 'Intelligence', 'Platform'];

  const filteredFeatures = FEATURES_DATA.filter((feat) => {
    const matchesCat = selectedCategory === 'All' || feat.category === selectedCategory;
    const matchesSearch =
      feat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      feat.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      feat.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="w-full py-12 md:py-20 bg-[#f5f8f6] dark:bg-[#071714]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
            Platform Capabilities Catalog
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white tracking-tight text-balance">
            Every feature designed for modern business operations.
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed text-balance">
            Explore how WordbitX unifies leads, pipelines, telephony call centers, tickets, workflows, and AI intelligence into one cohesive platform.
          </p>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 p-2 bg-white dark:bg-[#0b1f1b] rounded-2xl border border-slate-200/80 dark:border-[#183932] shadow-xs">
          {/* Category Filter Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto p-1 text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-[#0b1f1b] text-white dark:bg-emerald-500 dark:text-[#0b1f1b] font-semibold shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search features..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-[#0e2722] border border-slate-200 dark:border-[#183932] rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-emerald-600"
            />
          </div>
        </div>

        {/* Features List */}
        <div className="space-y-8 max-w-5xl mx-auto">
          {filteredFeatures.length === 0 ? (
            <div className="text-center py-16 text-sm text-slate-500">
              No features match your query. Try a different search term or category.
            </div>
          ) : (
            filteredFeatures.map((feat, idx) => (
              <div
                key={feat.id}
                className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#0b1f1b] border border-slate-200/80 dark:border-[#183932] shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-start hover:border-emerald-300 dark:hover:border-emerald-700/60 transition-colors"
              >
                {/* Left 7 cols: Content */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-300 px-2.5 py-0.5 rounded-md bg-emerald-50 dark:bg-[#122e28] border border-emerald-100 dark:border-[#1e483e]">
                      {feat.category}
                    </span>
                    <span className="text-slate-300 dark:text-slate-700">·</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">{feat.tagline}</span>
                  </div>

                  <h2 className="text-2xl font-bold font-display text-slate-900 dark:text-white">
                    {feat.title}
                  </h2>

                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {feat.description}
                  </p>

                  <div className="space-y-2 pt-2 text-xs">
                    {feat.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-slate-700 dark:text-slate-300">
                        <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
                        <span className="leading-snug">{h}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 flex items-center gap-3">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => navigate('/demo')}
                      iconRight={<ArrowRight className="w-3.5 h-3.5" />}
                      className="bg-[#0b1f1b] hover:bg-[#12332c] text-white border-transparent"
                    >
                      {feat.ctaText}
                    </Button>
                    <button
                      onClick={openExploreDemo}
                      className="text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                    >
                      Inspect in Live App
                    </button>
                  </div>
                </div>

                {/* Right 5 cols: Use Case Callout */}
                <div className="lg:col-span-5 p-5 rounded-xl bg-slate-50 dark:bg-[#0e2722] border border-slate-200/80 dark:border-[#183932] space-y-3 text-xs">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    Real-World Operational Scenario
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed italic">
                    "{feat.useCase}"
                  </p>
                  <div className="pt-2 border-t border-slate-200/60 dark:border-[#183932] flex items-center justify-between text-[11px] text-slate-500">
                    <span>Target Deployment: Standard</span>
                    <span className="font-semibold text-emerald-700 dark:text-emerald-400">Ready Out of the Box</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
