import { useState } from "react";
import { motion } from "motion/react";
import { PieChart, Grid } from "lucide-react";

export function FractionDemo() {
  const [numerator, setNumerator] = useState(3);
  const denominator = 8;

  return (
    <div className="p-8 bg-white rounded-2xl shadow-sm border border-slate-100">
      <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
        <PieChart className="text-sky-500" size={28} /> 分数初步认识
      </h2>
      
      <div className="flex flex-col md:flex-row gap-12 items-center justify-center">
        {/* Visualizer */}
        <div className="relative w-64 h-64">
          <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
            {Array.from({ length: denominator }).map((_, i) => {
              const angle = 360 / denominator;
              const startAngle = i * angle;
              const endAngle = (i + 1) * angle;
              const startX = 50 + 50 * Math.cos((startAngle * Math.PI) / 180);
              const startY = 50 + 50 * Math.sin((startAngle * Math.PI) / 180);
              const endX = 50 + 50 * Math.cos((endAngle * Math.PI) / 180);
              const endY = 50 + 50 * Math.sin((endAngle * Math.PI) / 180);
              const largeArcFlag = angle > 180 ? 1 : 0;
              
              const isFilled = i < numerator;
              
              return (
                <path
                  key={i}
                  d={`M 50 50 L ${startX} ${startY} A 50 50 0 ${largeArcFlag} 1 ${endX} ${endY} Z`}
                  fill={isFilled ? "#38bdf8" : "#f1f5f9"}
                  stroke="#ffffff"
                  strokeWidth="1"
                  className="transition-all duration-500 cursor-pointer hover:opacity-80"
                  onClick={() => setNumerator(i + 1)}
                />
              );
            })}
          </svg>
        </div>

        {/* Controls */}
        <div className="flex flex-col items-center gap-6">
          <div className="text-center">
            <div className="text-6xl font-black text-sky-500">{numerator}</div>
            <div className="w-16 h-1 bg-slate-800 my-2 mx-auto rounded-full"></div>
            <div className="text-6xl font-black text-slate-800">{denominator}</div>
          </div>
          
          <div className="flex gap-4">
            <button 
              onClick={() => setNumerator(Math.max(0, numerator - 1))}
              className="w-12 h-12 rounded-full bg-slate-100 text-slate-600 text-2xl font-bold hover:bg-slate-200 transition-colors"
            >
              -
            </button>
            <button 
              onClick={() => setNumerator(Math.min(denominator, numerator + 1))}
              className="w-12 h-12 rounded-full bg-sky-100 text-sky-600 text-2xl font-bold hover:bg-sky-200 transition-colors"
            >
              +
            </button>
          </div>
          <p className="text-slate-500 text-lg">
            把一个圆平均分成 <span className="font-bold text-slate-800">{denominator}</span> 份，<br/>
            取其中的 <span className="font-bold text-sky-500">{numerator}</span> 份。
          </p>
        </div>
      </div>
    </div>
  );
}

