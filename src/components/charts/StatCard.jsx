import { TrendingUp, TrendingDown } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, trend, trendValue, color = 'primary', delay = 0 }) => {
  const colorClasses = {
    primary: 'from-primary-500 to-primary-600',
    success: 'from-green-500 to-green-600',
    warning: 'from-yellow-500 to-yellow-600',
    danger: 'from-red-500 to-red-600',
    info: 'from-blue-500 to-blue-600',
  };

  return (
    <div 
      className="stat-card card-hover animate-slide-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
            {title}
          </p>
          <h3 className="text-3xl font-display font-bold text-slate-900 dark:text-white">
            {value}
          </h3>
        </div>
        
        <div className={`w-12 h-12 bg-gradient-to-br ${colorClasses[color]} rounded-xl flex items-center justify-center shadow-lg`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>

      {trend !== undefined && (
        <div className="flex items-center gap-2">
          {trend === 'up' ? (
            <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" />
          ) : (
            <TrendingDown className="w-4 h-4 text-red-600 dark:text-red-400" />
          )}
          <span className={`text-sm font-semibold ${
            trend === 'up' 
              ? 'text-green-600 dark:text-green-400' 
              : 'text-red-600 dark:text-red-400'
          }`}>
            {trendValue}
          </span>
          <span className="text-sm text-slate-500 dark:text-slate-400">
            vs last month
          </span>
        </div>
      )}
    </div>
  );
};

export default StatCard;