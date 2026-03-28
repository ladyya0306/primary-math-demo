import { useState } from "react";
import { motion } from "motion/react";
import { BookOpen } from "lucide-react";

export function WordProblemDemo() {
  const [step, setStep] = useState(0);
  
  // Problem: A and B have 100 apples together. A has 20 more than B. How many does each have?
  const sum = 100;
  const diff = 20;
  const smaller = (sum - diff) / 2; // 40
  const larger = smaller + diff; // 60

  const scale = 4; // pixels per unit

  return (
    <div className="p-8 bg-white rounded-2xl shadow-sm border border-slate-100">
      <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
        <BookOpen className="text-sky-500" size={28} /> 和差问题 (线段图模型)
      </h2>

      <div className="bg-amber-50 p-6 rounded-xl border border-amber-200 mb-8">
        <p className="text-xl font-bold text-slate-800">
          题目：小明和小红一共有 <span className="text-sky-600">{sum}</span> 个苹果。小明比小红多 <span className="text-red-500">{diff}</span> 个。他们各有多少个苹果？
        </p>
      </div>

      <div className="flex flex-col items-center gap-8">
        {/* Visualizer */}
        <div className="relative w-full max-w-2xl h-64 flex flex-col justify-center gap-8 pl-20">
          
          {/* Total Bracket */}
          <div className="absolute right-10 top-1/2 -translate-y-1/2 flex items-center gap-4">
            <div className="h-32 w-4 border-r-4 border-y-4 border-slate-300 rounded-r-xl"></div>
            <div className="font-black text-2xl text-sky-600">共 {sum}</div>
          </div>

          {/* B (Smaller) */}
          <div className="flex items-center gap-4">
            <div className="w-16 font-bold text-xl text-slate-600 text-right">小红:</div>
            <motion.div 
              className="h-10 bg-green-400 rounded-md shadow-sm flex items-center justify-center text-white font-bold"
              animate={{ width: smaller * scale }}
            >
              {step >= 2 ? smaller : "?"}
            </motion.div>
          </div>

          {/* A (Larger) */}
          <div className="flex items-center gap-4">
            <div className="w-16 font-bold text-xl text-slate-600 text-right">小明:</div>
            <div className="flex">
              <motion.div 
                className="h-10 bg-green-400 rounded-l-md shadow-sm flex items-center justify-center text-white font-bold border-r border-green-500"
                animate={{ width: smaller * scale }}
              >
                {step >= 2 ? smaller : "?"}
              </motion.div>
              <motion.div 
                className="h-10 bg-red-400 rounded-r-md shadow-sm flex items-center justify-center text-white font-bold overflow-hidden"
                animate={{ 
                  width: step === 1 ? 0 : diff * scale,
                  opacity: step === 1 ? 0 : 1
                }}
                transition={{ duration: 0.8 }}
              >
                多 {diff}
              </motion.div>
            </div>
          </div>
        </div>

        {/* Controls & Explanation */}
        <div className="flex flex-col items-center gap-6 w-full max-w-2xl">
          <div className="flex gap-4">
            <button 
              onClick={() => setStep(0)}
              className={`px-6 py-2 rounded-full font-bold transition-colors ${step === 0 ? 'bg-sky-500 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            >
              1. 画线段图
            </button>
            <button 
              onClick={() => setStep(1)}
              className={`px-6 py-2 rounded-full font-bold transition-colors ${step === 1 ? 'bg-sky-500 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            >
              2. 减去多出的部分
            </button>
            <button 
              onClick={() => setStep(2)}
              className={`px-6 py-2 rounded-full font-bold transition-colors ${step === 2 ? 'bg-sky-500 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            >
              3. 计算结果
            </button>
          </div>

          <div className="h-24 text-center">
            {step === 0 && (
              <p className="text-xl text-slate-600">
                首先，我们用线段来表示小明和小红的苹果数量。<br/>
                可以看出，小明的线段比小红长 <span className="font-bold text-red-500">{diff}</span>。
              </p>
            )}
            {step === 1 && (
              <p className="text-xl text-slate-600">
                如果从小明的苹果里<span className="font-bold text-red-500">减去多出来的 {diff} 个</span>，<br/>
                两人的苹果就<span className="font-bold text-green-600">一样多</span>了！此时总数变成了 {sum} - {diff} = <span className="font-bold text-sky-600">{sum - diff}</span>。
              </p>
            )}
            {step === 2 && (
              <p className="text-xl text-slate-600">
                现在有两份一样多的苹果，总数是 {sum - diff}。<br/>
                所以小红有：({sum} - {diff}) ÷ 2 = <span className="font-bold text-green-600">{smaller}</span> 个。<br/>
                小明有：{smaller} + {diff} = <span className="font-bold text-red-500">{larger}</span> 个。
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
