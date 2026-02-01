import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const StudentChart = ({ data, type = 'line' }) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="card p-3 shadow-xl border-2 border-primary-200 dark:border-primary-800">
          <p className="font-semibold text-slate-900 dark:text-white mb-1">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: <span className="font-bold">{entry.value}</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const chartProps = {
    data,
    margin: { top: 10, right: 30, left: 0, bottom: 0 },
  };

  const axisProps = {
    stroke: '#94a3b8',
    style: { fontSize: '12px' },
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      {type === 'line' ? (
        <LineChart {...chartProps}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.5} />
          <XAxis dataKey="name" {...axisProps} />
          <YAxis {...axisProps} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="students" 
            stroke="#0ea5e9" 
            strokeWidth={3}
            dot={{ fill: '#0ea5e9', r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      ) : type === 'area' ? (
        <AreaChart {...chartProps}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.5} />
          <XAxis dataKey="name" {...axisProps} />
          <YAxis {...axisProps} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Area 
            type="monotone" 
            dataKey="students" 
            stroke="#0ea5e9" 
            fill="url(#colorStudents)" 
            strokeWidth={2}
          />
          <defs>
            <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0.1}/>
            </linearGradient>
          </defs>
        </AreaChart>
      ) : (
        <BarChart {...chartProps}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.5} />
          <XAxis dataKey="name" {...axisProps} />
          <YAxis {...axisProps} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar 
            dataKey="students" 
            fill="#0ea5e9" 
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      )}
    </ResponsiveContainer>
  );
};

export default StudentChart;