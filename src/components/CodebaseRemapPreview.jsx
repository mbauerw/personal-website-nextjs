'use client'
import React from "react";
import { Github } from "lucide-react";
import ScrollReveal from "./animation/ScrollReveal";

// Preview of the codebase-remap landing hero (visual-codebase/frontend/src/pages/UploadPage.tsx),
// minus its navbar, with a single GitHub link in place of the original action buttons.
const REPO_URL = "https://github.com/mbauerw/visual-codebase";

function CodebaseRemapPreview({ className = "" }) {
  return (
    <section className={`relative min-h-[110vh] flex items-center justify-center py-20 px-4 overflow-hidden bg-[#FAFAFA] text-gray-800 font-jakarta ${className}`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          className="absolute inset-0 opacity-[0.4] w-full h-full object-cover"
          src="/images/projects/spiral-grid-blue.jpeg"
          alt=""
        />

        {/* Gradient orbs */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br from-[#8FBCFA]/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/2 -right-40 w-96 h-96 bg-gradient-to-br from-[#FF9A9D]/20 to-transparent rounded-full blur-3xl" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <ScrollReveal threshold={0.3} distance={30} duration={1}>
          {/* text-[3rem] rather than text-5xl: globals.css redefines .text-5xl unlayered, which overrides the responsive sizes */}
          <h2 className="text-[3rem] sm:text-6xl md:text-7xl lg:text-8xl font-bold text-gray-900 tracking-tight leading-[1.1] mb-6">
            codebase-<br className="sm:hidden" />remap
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Visualize your codebase architecture with AI-powered dependency analysis.
            Understand file relationships at a glance.
          </p>
          <a
            href={REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-full font-medium text-lg transition-all hover:scale-[1.02] shadow-lg shadow-gray-900/20"
          >
            <Github size={22} />
            View on GitHub
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}

export default CodebaseRemapPreview;
