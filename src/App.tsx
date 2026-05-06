/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, XCircle, Sword, Wand2, Shield, Heart, Zap, History, RotateCcw, Volume2, Settings, Smartphone } from 'lucide-react';
import { useGameLogic } from './hooks/useGameLogic';

export default function App() {
  const {
    round,
    wordIndex,
    mp,
    currentWord,
    gameState,
    totalCorrect,
    handleAnswer,
    resetGame
  } = useGameLogic();

  const [isPortrait, setIsPortrait] = useState(window.innerHeight > window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setIsPortrait(window.innerHeight > window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  const isGameOver = gameState === 'won' || gameState === 'lost';

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-2 md:p-8 bg-[#0c0a1f] relative overflow-hidden">
      {/* Orientation Warning Overlay */}
      <AnimatePresence>
        {isPortrait && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#0c0a1f] flex flex-col items-center justify-center text-center p-8 lg:hidden"
          >
             <motion.div 
               animate={{ rotate: [0, 90, 90, 0] }}
               transition={{ duration: 2, repeat: Infinity, times: [0, 0.4, 0.6, 1] }}
               className="mb-6"
             >
                <Smartphone className="w-20 h-20 text-yellow-500" />
             </motion.div>
             <h1 className="text-2xl font-black text-white uppercase mb-2 tracking-[0.2em]">Rote su dispositivo</h1>
             <p className="text-blue-200 font-medium">Este juego está optimizado para modo horizontal.</p>
             <div className="mt-8 w-32 h-1 bg-yellow-500/20 rounded-full overflow-hidden">
                <motion.div 
                  animate={{ x: [-128, 128] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  className="w-full h-full bg-yellow-500 shadow-[0_0_10px_#eab308]"
                />
             </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Background Ambience */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600 rounded-full blur-[120px] animate-pulse delay-1000" />
      </div>

      {/* Main Container */}
      <div className="w-full h-[100dvh] relative z-10 flex items-center justify-center overflow-hidden">
        
        {/* Battle Scene - Stage (The Hero) */}
        <main className="relative aspect-[1792/1024] w-full h-full max-w-full max-h-full shadow-2xl overflow-hidden bg-black">
           {/* Actual Background Image - Matches aspect ratio exactly */}
           <img 
             src="assets/BackgroundWordBattle.png" 
             className="absolute inset-0 w-full h-full object-fill pointer-events-none"
             alt=""
           />
           
           <div className="absolute inset-0 z-10 w-full h-full">
             {/* Wizard Anchor (X:316, Y:690) 
                 X: 316 / 1792 = 17.63%
                 Y: 690 / 1024 = 67.38%
             */}
             <motion.div 
               animate={gameState === 'hit' ? { x: [0, 50, 0], scale: [1, 1.1, 1] } : gameState === 'miss' ? { x: [0, -10, 10, -10, 0] } : {}}
               className="absolute left-[17.63%] top-[67.38%] -translate-x-1/2 -translate-y-full flex flex-col items-center justify-end w-[28%] h-[50%] z-10"
             >
               <div className="relative w-full h-full flex items-center justify-center">
                 <div className="w-full h-full flex items-center justify-center float-animation relative">
                    <img 
                      src="assets/Mage.png" 
                      alt="Mago" 
                      className="max-w-full max-h-full object-contain magic-glow drop-shadow-[0_0_35px_rgba(59,130,246,0.7)]" 
                      referrerPolicy="no-referrer" 
                    />
                 </div>
                 {/* Spell Effect */}
                 <AnimatePresence>
                   {gameState === 'hit' && (
                     <motion.div 
                       initial={{ scale: 0, opacity: 0 }}
                       animate={{ scale: 2, opacity: 1 }}
                       exit={{ scale: 3, opacity: 0 }}
                       className="absolute inset-0 flex items-center justify-center pointer-events-none"
                     >
                        <Sparkles className="w-48 h-48 text-blue-300 animate-spin" />
                     </motion.div>
                   )}
                 </AnimatePresence>
               </div>
             </motion.div>

             {/* Central Word Orb - Centered vertically and horizontally */}
             <div className="absolute left-1/2 top-[45%] -translate-x-1/2 -translate-y-1/2 z-20">
                <AnimatePresence mode="wait">
                 {!isGameOver && currentWord && (
                   <motion.div
                     key={currentWord.text}
                     initial={{ scale: 0, rotate: -20, opacity: 0 }}
                     animate={{ scale: 1, rotate: 0, opacity: 1 }}
                     exit={{ scale: 1.5, opacity: 0, filter: 'blur(10px)' }}
                     transition={{ type: 'spring', damping: 12 }}
                     className="w-40 h-40 md:w-64 md:h-64 lg:w-80 lg:h-80 bg-gradient-to-br from-indigo-500/20 to-purple-600/30 rounded-full flex items-center justify-center border-4 border-white/10 shadow-[0_0_70px_rgba(139,92,246,0.5)] relative backdrop-blur-sm"
                   >
                     <div className="absolute inset-0 rounded-full border-t-2 border-white/20 animate-spin" style={{ animationDuration: '8s' }} />
                     <div className="absolute inset-4 rounded-full border-b-2 border-[#d4af37]/20 animate-reverse-spin" style={{ animationDuration: '6s' }} />
                     <span className="text-2xl md:text-5xl lg:text-7xl font-black text-white tracking-widest drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] px-4 text-center">
                       {currentWord.text}
                     </span>
                   </motion.div>
                 )}
                </AnimatePresence>
             </div>

             {/* Enemy Anchor (X:1476, Y:690) 
                 X: 1476 / 1792 = 82.37%
                 Y: 690 / 1024 = 67.38%
             */}
             <motion.div 
               animate={gameState === 'miss' ? { x: [0, -50, 0], scale: [1, 1.1, 1] } : gameState === 'hit' ? { rotate: [0, 5, -5, 0] } : {}}
               className="absolute left-[82.37%] top-[67.38%] -translate-x-1/2 -translate-y-full flex flex-col items-center justify-end w-[28%] h-[50%]"
             >
               <div className="w-full h-full flex items-center justify-center float-animation relative" style={{ animationDelay: '0.5s' }}>
                 <img 
                   src="assets/Enemy.png" 
                   alt="Burro" 
                   className="max-w-full max-h-full object-contain drop-shadow-[0_0_35px_rgba(239,68,68,0.7)]" 
                   referrerPolicy="no-referrer" 
                 />
               </div>
             </motion.div>
           </div>
        </main>

        {/* HUD OVERLAY - Stats Floating Top */}
        <header className="absolute top-4 left-4 right-4 flex justify-between items-start gap-4 z-30 pointer-events-none">
          {/* Wizard Stats */}
          <div className="magic-card p-2 md:p-3 flex items-center gap-2 md:gap-3 min-w-[140px] md:min-w-[220px] pointer-events-auto bg-[#0c0a1f]/80">
            <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-blue-900/50 flex items-center justify-center border border-blue-400/50 shrink-0">
              <Wand2 className="text-blue-400 w-4 h-4 md:w-6 md:h-6" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-end mb-1">
                <span className="text-[8px] md:text-xs font-bold uppercase tracking-widest text-blue-200">Mago</span>
                <span className="text-[8px] md:text-xs font-mono text-blue-300">{mp}/3</span>
              </div>
              <div className="stat-bar-container h-2 md:h-3">
                <motion.div 
                  initial={false}
                  animate={{ width: `${(mp / 3) * 100}%` }}
                  className="h-full bg-blue-500 shadow-[0_0_10px_2px_#3b82f6]"
                />
              </div>
            </div>
          </div>

          {/* Round Indicator */}
          <div className="magic-card px-3 md:px-6 py-1 md:py-2 relative overflow-hidden group pointer-events-auto bg-[#0c0a1f]/80">
            <h2 className="text-sm md:text-xl font-bold tracking-[0.1em] md:tracking-[0.2em] uppercase text-yellow-400 whitespace-nowrap">Round {round}/3</h2>
            <p className="text-[7px] md:text-[9px] text-center uppercase tracking-widest text-blue-200">Palabra {wordIndex + 1} / 10</p>
          </div>

          {/* Donkey Stats */}
          <div className="magic-card p-2 md:p-3 flex items-center flex-row-reverse gap-2 md:gap-3 min-w-[140px] md:min-w-[220px] pointer-events-auto bg-[#0c0a1f]/80">
             <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-red-900/50 flex items-center justify-center border border-red-400/50 shrink-0">
              <Sword className="text-red-400 w-4 h-4 md:w-6 md:h-6" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-end mb-1">
                <span className="text-[8px] md:text-xs font-bold uppercase tracking-widest text-red-200">Burro</span>
                <span className="text-[8px] md:text-xs font-mono text-red-300">HP: {Math.max(0, Math.floor(100 - (totalCorrect * 3.33)))}%</span>
              </div>
               <div className="stat-bar-container h-2 md:h-3">
                <motion.div 
                  initial={false}
                  animate={{ width: `${Math.max(0, 100 - (totalCorrect * 3.34))}%` }}
                  className="h-full bg-red-500 shadow-[0_0_10px_2px_#ef4444]"
                />
              </div>
            </div>
          </div>
        </header>

        {/* HUD OVERLAY - Controls Floating Bottom */}
        <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-2 md:gap-4 z-30 pointer-events-none">
          <footer className="grid grid-cols-3 gap-2 md:gap-4 h-24 md:h-28 pointer-events-auto">
            <button 
              disabled={gameState !== 'playing' || isGameOver}
              onClick={() => handleAnswer('aguda')}
              className={`magic-card btn-aguda p-1 md:p-2 flex flex-col items-center justify-center transition-opacity bg-emerald-900/60 ${gameState !== 'playing' ? 'opacity-50' : 'opacity-100'}`}
            >
              <span className="text-lg md:text-2xl font-black uppercase text-white tracking-wider">Aguda</span>
              <span className="text-[7px] md:text-[9px] uppercase font-bold text-emerald-200 opacity-80">Última</span>
            </button>

             <button 
               disabled={gameState !== 'playing' || isGameOver}
               onClick={() => handleAnswer('grave')}
               className={`magic-card btn-grave p-1 md:p-2 flex flex-col items-center justify-center transition-opacity bg-amber-900/60 ${gameState !== 'playing' ? 'opacity-50' : 'opacity-100'}`}
             >
              <span className="text-lg md:text-2xl font-black uppercase text-white tracking-wider">Grave</span>
              <span className="text-[7px] md:text-[9px] uppercase font-bold text-amber-200 opacity-80">Penúltima</span>
            </button>

             <button 
               disabled={gameState !== 'playing' || isGameOver}
               onClick={() => handleAnswer('esdrújula')}
               className={`magic-card btn-esdrujula p-1 md:p-2 flex flex-col items-center justify-center transition-opacity bg-purple-900/60 ${gameState !== 'playing' ? 'opacity-50' : 'opacity-100'}`}
             >
              <span className="text-lg md:text-2xl font-black uppercase text-white tracking-wider">Esdrújula</span>
              <span className="text-[7px] md:text-[9px] uppercase font-bold text-purple-200 opacity-80">Antep.</span>
            </button>
          </footer>

          {/* Bottom Status Bar */}
          <div className="flex justify-between items-center px-2 text-[#d4af37] pointer-events-auto">
             <div className="flex gap-4 items-center">
               <Volume2 className="w-4 h-4 cursor-pointer opacity-70 hover:opacity-100" />
               <div className="hidden md:block w-[1px] h-4 bg-[#d4af37]/30" />
               <div className="hidden md:block text-[8px] md:text-[10px] uppercase font-bold opacity-50 tracking-wider">
                 Educational RPG v1.3
               </div>
             </div>

             <div className="flex-1 px-8 md:px-32">
                <div className="h-1 bg-black/40 rounded-full border border-[#d4af37]/20 relative">
                  <motion.div 
                    initial={false}
                    animate={{ width: `${(totalCorrect / 30) * 100}%` }}
                    className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full"
                  />
                </div>
             </div>

             <div className="flex gap-4 items-center">
               <Settings className="w-4 h-4 cursor-pointer opacity-70 hover:opacity-100" />
             </div>
          </div>
        </div>
      </div>

      {/* Modals for Win/Loss */}
      <AnimatePresence>
        {isGameOver && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-6"
          >
            <motion.div 
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              className="magic-card max-w-lg w-full p-12 flex flex-col items-center text-center gap-6"
            >
              {gameState === 'won' ? (
                <>
                  <div className="w-24 h-24 bg-yellow-400/20 rounded-full flex items-center justify-center">
                    <Sparkles className="w-12 h-12 text-yellow-400" />
                  </div>
                  <h1 className="text-4xl font-black text-yellow-400 uppercase tracking-widest">¡Victoria Magistral!</h1>
                  <p className="text-blue-200">Has derrotado al Burro Malvado y salvado el conocimiento de la acentuación.</p>
                  <div className="grid grid-cols-2 gap-4 w-full">
                     <div className="magic-card p-4">
                       <span className="block text-2xl font-bold">{totalCorrect}</span>
                       <span className="text-[10px] uppercase text-gray-400">Aciertos</span>
                     </div>
                     <div className="magic-card p-4">
                       <span className="block text-2xl font-bold">100%</span>
                       <span className="text-[10px] uppercase text-gray-400">Sabiduría</span>
                     </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-24 h-24 bg-red-400/20 rounded-full flex items-center justify-center">
                    <XCircle className="w-12 h-12 text-red-400" />
                  </div>
                  <h1 className="text-4xl font-black text-red-500 uppercase tracking-widest">Fin del Juego</h1>
                  <p className="text-red-200">Tu magia se ha agotado. El Burro Malvado ha ganado esta vez.</p>
                </>
              )}
              
              <button 
                onClick={resetGame}
                className="mt-6 flex items-center gap-2 bg-blue-600 hover:bg-blue-500 px-8 py-3 rounded-full font-bold uppercase tracking-widest text-white ring-4 ring-blue-900/30 transition-all active:scale-95"
              >
                <RotateCcw className="w-5 h-5" />
                Intentar de nuevo
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes reverse-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        .animate-reverse-spin {
          animation: reverse-spin infinite linear;
        }
      `}</style>
    </div>
  );
}
