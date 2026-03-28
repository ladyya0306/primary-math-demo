import { useState } from "react";
import { motion } from "motion/react";
import { Plus, X, Minus, Divide } from "lucide-react";

export function OperationRelationsDemo() {
  const [mode, setMode] = useState<'add-mul' | 'sub-div'>('add-mul');
  
  // State for Sub-Div
  const initialApples = 15;
  const divisor = 3;
  const [applesLeft, setApplesLeft] = useState(initialApples);
  const [subCount, setSubCount] = useState(0);

  const handleSubtract = () => {
    if (applesLeft >= divisor) {
      setApplesLeft(applesLeft - divisor);
      setSubCount(subCount + 1);
    }
  };

  const handleReset = () => {
    setApplesLeft(initialApples);
    setSubCount(0);
  };

  return (
    <div className="p-8 bg-white rounded-2xl shadow-sm border border-slate-100">
      <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
        <Plus className="text-sky-500" size={28} /> 加乘与减除的关系
      </h2>

      <div className="flex gap-4 mb-8 justify-center">
        <button 
          onClick={() => setMode('add-mul')}
          className={`px-6 py-2 rounded-full font-bold transition-colors ${mode === 'add-mul' ? 'bg-sky-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
        >
          加法与乘法
        </button>
        <button 
          onClick={() => setMode('sub-div')}
          className={`px-6 py-2 rounded-full font-bold transition-colors ${mode === 'sub-div' ? 'bg-sky-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
        >
          减法与除法
        </button>
      </div>

      {mode === 'add-mul' ? (
        <div className="flex flex-col items-center gap-8 animate-in fade-in zoom-in duration-300">
          <p className="text-xl text-slate-700 font-bold">
            乘法是<span className="text-sky-600">相同加数</span>连加的简便运算。
          </p>
          
          <div className="flex gap-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col items-center gap-2">
                <div className="flex gap-1">
                  <span className="text-2xl">⭐</span>
                  <span className="text-2xl">⭐</span>
                  <span className="text-2xl">⭐</span>
                </div>
                <span className="font-bold text-slate-500">3 个</span>
              </div>
            ))}
          </div>

          <div className="bg-sky-50 p-6 rounded-xl border border-sky-100 w-full max-w-2xl">
            <div className="flex items-center gap-4 text-2xl font-bold text-slate-700 mb-4">
              <span className="w-24 text-right text-slate-500">加法：</span>
              <span>3 + 3 + 3 + 3 + 3 = <span className="text-sky-600">15</span></span>
            </div>
            <div className="flex items-center gap-4 text-2xl font-bold text-slate-700">
              <span className="w-24 text-right text-slate-500">乘法：</span>
              <span>3 × 5 = <span className="text-sky-600">15</span></span>
            </div>
            <p className="mt-4 text-slate-600 text-lg">
              5 个 3 相加，写成乘法就是 3 × 5，计算起来快得多！
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-8 animate-in fade-in zoom-in duration-300">
          <p className="text-xl text-slate-700 font-bold">
            除法可以看作是<span className="text-red-500">连续减法</span>的过程。
          </p>

          <div className="flex flex-col items-center gap-4">
            <div className="text-lg font-bold text-slate-600">
              问题：15 个苹果，每次拿走 3 个，几次能拿完？ (15 ÷ 3 = ?)
            </div>
            
            <div className="flex flex-wrap gap-2 w-96 justify-center min-h-[120px] p-4 bg-slate-50 rounded-xl border border-slate-200">
              {Array.from({ length: initialApples }).map((_, i) => (
                <motion.div 
                  key={i}
                  initial={false}
                  animate={{ 
                    scale: i < applesLeft ? 1 : 0,
                    opacity: i < applesLeft ? 1 : 0
                  }}
                  className="text-3xl"
                >
                  🍎
                </motion.div>
              ))}
            </div>

            <div className="flex gap-4">
              <button 
                onClick={handleSubtract}
                disabled={applesLeft === 0}
                className="px-6 py-3 bg-red-500 text-white rounded-full font-bold text-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
              >
                减去 3 个苹果
              </button>
              <button 
                onClick={handleReset}
                className="px-6 py-3 bg-slate-200 text-slate-700 rounded-full font-bold text-lg hover:bg-slate-300 transition-colors"
              >
                重置
              </button>
            </div>
          </div>

          <div className="bg-red-50 p-6 rounded-xl border border-red-100 w-full max-w-2xl">
            <div className="text-xl font-bold text-slate-700 mb-4">
              剩余苹果：<span className="text-red-500">{applesLeft}</span> 个 | 
              已经减了：<span className="text-sky-600">{subCount}</span> 次
            </div>
            
            <div className="font-mono text-lg text-slate-600 mb-4 h-8">
              {subCount > 0 && (
                <span>15 {Array.from({length: subCount}).map(() => '- 3 ').join('')} = {applesLeft}</span>
              )}
            </div>

            {applesLeft === 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-2xl font-bold text-slate-800 border-t-2 border-red-200 pt-4"
              >
                我们连续减了 <span className="text-sky-600">{subCount}</span> 次 3，正好减完。<br/>
                所以：15 ÷ 3 = <span className="text-sky-600">{subCount}</span>
              </motion.div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
