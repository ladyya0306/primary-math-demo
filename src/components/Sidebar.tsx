import { Calculator, Shapes, BarChart3, BookOpen, FunctionSquare, ChevronRight, GraduationCap } from "lucide-react";
import { curriculum } from "../data/curriculum";

const icons = {
  Calculator,
  Shapes,
  BarChart3,
  BookOpen,
  FunctionSquare
};

export default function Sidebar({ currentTopic, setCurrentTopic }: { currentTopic: string, setCurrentTopic: (id: string) => void }) {
  return (
    <div className="w-72 bg-white border-r border-slate-200 h-full overflow-y-auto flex flex-col shadow-sm">
      <div className="p-6 border-b border-slate-100">
        <h1 className="text-xl font-bold text-sky-600 flex items-center gap-2">
          <GraduationCap className="text-sky-600" size={28} />
          数学互动课堂
        </h1>
        <p className="text-xs text-slate-500 mt-2">小学数学全领域演示系统</p>
      </div>
      
      <div className="flex-1 py-4">
        {curriculum.map((category) => {
          const Icon = icons[category.icon as keyof typeof icons];
          return (
            <div key={category.id} className="mb-6">
              <div className="px-6 mb-2 flex items-center gap-2 text-slate-700 font-semibold">
                <Icon size={18} className="text-sky-500" />
                {category.title}
              </div>
              <div className="flex flex-col">
                {category.topics.map((topic) => (
                  <button
                    key={topic.id}
                    onClick={() => setCurrentTopic(topic.id)}
                    className={`text-left px-10 py-2 text-sm transition-colors flex items-center justify-between group ${
                      currentTopic === topic.id
                        ? "bg-sky-50 text-sky-700 font-medium border-r-4 border-sky-500"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    {topic.name}
                    <ChevronRight 
                      size={14} 
                      className={`opacity-0 group-hover:opacity-100 transition-opacity ${
                        currentTopic === topic.id ? "opacity-100 text-sky-500" : "text-slate-400"
                      }`} 
                    />
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