export function DistributiveLawDemo() {
  const [mode, setMode] = useState<'add' | 'sub'>('add');
  const [a, setA] = useState(4);
  const [b, setB] = useState(6);
  const [c, setC] = useState(2);
  const [expanded, setExpanded] = useState(false);

  const scale = 30; // pixels per unit

  // Ensure b > c for subtraction mode
  if (mode === 'sub' && b <= c) {
    setB(c + 2);
  }

  return (
    <div className="p-8 bg-white rounded-2xl shadow-sm border border-slate-100">
      <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
        <Grid className="text-sky-500" size={28} /> 乘法分配律 (全面解析)
      </h2>

      <div className="flex gap-4 mb-8 justify-center">
        <button 
          onClick={() => { setMode('add'); setExpanded(false); }}
          className={`px-6 py-2 rounded-full font-bold transition-colors ${mode === 'add' ? 'bg-sky-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
        >
          加法分配: a × (b + c)
        </button>
        <button 
          onClick={() => { setMode('sub'); setExpanded(false); }}
          className={`px-6 py-2 rounded-full font-bold transition-colors ${mode === 'sub' ? 'bg-sky-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
        >
          减法分配: a × (b - c)
        </button>
      </div>

      <div className="flex flex-col items-center gap-10">
        {/* Controls */}
        <div className="flex gap-8 bg-slate-50 p-4 rounded-xl">
          <label className="flex items-center gap-2 font-bold text-slate-600">
            a = <input type="range" min="2" max="8" value={a} onChange={e => setA(Number(e.target.value))} className="w-24 accent-sky-500" /> {a}
          </label>
          <label className="flex items-center gap-2 font-bold text-slate-600">
            b = <input type="range" min={mode === 'sub' ? c + 1 : 2} max="10" value={b} onChange={e => setB(Number(e.target.value))} className="w-24 accent-green-500" /> {b}
          </label>
          <label className="flex items-center gap-2 font-bold text-slate-600">
            c = <input type="range" min="1" max={mode === 'sub' ? b - 1 : 8} value={c} onChange={e => setC(Number(e.target.value))} className="w-24 accent-amber-500" /> {c}
          </label>
        </div>

        {/* Visualizer */}
        <div className="relative flex items-end justify-center h-64">
          {/* Left side label (a) */}
          <div className="absolute left-0 top-1/2 -translate-x-8 -translate-y-1/2 font-bold text-xl text-sky-600">
            {a}
          </div>

          {mode === 'add' ? (
            <div className="flex items-end gap-0 relative">
              {!expanded && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute -top-8 left-0 right-0 text-center font-bold text-xl text-slate-600 border-b-2 border-slate-400 pb-1"
                >
                  {b} + {c} = {b+c}
                </motion.div>
              )}
              {/* Rectangle B */}
              <motion.div 
                animate={{ width: b * scale, height: a * scale, x: expanded ? -10 : 0 }}
                className="bg-green-100 border-2 border-green-500 flex items-center justify-center relative rounded-l-md"
              >
                {expanded && <div className="absolute -top-8 font-bold text-lg text-green-600">{b}</div>}
                <span className="font-bold text-green-700 text-xl">{a} × {b}</span>
              </motion.div>
              {/* Rectangle C */}
              <motion.div 
                animate={{ width: c * scale, height: a * scale, x: expanded ? 10 : 0 }}
                className="bg-amber-100 border-2 border-amber-500 flex items-center justify-center relative rounded-r-md border-l-0"
                style={{ borderLeftWidth: expanded ? '2px' : '0px' }}
              >
                {expanded && <div className="absolute -top-8 font-bold text-lg text-amber-600">{c}</div>}
                <span className="font-bold text-amber-700 text-xl">{a} × {c}</span>
              </motion.div>
            </div>
          ) : (
            <div className="flex items-end gap-0 relative">
              {/* Rectangle B (Total) */}
              <motion.div 
                animate={{ width: b * scale, height: a * scale }}
                className="bg-green-100 border-2 border-green-500 flex items-center justify-start relative rounded-md overflow-hidden"
              >
                <div className="absolute -top-8 left-0 right-0 text-center font-bold text-lg text-green-600 border-b-2 border-green-400 pb-1">{b}</div>
                
                {/* The remaining part (b - c) */}
                <div className="flex-1 h-full flex items-center justify-center">
                  <span className="font-bold text-green-700 text-xl">{a} × ({b} - {c})</span>
                </div>

                {/* The subtracted part (c) */}
                <motion.div 
                  animate={{ width: c * scale, x: expanded ? 20 : 0, opacity: expanded ? 0.5 : 1 }}
                  className="h-full bg-amber-100 border-l-2 border-dashed border-amber-500 flex items-center justify-center relative"
                >
                  <div className="absolute -top-8 left-0 right-0 text-center font-bold text-lg text-amber-600">{c}</div>
                  <span className="font-bold text-amber-700 text-xl">减去 {a} × {c}</span>
                </motion.div>
              </motion.div>
            </div>
          )}
        </div>

        {/* Equation */}
        <div className="text-center">
          {mode === 'add' ? (
            <>
              <div className="text-3xl font-bold text-slate-800 mb-4">
                <span className="text-sky-500">a</span> × (<span className="text-green-500">b</span> + <span className="text-amber-500">c</span>) 
                = 
                <span className="text-sky-500">a</span> × <span className="text-green-500">b</span> + <span className="text-sky-500">a</span> × <span className="text-amber-500">c</span>
              </div>
              <div className="text-2xl font-bold text-slate-600">
                <span className="text-sky-500">{a}</span> × (<span className="text-green-500">{b}</span> + <span className="text-amber-500">{c}</span>) 
                = 
                <span className="text-sky-500">{a}</span> × <span className="text-green-500">{b}</span> + <span className="text-sky-500">{a}</span> × <span className="text-amber-500">{c}</span>
              </div>
              <div className="text-2xl font-bold text-slate-500 mt-2">
                {a} × {b+c} = {a*b} + {a*c} = {a*(b+c)}
              </div>
            </>
          ) : (
            <>
              <div className="text-3xl font-bold text-slate-800 mb-4">
                <span className="text-sky-500">a</span> × (<span className="text-green-500">b</span> - <span className="text-amber-500">c</span>) 
                = 
                <span className="text-sky-500">a</span> × <span className="text-green-500">b</span> - <span className="text-sky-500">a</span> × <span className="text-amber-500">c</span>
              </div>
              <div className="text-2xl font-bold text-slate-600">
                <span className="text-sky-500">{a}</span> × (<span className="text-green-500">{b}</span> - <span className="text-amber-500">{c}</span>) 
                = 
                <span className="text-sky-500">{a}</span> × <span className="text-green-500">{b}</span> - <span className="text-sky-500">{a}</span> × <span className="text-amber-500">{c}</span>
              </div>
              <div className="text-2xl font-bold text-slate-500 mt-2">
                {a} × {b-c} = {a*b} - {a*c} = {a*(b-c)}
              </div>
            </>
          )}
        </div>

        <button 
          onClick={() => setExpanded(!expanded)}
          className="px-8 py-3 bg-sky-500 text-white rounded-full font-bold text-lg hover:bg-sky-600 transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
          {mode === 'add' ? (expanded ? "合并矩形" : "拆分矩形") : (expanded ? "还原矩形" : "分离减去的部分")}
        </button>
      </div>
    </div>
  );
}
