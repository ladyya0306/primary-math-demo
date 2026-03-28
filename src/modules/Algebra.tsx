import { useState } from "react";
import { motion } from "motion/react";
import { Scale } from "lucide-react";

export function AlgebraDemo() {
  const [leftWeight, setLeftWeight] = useState(3);
  const [rightWeight, setRightWeight] = useState(3);
  const [unknownX, setUnknownX] = useState(2); // The actual value of X

  // Total weights
  const totalLeft = leftWeight + unknownX;
  const totalRight = rightWeight + 2; // Right side has a fixed weight of 2 + rightWeight

  // Calculate tilt angle (-15 to 15 degrees)
  const diff = totalRight - totalLeft;
  const angle = Math.max(-15, Math.min(15, diff * 5));

  return (
    <div className="p-8 bg-white rounded-2xl shadow-sm border border-slate-100">
      <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
        <Scale className="text-sky-500" size={28} /> 等式与方程 (天平模型)
      </h2>

      <div className="flex flex-col items-center gap-12">
        <p className="text-lg text-slate-600 text-center">
          方程就像一个天平。只有左右两边重量相等，天平才会保持平衡。<br/>
          试着改变两边的重量，看看天平的变化。
        </p>

        {/* Visualizer */}
        <div className="relative w-full max-w-2xl h-64 flex flex-col items-center justify-end pb-8">
          
          {/* Balance Beam */}
          <motion.div 
            className="w-96 h-4 bg-amber-700 rounded-full relative z-10"
            animate={{ rotate: angle }}
            transition={{ type: "spring", bounce: 0.4 }}
          >
            {/* Left Pan */}
            <div className="absolute -left-10 -top-20 w-24 h-24 flex flex-col items-center justify-end pb-2 border-b-4 border-slate-400" style={{ transform: `rotate(${-angle}deg)` }}>
              <div className="flex gap-1 items-end">
                <div className="w-10 h-10 bg-sky-500 text-white font-bold flex items-center justify-center rounded-md shadow-md">X</div>
                {Array.from({ length: leftWeight }).map((_, i) => (
                  <div key={i} className="w-6 h-6 bg-slate-200 border border-slate-400 rounded-full flex items-center justify-center text-xs font-bold">1</div>
                ))}
              </div>
            </div>

            {/* Right Pan */}
            <div className="absolute -right-10 -top-20 w-24 h-24 flex flex-col items-center justify-end pb-2 border-b-4 border-slate-400" style={{ transform: `rotate(${-angle}deg)` }}>
              <div className="flex gap-1 items-end flex-wrap justify-center">
                {Array.from({ length: rightWeight + 2 }).map((_, i) => (
                  <div key={i} className="w-6 h-6 bg-slate-200 border border-slate-400 rounded-full flex items-center justify-center text-xs font-bold">1</div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Base */}
          <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-b-[40px] border-b-amber-800 z-0 -mt-2"></div>
          <div className="w-32 h-4 bg-amber-900 rounded-t-lg"></div>
        </div>

        {/* Controls & Equation */}
        <div className="flex flex-col items-center gap-6 w-full max-w-2xl bg-slate-50 p-6 rounded-xl border border-slate-200">
          
          <div className="text-3xl font-bold text-slate-800 mb-2 flex items-center gap-4">
            <span className="text-sky-600">X + {leftWeight}</span>
            <span className={diff === 0 ? "text-green-500" : "text-red-500"}>
              {diff === 0 ? "=" : diff > 0 ? "<" : ">"}
            </span>
            <span className="text-slate-600">{rightWeight + 2}</span>
          </div>

          <div className="flex gap-12 w-full justify-center">
            <div className="flex flex-col items-center gap-2">
              <span className="font-bold text-slate-600">左边加减砝码</span>
              <div className="flex gap-2">
                <button onClick={() => setLeftWeight(Math.max(0, leftWeight - 1))} className="w-10 h-10 rounded-full bg-slate-200 font-bold text-xl hover:bg-slate-300">-</button>
                <button onClick={() => setLeftWeight(leftWeight + 1)} className="w-10 h-10 rounded-full bg-slate-200 font-bold text-xl hover:bg-slate-300">+</button>
              </div>
            </div>

            <div className="flex flex-col items-center gap-2">
              <span className="font-bold text-slate-600">右边加减砝码</span>
              <div className="flex gap-2">
                <button onClick={() => setRightWeight(Math.max(0, rightWeight - 1))} className="w-10 h-10 rounded-full bg-slate-200 font-bold text-xl hover:bg-slate-300">-</button>
                <button onClick={() => setRightWeight(rightWeight + 1)} className="w-10 h-10 rounded-full bg-slate-200 font-bold text-xl hover:bg-slate-300">+</button>
              </div>
            </div>
          </div>

          {diff === 0 && (
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="mt-4 text-xl font-bold text-green-600 bg-green-100 px-6 py-2 rounded-full"
            >
              天平平衡了！此时 X = {rightWeight + 2 - leftWeight}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
