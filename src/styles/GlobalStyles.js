import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Crimson+Text:ital,wght@0,400;0,600;1,400&family=MedievalSharp&display=swap');

  :root {
    /* House Colors - More authentic and realistic */
    --gryffindor-primary: #7C0A00;
    --gryffindor-secondary: #D4AF37;
    --gryffindor-tertiary: #FFD700;
    --gryffindor-dark: #5D0700;
    
    --hufflepuff-primary: #F0C40F;
    --hufflepuff-secondary: #1C1C1C;
    --hufflepuff-tertiary: #FFF200;
    --hufflepuff-dark: #DAA520;
    
    --ravenclaw-primary: #0E1A40;
    --ravenclaw-secondary: #946B2D;
    --ravenclaw-tertiary: #5D7B9A;
    --ravenclaw-dark: #0A1335;
    
    --slytherin-primary: #1A472A;
    --slytherin-secondary: #AAAAAA;
    --slytherin-tertiary: #2F5F3F;
    --slytherin-dark: #0F2A17;

    /* Magical Background Colors */
    --night-sky: #0B1426;
    --deep-blue: #1A2B42;
    --dark-purple: #2D1B3D;
    --royal-purple: #4A3B5C;
    --gold-shimmer: #D4AF37;
    --silver-mist: #C0C0C0;
    --warm-parchment: #F4F1E8;
    --old-parchment: #E8E0D0;
    
    /* Text Colors */
    --text-gold: #D4AF37;
    --text-silver: #E5E5E5;
    --text-bronze: #CD7F32;
    --text-copper: #B87333;
    --text-muted: #8B7D6B;
    --text-dark: #2C2C2C;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Crimson Text', serif;
    background: linear-gradient(135deg, 
      var(--night-sky) 0%, 
      var(--deep-blue) 25%,
      var(--dark-purple) 50%,
      var(--royal-purple) 75%,
      var(--night-sky) 100%
    );
    background-attachment: fixed;
    color: var(--text-silver);
    overflow-x: hidden;
    min-height: 100vh;
    
    /* Realistic texture overlay */
    position: relative;
    
    &::before {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: 
        /* Subtle paper texture */
        radial-gradient(circle at 25% 25%, rgba(255,255,255,0.02) 1px, transparent 1px),
        radial-gradient(circle at 75% 75%, rgba(255,255,255,0.01) 1px, transparent 1px),
        /* Magical sparkles */
        radial-gradient(circle at 15% 45%, rgba(212,175,55,0.1) 2px, transparent 2px),
        radial-gradient(circle at 85% 65%, rgba(192,192,192,0.05) 1px, transparent 1px),
        radial-gradient(circle at 45% 85%, rgba(138,43,226,0.03) 1px, transparent 1px);
      background-size: 200px 200px, 150px 150px, 300px 300px, 250px 250px, 400px 400px;
      pointer-events: none;
      z-index: 1;
      animation: subtleSparkle 20s ease-in-out infinite;
    }
    
    &::after {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        45deg,
        transparent 30%,
        rgba(212,175,55,0.02) 50%,
        transparent 70%
      );
      pointer-events: none;
      z-index: 2;
      animation: magicalShimmer 15s ease-in-out infinite;
    }
  }

  /* Enhanced Animations */
  @keyframes subtleSparkle {
    0%, 100% { 
      opacity: 0.3;
      transform: translateY(0px);
    }
    25% { 
      opacity: 0.5;
      transform: translateY(-2px);
    }
    50% { 
      opacity: 0.7;
      transform: translateY(-1px);
    }
    75% { 
      opacity: 0.4;
      transform: translateY(-3px);
    }
  }

  @keyframes magicalShimmer {
    0%, 100% { 
      background-position: -200% 0;
      opacity: 0.1;
    }
    50% { 
      background-position: 200% 0;
      opacity: 0.3;
    }
  }

  @keyframes gentleFloat {
    0%, 100% { 
      transform: translateY(0px) rotate(0deg);
    }
    33% { 
      transform: translateY(-8px) rotate(1deg);
    }
    66% { 
      transform: translateY(-4px) rotate(-0.5deg);
    }
  }

  @keyframes magicalPulse {
    0%, 100% { 
      transform: scale(1);
      box-shadow: 0 0 20px rgba(212,175,55,0.2);
    }
    50% { 
      transform: scale(1.05);
      box-shadow: 0 0 40px rgba(212,175,55,0.4);
    }
  }

  @keyframes shimmerText {
    0% { 
      background-position: -200% 0;
      text-shadow: 0 0 20px rgba(212,175,55,0.2);
    }
    50% {
      text-shadow: 0 0 40px rgba(212,175,55,0.6), 0 0 60px rgba(212,175,55,0.3);
    }
    100% { 
      background-position: 200% 0;
      text-shadow: 0 0 20px rgba(212,175,55,0.2);
    }
  }

  @keyframes enchantedGlow {
    0%, 100% {
      box-shadow: 
        0 0 20px rgba(212,175,55,0.2),
        inset 0 0 20px rgba(212,175,55,0.1);
    }
    50% {
      box-shadow: 
        0 0 40px rgba(212,175,55,0.4),
        0 0 60px rgba(212,175,55,0.2),
        inset 0 0 30px rgba(212,175,55,0.2);
    }
  }

  /* Enhanced Scrollbar */
  ::-webkit-scrollbar {
    width: 14px;
    background: linear-gradient(135deg, var(--night-sky), var(--deep-blue));
  }

  ::-webkit-scrollbar-track {
    background: linear-gradient(135deg, 
      rgba(212,175,55,0.1), 
      rgba(138,43,226,0.1)
    );
    border-radius: 10px;
    border: 2px solid var(--night-sky);
  }

  ::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, 
      var(--gryffindor-secondary), 
      var(--ravenclaw-secondary)
    );
    border-radius: 10px;
    border: 2px solid var(--night-sky);
    box-shadow: inset 0 0 10px rgba(0,0,0,0.3);
    
    &:hover {
      background: linear-gradient(135deg, 
        var(--gryffindor-tertiary), 
        var(--ravenclaw-tertiary)
      );
      box-shadow: 
        inset 0 0 10px rgba(0,0,0,0.3),
        0 0 20px rgba(212,175,55,0.3);
    }
  }

  /* Typography Enhancements */
  h1, h2, h3, h4, h5, h6 {
    font-family: 'Cinzel', serif;
    font-weight: 600;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
  }

  /* Magical Gradient Text Effect */
  .magical-text {
    background: linear-gradient(
      45deg,
      var(--gryffindor-secondary),
      var(--hufflepuff-primary),
      var(--ravenclaw-secondary),
      var(--slytherin-secondary),
      var(--gryffindor-tertiary)
    );
    background-size: 300% 300%;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: shimmerText 4s ease-in-out infinite;
  }

  /* Enhanced Button Styles */
  .magical-button {
    position: relative;
    background: linear-gradient(135deg, 
      rgba(212,175,55,0.8), 
      rgba(184,115,51,0.8)
    );
    border: 2px solid var(--gryffindor-secondary);
    border-radius: 8px;
    padding: 12px 24px;
    color: var(--text-dark);
    font-family: 'Cinzel', serif;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 
      0 4px 15px rgba(212,175,55,0.3),
      inset 0 1px 0 rgba(255,255,255,0.2);
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(255,255,255,0.3),
        transparent
      );
      transition: left 0.5s ease;
    }
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 
        0 8px 25px rgba(212,175,55,0.4),
        0 0 30px rgba(212,175,55,0.3),
        inset 0 1px 0 rgba(255,255,255,0.3);
      
      &::before {
        left: 100%;
      }
    }
    
    &:active {
      transform: translateY(0);
      box-shadow: 
        0 2px 10px rgba(212,175,55,0.4),
        inset 0 2px 5px rgba(0,0,0,0.2);
    }
  }

  /* Realistic Card Styles */
  .enchanted-card {
    background: linear-gradient(135deg,
      rgba(244,241,232,0.95) 0%,
      rgba(232,224,208,0.9) 100%
    );
    border: 2px solid var(--gryffindor-secondary);
    border-radius: 12px;
    padding: 20px;
    backdrop-filter: blur(10px);
    box-shadow: 
      0 8px 32px rgba(0,0,0,0.3),
      0 0 0 1px rgba(212,175,55,0.2),
      inset 0 1px 0 rgba(255,255,255,0.4);
    position: relative;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="rgba(139,125,107,0.1)"/><circle cx="75" cy="75" r="0.5" fill="rgba(139,125,107,0.05)"/><circle cx="50" cy="10" r="0.8" fill="rgba(139,125,107,0.08)"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>') repeat;
      border-radius: 12px;
      pointer-events: none;
      opacity: 0.3;
    }
    
    &:hover {
      transform: translateY(-4px);
      box-shadow: 
        0 12px 40px rgba(0,0,0,0.4),
        0 0 0 1px rgba(212,175,55,0.4),
        inset 0 1px 0 rgba(255,255,255,0.5);
    }
  }

  /* Responsive Typography */
  h1 {
    font-size: clamp(1.8rem, 4vw, 3rem);
    font-weight: 700;
  }

  h2 {
    font-size: clamp(1.4rem, 3vw, 2.2rem);
    font-weight: 600;
  }

  h3 {
    font-size: clamp(1.2rem, 2.5vw, 1.8rem);
    font-weight: 500;
  }

  p {
    font-size: clamp(0.9rem, 1.5vw, 1.1rem);
  }

  /* Utility Classes */
  .text-center { text-align: center; }
  .text-left { text-align: left; }
  .text-right { text-align: right; }

  .mb-1 { margin-bottom: 0.5rem; }
  .mb-2 { margin-bottom: 1rem; }
  .mb-3 { margin-bottom: 1.5rem; }
  .mb-4 { margin-bottom: 2rem; }

  .mt-1 { margin-top: 0.5rem; }
  .mt-2 { margin-top: 1rem; }
  .mt-3 { margin-top: 1.5rem; }
  .mt-4 { margin-top: 2rem; }

  .p-1 { padding: 0.5rem; }
  .p-2 { padding: 1rem; }
  .p-3 { padding: 1.5rem; }
  .p-4 { padding: 2rem; }

  .float { animation: gentleFloat 6s ease-in-out infinite; }
  .pulse { animation: magicalPulse 3s ease-in-out infinite; }
  .glow { animation: enchantedGlow 4s ease-in-out infinite; }

  /* Focus and Selection */
  ::selection {
    background: rgba(212,175,55,0.3);
    color: var(--text-silver);
  }

  *:focus {
    outline: 2px solid var(--gryffindor-secondary);
    outline-offset: 2px;
  }

  /* Button and Input Base Styles */
  button {
    cursor: pointer;
    border: none;
    font-family: inherit;
    transition: all 0.3s ease;
    
    &:disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }
  }

  input {
    font-family: inherit;
    border: none;
    outline: none;
    transition: all 0.3s ease;
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    body {
      font-size: 14px;
    }
    
    .magical-button {
      padding: 10px 20px;
      font-size: 14px;
    }
    
    .enchanted-card {
      padding: 16px;
      margin: 10px;
    }
  }

  @media (max-width: 480px) {
    ::-webkit-scrollbar {
      width: 8px;
    }
    
    .magical-button {
      padding: 8px 16px;
      font-size: 12px;
    }
    
    .enchanted-card {
      padding: 12px;
      margin: 8px;
    }
  }

  /* Print Styles */
  @media print {
    body {
      background: white !important;
      color: black !important;
    }
    
    body::before,
    body::after {
      display: none !important;
    }
    
    .magical-button,
    .enchanted-card {
      box-shadow: none !important;
      background: white !important;
      border: 1px solid black !important;
    }
  }
`;