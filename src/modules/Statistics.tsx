import { useState } from "react";
import { motion } from "motion/react";
import { Droplets, BarChart3 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart as RechartsPieChart, Pie, Cell } from 'recharts';

export function AverageDemo() {
  const [leveled, setLeveled] = useState(false);
  // Initial water levels
  const initialData = [30, 90, 60, 20];
  const sum = initialData.reduce((a, b) => a + b, 0);
  const average = sum / initialData.length;

  return (
    <div className="p-8 bg-white rounded-2xl shadow-sm border border-slate-100">
      <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
        <Droplets className="text-sky-500" size={28} /> 平均数 (移多补少模型)
      </h2>

      <div className="flex flex-col items-center gap-12">
        <p className="text-lg text-slate-600">
          有 4 个水杯，水量分别是 30, 90, 60, 20。如何让它们的水一样多？
        </p>

        {/* Visualizer */}
        <div className="relative h-64 w-full max-w-2xl border-b-4 border-slate-300 flex items-end justify-around px-8">
          
          {/* Average Line */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: leveled ? 1 : 0 }}
            className="absolute left-0 right-0 border-t-2 border-dashed border-red-500 z-0 flex items-center"
            style={{ bottom: `${average * 2}px` }}
          >
            <span className="text-red-500 font-bold ml-2 -mt-6">平均数: {average}</span>
          </motion.div>

          {initialData.map((val, i) => (
            <div key={i} className="relative w-24 flex flex-col items-center justify-end h-full z-10">
              <div className="absolute -top-8 font-bold text-sky-600 text-xl">
                {leveled ? average : val}
              </div>
              
              {/* The Glass */}
              <div className="w-full h-[200px] border-x-4 border-b-4 border-slate-200 rounded-b-xl relative overflow-hidden bg-slate-50">
                {/* The Water */}
                <motion.div
                  animate={{ height: `${(leveled ? average : val) * 2}px` }}
                  transition={{ type: "spring", bounce: 0.2, duration: 1.5 }}
                  className="absolute bottom-0 left-0 right-0 bg-sky-400 opacity-80"
                  style={{
                    background: "linear-gradient(180deg, #38bdf8 0%, #0284c7 100%)"
                  }}
                />
              </div>
              <div className="mt-4 font-bold text-slate-500">杯子 {i + 1}</div>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center gap-4">
          <button 
            onClick={() => setLeveled(!leveled)}
            className="px-8 py-3 bg-sky-500 text-white rounded-full font-bold text-lg hover:bg-sky-600 transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            {leveled ? "恢复原状" : "移多补少 (求平均数)"}
          </button>
          
          <motion.div 
            animate={{ opacity: leveled ? 1 : 0, y: leveled ? 0 : 10 }}
            className="text-xl font-bold text-slate-700 bg-slate-50 p-4 rounded-xl"
          >
            总水量 = 30 + 90 + 60 + 20 = {sum} <br/>
            平均数 = 总水量 ÷ 杯子数 = {sum} ÷ 4 = <span className="text-red-500">{average}</span>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export function StatisticsDemo() {
  const data = [
    { name: '一班', 苹果: 40, 橘子: 24 },
    { name: '二班', 苹果: 30, 橘子: 13 },
    { name: '三班', 苹果: 20, 橘子: 48 },
    { name: '四班', 苹果: 27, 橘子: 39 },
  ];

  const pieData = [
    { name: '跑步', value: 400 },
    { name: '游泳', value: 300 },
    { name: '跳绳', value: 300 },
    { name: '篮球', value: 200 },
  ];
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="p-8 bg-white rounded-2xl shadow-sm border border-slate-100">
      <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
        <BarChart3 className="text-sky-500" size={28} /> 统计图表
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Bar Chart */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
          <h3 className="text-lg font-bold text-slate-700 mb-4 text-center">条形统计图 (各班水果数量)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip cursor={{fill: 'transparent'}} />
                <Legend />
                <Bar dataKey="苹果" fill="#ef4444" radius={[4, 4, 0, 0]} />
                <Bar dataKey="橘子" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Line Chart */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
          <h3 className="text-lg font-bold text-slate-700 mb-4 text-center">折线统计图 (数量变化趋势)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="苹果" stroke="#ef4444" strokeWidth={3} activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="橘子" stroke="#f59e0b" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 lg:col-span-2">
          <h3 className="text-lg font-bold text-slate-700 mb-4 text-center">扇形统计图 (最喜欢的运动)</h3>
          <div className="h-64 flex justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
