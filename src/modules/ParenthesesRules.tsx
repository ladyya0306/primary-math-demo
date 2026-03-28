import { useState } from "react";
import { motion } from "motion/react";
import { FunctionSquare, ArrowRight, ArrowLeft, RefreshCw } from "lucide-react";

export function ParenthesesRulesDemo() {
  const [caseId, setCaseId] = useState('sub-sub');
  const [step, setStep] = useState(0);

  const cases = [
    { id: 'add-add', label: 'a + (b + c)', a: 2, b: 4, c: 2, sign1: '+', sign2: '+' },
    { id: 'add-sub', label: 'a + (b - c)', a: 2, b: 4, c: 2, sign1: '+', sign2: '-' },
    { id: 'sub-add', label: 'a - (b + c)', a: 8, b: 4, c: 2, sign1: '-', sign2: '+' },
    { id: 'sub-sub', label: 'a - (b - c)', a: 8, b: 4, c: 2, sign1: '-', sign2: '-' },
  ];

  const currentCase = cases.find(c => c.id === caseId)!;
  const { a, b, c, sign1, sign2 } = currentCase;

  // Directions: 1 for Right (+), -1 for Left (-)
  const b_dir_initial = 1; // b is always positive in our examples
  const c_dir_initial = sign2 === '+' ? 1 : -1;

  const flip = step >= 2 && sign1 === '-';
  const b_dir_final = flip ? -b_dir_initial : b_dir_initial;
  const c_dir_final = flip ? -c_dir_initial : c_dir_initial;

  const pos0 = a;
  const pos1 = a + b_dir_final * b;
  const pos2 = pos1 + c_dir_final * c;

  const currentPos = step < 3 ? pos0 : (step === 3 ? pos1 : pos2);

  const finalSignB = b_dir_final === 1 ? '+' : '-';
  const finalSignC = c_dir_final === 1 ? '+' : '-';

  const InstructionCard = ({ value, dir, isFlipped, label }: { value: number, dir: number, isFlipped: boolean, label: string }) => {
    const isRight = dir === 1;
    return (
      <motion.div 
        animate={{ 
          backgroundColor: isFlipped ? '#fee2e2' : '#f8fafc',
          borderColor: isFlipped ? '#fca5a5' : '#e2e8f0'
        }}
        className="flex flex-col items-center p-4 border-2 rounded-xl w-36 relative shadow-sm"
      >
        <span className="text-sm font-bold text-slate-500 mb-2">{label}</span>
        <div className="flex items-center gap-2 font-black text-2xl text-slate-800">
          {isRight ? <ArrowRight className="text-sky-500" size={28}/> : <ArrowLeft className="text-red-500" size={28}/>}
          {value}
        </div>
        <div className="text-sm mt-1 font-bold text-slate-600">
          {isRight ? '向右 (加)' : '向左 (减)'}
        </div>
        {isFlipped && (
          <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute -top-3 -right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-md"
          >
            <RefreshCw size={12} /> 反转
          </motion.div>
        )}
      </motion.div>
    );
  };

  return (
    <div className="p-8 bg-white rounded-2xl shadow-sm border border-slate-100">
      <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
        <FunctionSquare className="text-sky-500" size={28} /> 去括号法则 (符号的本质是方向)
      </h2>

      <div className="flex flex-col items-center gap-8">
        <div className="flex gap-2 flex-wrap justify-center bg-slate-50 p-2 rounded-xl border border-slate-200">
          {cases.map(c => (
            <button
              key={c.id}
              onClick={() => { setCaseId(c.id); setStep(0); }}
              className={`px-4 py-2 rounded-lg font-mono font-bold transition-colors ${
                caseId === c.id ? 'bg-sky-500 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="text-3xl font-mono font-bold text-slate-800 bg-sky-50 px-8 py-4 rounded-xl border border-sky-100">
          {a} <span className={step >= 2 && sign1 === '-' ? "text-red-500" : "text-sky-600"}>{sign1}</span> ({b} {sign2} {c}) = ?
        </div>

        {/* Instruction Cards Area */}
        <div className="flex gap-8 h-32 items-center">
          {step >= 1 ? (
            <>
              <InstructionCard 
                label="指令 1 (对应 b)" 
                value={b} 
                dir={step >= 2 ? b_dir_final : b_dir_initial} 
                isFlipped={step >= 2 && b_dir_final !== b_dir_initial} 
              />
              <InstructionCard 
                label="指令 2 (对应 c)" 
                value={c} 
                dir={step >= 2 ? c_dir_final : c_dir_initial} 
                isFlipped={step >= 2 && c_dir_final !== c_dir_initial} 
              />
            </>
          ) : (
            <div className="text-slate-400 font-bold text-lg border-2 border-dashed border-slate-200 rounded-xl px-12 py-8">
              点击下方按钮解析括号内的指令
            </div>
          )}
        </div>

        {/* Number Line Visualizer */}
        <div className="w-full max-w-3xl mt-8 mb-4 relative">
          {/* Axis Line */}
          <div className="absolute top-1/2 left-0 right-0 h-1.5 bg-slate-300 rounded-full -translate-y-1/2" />
          
          {/* Ticks */}
          <div className="relative h-16 w-full">
            {Array.from({ length: 11 }).map((_, i) => (
              <div key={i} className="absolute top-1/2 flex flex-col items-center -translate-x-1/2 -translate-y-1/2" style={{ left: `${i * 10}%` }}>
                <div className="w-1 h-4 bg-slate-400 rounded-full mb-2" />
                <span className="font-bold text-slate-500">{i}</span>
              </div>
            ))}
            
            {/* Character */}
            <motion.div
              animate={{ left: `${currentPos * 10}%` }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              className="absolute top-1/2 -translate-x-1/2 -translate-y-[120%] z-10"
            >
              <div className="text-4xl filter drop-shadow-md">🚗</div>
              <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-sky-600 mx-auto mt-1"></div>
            </motion.div>
          </div>
        </div>

        {/* Controls & Explanation */}
        <div className="flex flex-col items-center gap-6 w-full max-w-3xl">
          <div className="flex gap-2 flex-wrap justify-center">
            <button onClick={() => setStep(0)} className={`px-4 py-2 rounded-full font-bold transition-colors ${step === 0 ? 'bg-sky-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
              0. 初始起点
            </button>
            <button onClick={() => setStep(1)} className={`px-4 py-2 rounded-full font-bold transition-colors ${step === 1 ? 'bg-sky-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
              1. 解析括号内指令
            </button>
            <button onClick={() => setStep(2)} className={`px-4 py-2 rounded-full font-bold transition-colors ${step === 2 ? 'bg-sky-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
              2. 括号外符号的作用
            </button>
            <button onClick={() => setStep(3)} className={`px-4 py-2 rounded-full font-bold transition-colors ${step === 3 ? 'bg-sky-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
              3. 执行第一步
            </button>
            <button onClick={() => setStep(4)} className={`px-4 py-2 rounded-full font-bold transition-colors ${step === 4 ? 'bg-sky-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
              4. 执行第二步
            </button>
          </div>

          <div className="h-40 w-full bg-slate-50 p-6 rounded-xl border border-slate-200 text-lg text-slate-700 flex flex-col justify-center">
            {step === 0 && (
              <p>我们要计算 <span className="font-mono font-bold">{a} {sign1} ({b} {sign2} {c})</span>。<br/>在数轴上，我们的起点是 <span className="font-bold text-sky-600">{a}</span>。</p>
            )}
            {step === 1 && (
              <p>先看括号里面 <span className="font-mono font-bold">({b} {sign2} {c})</span>。它代表一组移动指令：<br/>
              先向右走 {b} 步 (+{b})，再向{sign2 === '+' ? '右' : '左'}走 {c} 步 ({sign2}{c})。</p>
            )}
            {step === 2 && (
              <div>
                <p>关键来了！括号外面是一个 <span className="font-bold text-xl text-red-500">{sign1}</span> 号。</p>
                {sign1 === '+' ? (
                  <p className="mt-2 text-green-600 font-bold">加号代表“保持原方向”。所以括号里的指令不需要改变！</p>
                ) : (
                  <p className="mt-2 text-red-600 font-bold">在数学中，减号代表“相反方向”！所以，括号里的所有指令都要反转方向。<br/>向右变成向左，向左变成向右！</p>
                )}
              </div>
            )}
            {step === 3 && (
              <p>现在，我们按照最终的指令移动。<br/>第一步：向{b_dir_final === 1 ? '右' : '左'}走 {b} 步，到达 <span className="font-bold text-sky-600">{pos1}</span>。</p>
            )}
            {step === 4 && (
              <div>
                <p>第二步：向{c_dir_final === 1 ? '右' : '左'}走 {c} 步，到达终点 <span className="font-bold text-sky-600">{pos2}</span>。</p>
                <p className="mt-2 font-bold text-sky-700">
                  所以：{a} {sign1} ({b} {sign2} {c}) = {a} {finalSignB} {b} {finalSignC} {c} = {pos2}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
