import { useState } from "react";
import Sidebar from "./components/Sidebar";
import { FractionDemo, DistributiveLawDemo } from "./modules/NumberAlgebra";
import { NegativeNumbersDemo } from "./modules/NegativeNumbers";
import { OperationRelationsDemo } from "./modules/OperationRelations";
import { ParenthesesRulesDemo } from "./modules/ParenthesesRules";
import { GeometryDemo } from "./modules/Geometry";
import { AverageDemo, StatisticsDemo } from "./modules/Statistics";
import { WordProblemDemo } from "./modules/WordProblems";
import { AlgebraDemo } from "./modules/Algebra";

export default function App() {
  const [currentTopic, setCurrentTopic] = useState("fractions");

  const renderContent = () => {
    switch (currentTopic) {
      case "fractions":
        return <FractionDemo />;
      case "negative-numbers":
        return <NegativeNumbersDemo />;
      case "operation-relations":
        return <OperationRelationsDemo />;
      case "distributive":
        return <DistributiveLawDemo />;
      case "parentheses":
        return <ParenthesesRulesDemo />;
      case "triangle-area":
        return <GeometryDemo />;
      case "average":
        return <AverageDemo />;
      case "charts":
        return <StatisticsDemo />;
      case "sum-difference":
        return <WordProblemDemo />;
      case "equations":
        return <AlgebraDemo />;
      default:
        return (
          <div className="flex items-center justify-center h-full text-slate-400">
            请在左侧选择一个知识点
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans overflow-hidden">
      <Sidebar currentTopic={currentTopic} setCurrentTopic={setCurrentTopic} />
      
      <main className="flex-1 overflow-y-auto p-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <header className="mb-8 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-black text-slate-800 tracking-tight">小学数学交互演示系统</h1>
              <p className="text-slate-500 mt-1">让数学看得见、摸得着，轻松理解抽象概念！</p>
            </div>
            <div className="hidden md:flex gap-2">
              <span className="px-3 py-1 bg-sky-100 text-sky-700 rounded-full text-sm font-bold">Windows 兼容</span>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-bold">Python 启动就绪</span>
            </div>
          </header>

          {/* Main Content Area */}
          <div className="transition-all duration-300 ease-in-out">
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
}
