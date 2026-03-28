import { useState } from "react";
import { motion } from "motion/react";
import { MoveRight, MoveLeft, Navigation } from "lucide-react";

export function NegativeNumbersDemo() {
  const [position, setPosition] = useState(0);
  const [history, setHistory] = useState<string[]>([]);

  const move = (amount: number) => {
    const newPos = Math.max(-10, Math.min(10, position + amount));
    if (newPos !== position) {
      setHistory(prev => {
        const newHistory = [...prev, `${position} ${amount > 0 ? '+' : '-'} ${Math.abs(amount)} = ${newPos}`];
        return newHistory.slice(-4); // Keep last 4
      });
      setPosition(newPos);
    }
  };

  const scale = 30; // pixels per unit

  return (
    <div className="p-8 bg-white rounded-2xl shadow-sm border border-slate-100">
      <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
        <Navigation className="text-sky-500" size={28} /> 负数的初步认识 (数轴)
      </h2>

      <div className="flex flex-col items-center gap-12">
        <p className="text-lg text-slate-600 text-center">
          0 并不是最小的数。在 0 的左边，还有<span className="font-bold text-red-500">负数</span>。<br/>
          向右走是加法（正数），向左走是减法（负数）。
        </p>

        {/* Number Line Visualizer */}
        <div className="relative w-full max-w-3xl h-32 flex items-center justify-center mt-8">
          
          {/* The Line */}
          <div className="absolute left-0 right-0 h-1 bg-slate-300"></div>
          
          {/* Ticks and Labels */}
          <div className="absolute left-0 right-0 flex justify-between px-4">
            {Array.from({ length: 21 }).map((_, i) => {
              const val = i - 10;
              const isZero = val === 0;
              const isNegative = val < 0;
              return (
                <div key={i} className="flex flex-col items-center relative" style={{ width: 0 }}>
                  <div className={`w-0.5 h-4 ${isZero ? 'bg-slate-800 h-6 -mt-1' : 'bg-slate-400'}`}></div>
                  <div className={`absolute top-6 font-bold text-sm ${isZero ? 'text-slate-800 text-lg' : isNegative ? 'text-red-500' : 'text-sky-600'}`}>
                    {val}
                  </div>
                </div>
              );
            })}
          </div>

          {/* The Character (Car/Frog) */}
          <motion.div 
            className="absolute top-1/2 -translate-y-1/2 -mt-8 flex flex-col items-center"
            animate={{ x: position * scale }} // Assuming the container width matches the ticks roughly. We will use a fixed width container for exact math.
            transition={{ type: "spring", stiffness: 120, damping: 15 }}
          >
            <div className="text-4xl filter drop-shadow-md">🐸</div>
            <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-green-600 mt-1"></div>
          </motion.div>
        </div>

        {/* Exact width container for the number line to make math easy */}
        <style>{`
          .max-w-3xl { max-width: ${20 * scale + 40}px; }
        `}</style>

        {/* Controls */}
        <div className="flex flex-col items-center gap-6 w-full max-w-2xl bg-slate-50 p-6 rounded-xl border border-slate-200">
          <div className="text-2xl font-bold text-slate-700">
            当前位置: <span className={position < 0 ? "text-red-500" : position > 0 ? "text-sky-600" : "text-slate-800"}>{position}</span>
          </div>

          <div className="flex gap-4">
            <button onClick={() => move(-5)} className="flex items-center gap-1 px-4 py-2 bg-red-100 text-red-700 rounded-lg font-bold hover:bg-red-200 transition-colors">
              <MoveLeft size={18} /> 向左走 5
            </button>
            <button onClick={() => move(-1)} className="flex items-center gap-1 px-4 py-2 bg-red-100 text-red-700 rounded-lg font-bold hover:bg-red-200 transition-colors">
              <MoveLeft size={18} /> 向左走 1
            </button>
            <button onClick={() => setPosition(0)} className="px-6 py-2 bg-slate-200 text-slate-700 rounded-lg font-bold hover:bg-slate-300 transition-colors">
              回到 0
            </button>
            <button onClick={() => move(1)} className="flex items-center gap-1 px-4 py-2 bg-sky-100 text-sky-700 rounded-lg font-bold hover:bg-sky-200 transition-colors">
              向右走 1 <MoveRight size={18} />
            </button>
            <button onClick={() => move(5)} className="flex items-center gap-1 px-4 py-2 bg-sky-100 text-sky-700 rounded-lg font-bold hover:bg-sky-200 transition-colors">
              向右走 5 <MoveRight size={18} />
            </button>
          </div>

          {/* History */}
          <div className="w-full mt-4">
            <h3 className="font-bold text-slate-500 mb-2 text-sm uppercase tracking-wider">移动记录</h3>
            <div className="space-y-1">
              {history.length === 0 && <div className="text-slate-400 italic">暂无记录</div>}
              {history.map((record, idx) => (
                <div key={idx} className="font-mono text-lg text-slate-700 bg-white px-4 py-1 rounded border border-slate-100 shadow-sm">
                  {record}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
