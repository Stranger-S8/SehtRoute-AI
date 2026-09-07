import React, { useState } from 'react';
import { PITCH_DECK_SLIDES } from '../data/pitchDeckData';
import { ChevronLeft, ChevronRight, Play, Presentation, MessageSquare, Maximize2, ExternalLink } from 'lucide-react';

export default function PitchDeckModal({ onSwitchToSimulation }) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [showSpeakerNotes, setShowSpeakerNotes] = useState(true);

  const slide = PITCH_DECK_SLIDES[currentSlideIndex];

  const handleNext = () => {
    if (currentSlideIndex < PITCH_DECK_SLIDES.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '1400px', margin: '0 auto', paddingBottom: '40px' }}>
      {/* Top Deck Control Bar */}
      <div className="glass-panel" style={{ padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Presentation size={20} color="#8b5cf6" />
          <span style={{ fontSize: '1rem', fontWeight: 800, color: '#ffffff' }}>
            Executive Submission Pitch Deck (7 Slides)
          </span>
          <span className="badge" style={{ background: 'rgba(139, 92, 246, 0.2)', color: '#c4b5fd', border: '1px solid rgba(139, 92, 246, 0.4)' }}>
            Slide {slide.slideNumber} of 7
          </span>
        </div>

        {/* Slide Selector Pills */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {PITCH_DECK_SLIDES.map((s, idx) => (
            <button
              key={s.slideNumber}
              onClick={() => setCurrentSlideIndex(idx)}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                border: idx === currentSlideIndex ? '1px solid #8b5cf6' : '1px solid rgba(255, 255, 255, 0.1)',
                background: idx === currentSlideIndex ? 'rgba(139, 92, 246, 0.25)' : 'rgba(255, 255, 255, 0.03)',
                color: idx === currentSlideIndex ? '#ffffff' : 'var(--text-secondary)',
                fontWeight: 700,
                fontSize: '0.8rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {s.slideNumber}
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            className="btn btn-outline"
            onClick={() => setShowSpeakerNotes(!showSpeakerNotes)}
            style={{ fontSize: '0.78rem', padding: '6px 12px' }}
          >
            <MessageSquare size={14} />
            <span>{showSpeakerNotes ? 'Hide Speaker Notes' : 'Show Speaker Notes'}</span>
          </button>

          <button
            className="btn btn-primary"
            onClick={onSwitchToSimulation}
            style={{ fontSize: '0.78rem', padding: '6px 14px' }}
          >
            <Play size={14} />
            <span>Switch to Live Simulation</span>
          </button>
        </div>
      </div>

      {/* Main Slide Canvas */}
      <div className="glass-panel" style={{
        minHeight: '480px',
        padding: '40px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: 'linear-gradient(135deg, rgba(13, 19, 34, 0.95) 0%, rgba(7, 10, 18, 0.98) 100%)',
        border: '1px solid rgba(139, 92, 246, 0.3)',
        boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Slide Header */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.76rem', letterSpacing: '0.12em', color: '#8b5cf6', fontWeight: 800, textTransform: 'uppercase' }}>
              {slide.tag}
            </span>
            <span style={{ fontSize: '0.76rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
              SEHATROUTE AI // ALK-1023
            </span>
          </div>

          <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.03em', lineHeight: 1.2, marginBottom: '8px' }}>
            {slide.title}
          </h2>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#38bdf8', marginBottom: '24px' }}>
            {slide.subtitle}
          </h3>

          {/* Core Thesis Highlight */}
          <div style={{
            background: 'rgba(6, 182, 212, 0.08)',
            borderLeft: '4px solid #06b6d4',
            padding: '16px 20px',
            borderRadius: '8px',
            fontSize: '0.95rem',
            color: '#f1f5f9',
            lineHeight: 1.6,
            marginBottom: '32px'
          }}>
            {slide.coreThesis}
          </div>

          {/* Key Points Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            {slide.keyPoints.map((pt, i) => (
              <div
                key={i}
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '10px',
                  padding: '16px'
                }}
              >
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#a78bfa', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '6px' }}>
                  {pt.label}
                </div>
                <div style={{ fontSize: '0.86rem', color: '#e2e8f0', lineHeight: 1.5 }}>
                  {pt.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Slide Footer Navigation */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '20px', marginTop: '30px' }}>
          <button
            className="btn btn-outline"
            onClick={handlePrev}
            disabled={currentSlideIndex === 0}
            style={{ opacity: currentSlideIndex === 0 ? 0.4 : 1 }}
          >
            <ChevronLeft size={16} />
            <span>Previous Slide</span>
          </button>

          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
            Use Left / Right arrow keys to navigate
          </div>

          <button
            className="btn btn-primary"
            onClick={handleNext}
            disabled={currentSlideIndex === PITCH_DECK_SLIDES.length - 1}
            style={{ opacity: currentSlideIndex === PITCH_DECK_SLIDES.length - 1 ? 0.4 : 1 }}
          >
            <span>Next Slide</span>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Speaker Notes Drawer (Crucial for Video Recording) */}
      {showSpeakerNotes && (
        <div className="glass-panel" style={{
          padding: '20px 24px',
          borderLeft: '4px solid #8b5cf6',
          background: 'rgba(13, 20, 36, 0.85)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <MessageSquare size={16} color="#c4b5fd" />
            <span style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#c4b5fd' }}>
              Pitch Presenter Notes // Video Recording Script for Slide {slide.slideNumber}
            </span>
          </div>
          <p style={{ fontSize: '0.88rem', color: '#e2e8f0', lineHeight: 1.6, fontStyle: 'italic' }}>
            "{slide.speakerNotes}"
          </p>
        </div>
      )}
    </div>
  );
}
