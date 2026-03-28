import { useState } from "react";
import { motion } from "motion/react";
import { Triangle } from "lucide-react";

export function GeometryDemo() {
  const [step, setStep] = useState(0);
  
  // Triangle dimensions
  const base = 200;
  const height = 150;

  return (
    <div className="p-8 bg-white rounded-2xl shadow-sm border border-slate-100">
      <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
        <Triangle className="text-sky-500" size={28} /> 三角形面积推导
      </h2>

      <div className="flex flex-col items-center gap-12">
        
        {/* Visualizer */}
        <div className="relative w-full max-w-2xl h-80 flex items-center justify-center bg-slate-50 rounded-xl border border-slate-200 overflow-hidden">
          
          <div className="relative" style={{ width: base, height: height }}>
            {/* Base Line */}
            <div className="absolute -bottom-6 left-0 right-0 text-center font-bold text-sky-600 border-t-2 border-sky-500 pt-1">
              底 (a)
            </div>
            
            {/* Height Line */}
            <div className="absolute left-1/2 top-0 bottom-0 border-l-2 border-dashed border-red-500 flex items-center -ml-1">
              <span className="bg-white px-1 text-red-500 font-bold text-sm ml-2">高 (h)</span>
            </div>

            {/* Original Triangle */}
            <svg width={base} height={height} className="absolute inset-0 overflow-visible">
              <polygon 
                points={`0,${height} ${base},${height} ${base/2},0`} 
                fill="#38bdf8" 
                stroke="#0284c7" 
                strokeWidth="2" 
                opacity="0.8"
              />
            </svg>

            {/* Cloned Triangle (Animates to form parallelogram) */}
            <motion.div
              className="absolute inset-0 origin-center"
              initial={{ rotate: 0, x: 0, y: 0, opacity: 0 }}
              animate={{ 
                opacity: step >= 1 ? 0.8 : 0,
                rotate: step >= 2 ? 180 : 0,
                x: step >= 2 ? base/2 : 0,
                y: step >= 2 ? 0 : 0
              }}
              transition={{ duration: 1.5, type: "spring", bounce: 0.2 }}
            >
              <svg width={base} height={height} className="overflow-visible">
                <polygon 
                  points={`0,${height} ${base},${height} ${base/2},0`} 
                  fill="#fcd34d" 
                  stroke="#d97706" 
                  strokeWidth="2" 
                />
              </svg>
            </motion.div>
          </div>
        </div>

        {/* Controls & Explanation */}
        <div className="flex flex-col items-center gap-6 w-full max-w-2xl">
          <div className="flex gap-4">
            <button 
              onClick={() => setStep(0)}
              className={`px-6 py-2 rounded-full font-bold transition-colors ${step === 0 ? 'bg-sky-500 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            >
              1. 原始三角形
            </button>
            <button 
              onClick={() => setStep(1)}
              className={`px-6 py-2 rounded-full font-bold transition-colors ${step === 1 ? 'bg-sky-500 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            >
              2. 复制一个完全一样的三角形
            </button>
            <button 
              onClick={() => setStep(2)}
              className={`px-6 py-2 rounded-full font-bold transition-colors ${step === 2 ? 'bg-sky-500 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            >
              3. 旋转并拼合
            </button>
          </div>

          <div className="h-24 text-center">
            {step === 0 && (
              <p className="text-xl text-slate-600">
                这是一个普通的三角形，它的底是 <span className="font-bold text-sky-600">a</span>，高是 <span className="font-bold text-red-500">h</span>。<br/>
                我们怎么计算它的面积呢？
              </p>
            )}
            {step === 1 && (
              <p className="text-xl text-slate-600">
                首先，我们复制一个<span className="font-bold text-amber-500">完全一样</span>的三角形。
              </p>
            )}
            {step === 2 && (
              <p className="text-xl text-slate-600">
                把复制的三角形旋转 180 度，拼在一起，就变成了一个<span className="font-bold text-slate-800">平行四边形</span>！<br/>
                平行四边形的面积 = 底 × 高。<br/>
                所以，一个三角形的面积 = <span className="font-bold text-sky-600 text-2xl">底 × 高 ÷ 2</span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
