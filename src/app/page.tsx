'use client';

import { useState, useEffect } from 'react';
import { 
  Activity, 
  TrendingUp, 
  Calendar, 
  DollarSign, 
  CheckCircle, 
  AlertCircle, 
  Clock,
  Rocket,
  Brain,
  Twitter,
  BarChart3,
  Server,
  RefreshCw
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

// Mock data - will be replaced with real data from APIs
const tradingData = [
  { date: '2022-01', equity: 100000 },
  { date: '2022-06', equity: 95000 },
  { date: '2023-01', equity: 105000 },
  { date: '2023-06', equity: 113806 },
  { date: '2024-01', equity: 121780 },
  { date: '2024-12', equity: 168673 },
];

const projects = [
  { 
    id: 1, 
    name: 'StrategyBacktest', 
    status: 'live', 
    url: 'https://trading-dashboard-xi-eight.vercel.app',
    github: 'https://github.com/Honeybot25/StrategyBacktest',
    lastDeploy: '2 hours ago',
    metrics: { users: 0, revenue: 0 },
    health: 'excellent'
  },
  { 
    id: 2, 
    name: 'Second Brain Web', 
    status: 'live', 
    url: 'https://second-brain-web-sooty.vercel.app',
    github: 'https://github.com/Honeybot25/second-brain-web',
    lastDeploy: '30 mins ago',
    metrics: { notes: 5, views: 0 },
    health: 'excellent'
  },
  { 
    id: 3, 
    name: 'Trading Bot Infrastructure', 
    status: 'development', 
    progress: 75,
    lastUpdate: 'Yesterday',
    metrics: { backtests: 1, strategies: 1 },
    health: 'good'
  },
  { 
    id: 4, 
    name: 'Content Machine', 
    status: 'ready', 
    progress: 100,
    lastUpdate: 'Today',
    metrics: { drafts: 8, scheduled: 0 },
    health: 'excellent'
  },
];

const cronJobs = [
  { name: 'Daily Heartbeat', schedule: 'Every hour', lastRun: '12 mins ago', status: 'healthy', nextRun: '48 mins' },
  { name: 'Market Brief', schedule: '6:30 AM M-F', lastRun: '4 hours ago', status: 'healthy', nextRun: 'Tomorrow 6:30 AM' },
  { name: 'Trading Check', schedule: 'Every 15 min (market)', lastRun: '3 mins ago', status: 'healthy', nextRun: '12 mins' },
  { name: 'Security Audit', schedule: '7:00 AM daily', lastRun: '3 hours ago', status: 'healthy', nextRun: 'Tomorrow 7:00 AM' },
  { name: 'Memory Consolidation', schedule: '2:00 AM daily', lastRun: '14 hours ago', status: 'healthy', nextRun: 'Tonight 2:00 AM' },
  { name: 'Content Scan', schedule: '9:00 AM, 3:00 PM', lastRun: '5 hours ago', status: 'healthy', nextRun: 'Today 3:00 PM' },
  { name: 'Build Health Check', schedule: 'Every 6 hours', lastRun: '2 hours ago', status: 'warning', nextRun: '4 hours', error: 'Timeout (no CI to monitor)' },
];

const contentCalendar = [
  { day: 'Mon', type: 'Thread', title: '3 Trading Strategies Backtested', status: 'ready', platform: 'X' },
  { day: 'Wed', type: 'Deep Dive', title: 'AI Agents Running My Business', status: 'ready', platform: 'X' },
  { day: 'Fri', type: 'Launch', title: 'StrategyBacktest Launch Post', status: 'ready', platform: 'X' },
  { day: 'Sat', type: 'Engagement', title: 'Reply to mentions & trending', status: 'scheduled', platform: 'X' },
];

const revenueMetrics = {
  mrr: 0,
  totalRevenue: 0,
  activeUsers: 0,
  conversionRate: 0,
  goal: 5000,
  progress: 0,
};

export default function MissionControl() {
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  const refreshData = () => {
    setLastUpdated(new Date());
    // In real implementation, this would fetch fresh data from all sources
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Mission Control</h1>
                <p className="text-sm text-gray-400">Real-time company dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-400">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </span>
              <button 
                onClick={refreshData}
                className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                <span className="text-sm">Refresh</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Navigation Tabs */}
        <div className="flex space-x-2 mb-8 overflow-x-auto">
          {[
            { id: 'overview', label: 'Overview', icon: Activity },
            { id: 'projects', label: 'Projects', icon: Rocket },
            { id: 'trading', label: 'Trading', icon: TrendingUp },
            { id: 'cron', label: 'Cron Jobs', icon: Clock },
            { id: 'content', label: 'Content', icon: Twitter },
            { id: 'revenue', label: 'Revenue', icon: DollarSign },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <MetricCard
                icon={Rocket}
                label="Active Projects"
                value="4"
                subtext="2 live, 2 in dev"
                color="blue"
              />
              <MetricCard
                icon={TrendingUp}
                label="Trading Return"
                value="+68.67%"
                subtext="3 year backtest"
                color="green"
              />
              <MetricCard
                icon={CheckCircle}
                label="Cron Jobs"
                value="15/16"
                subtext="1 warning"
                color="yellow"
              />
              <MetricCard
                icon={DollarSign}
                label="MRR"
                value="$0"
                subtext="Goal: $5,000"
                color="purple"
              />
            </div>

            {/* Quick Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Projects Status */}
              <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                <h2 className="text-lg font-semibold mb-4 flex items-center">
                  <Rocket className="w-5 h-5 mr-2 text-blue-400" />
                  Project Status
                </h2>
                <div className="space-y-3">
                  {projects.slice(0, 3).map((project) => (
                    <div key={project.id} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-2 h-2 rounded-full ${
                          project.status === 'live' ? 'bg-green-500' :
                          project.status === 'development' ? 'bg-yellow-500' : 'bg-blue-500'
                        }`} />
                        <span className="font-medium">{project.name}</span>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        project.status === 'live' ? 'bg-green-500/20 text-green-400' :
                        project.status === 'development' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-blue-500/20 text-blue-400'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trading Preview */}
              <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                <h2 className="text-lg font-semibold mb-4 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-green-400" />
                  Trading Performance
                </h2>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={tradingData}>
                      <defs>
                        <linearGradient id="colorEquity" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="date" tick={{ fill: '#6B7280', fontSize: 12 }} />
                      <YAxis tick={{ fill: '#6B7280', fontSize: 12 }} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1F2937', border: 'none' }}
                        labelStyle={{ color: '#9CA3AF' }}
                      />
                      <Area type="monotone" dataKey="equity" stroke="#10B981" fillOpacity={1} fill="url(#colorEquity)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* System Health */}
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <Server className="w-5 h-5 mr-2 text-purple-400" />
                System Health
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <HealthIndicator label="Discord Bot" status="online" />
                <HealthIndicator label="Cron Scheduler" status="online" />
                <HealthIndicator label="StrategyBacktest" status="online" />
                <HealthIndicator label="Second Brain" status="online" />
              </div>
            </div>
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id} className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold">{project.name}</h3>
                    <p className="text-gray-400 text-sm mt-1">
                      Last updated: {project.lastDeploy || project.lastUpdate}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      project.status === 'live' ? 'bg-green-500/20 text-green-400' :
                      project.status === 'development' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-blue-500/20 text-blue-400'
                    }`}>
                      {project.status}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      project.health === 'excellent' ? 'bg-green-500/20 text-green-400' :
                      project.health === 'good' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {project.health}
                    </span>
                  </div>
                </div>
                
                {project.url && (
                  <div className="mb-4">
                    <a href={project.url} target="_blank" rel="noopener noreferrer" 
                       className="text-blue-400 hover:text-blue-300 text-sm">
                      🌐 {project.url}
                    </a>
                  </div>
                )}
                
                {project.github && (
                  <div className="mb-4">
                    <a href={project.github} target="_blank" rel="noopener noreferrer"
                       className="text-gray-400 hover:text-gray-300 text-sm">
                      📁 {project.github}
                    </a>
                  </div>
                )}

                {project.progress && (
                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-400">Progress</span>
                      <span className="text-white">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>
                )}

                <div className="mt-4 flex flex-wrap gap-2">
                  {Object.entries(project.metrics).map(([key, value]) => (
                    <span key={key} className="text-xs bg-gray-800 px-3 py-1 rounded-full text-gray-400">
                      {key}: {value}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Trading Tab */}
        {activeTab === 'trading' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <MetricCard icon={TrendingUp} label="Total Return" value="+68.67%" color="green" />
              <MetricCard icon={BarChart3} label="Annualized" value="26.81%" color="green" />
              <MetricCard icon={CheckCircle} label="Win Rate" value="100%" color="green" />
              <MetricCard icon={AlertCircle} label="Max Drawdown" value="-33.78%" color="red" />
            </div>

            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
              <h2 className="text-lg font-semibold mb-4">Equity Curve</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={tradingData}>
                    <defs>
                      <linearGradient id="colorEquity2" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="date" tick={{ fill: '#6B7280' }} />
                    <YAxis tick={{ fill: '#6B7280' }} />
                    <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none' }} />
                    <Area type="monotone" dataKey="equity" stroke="#10B981" fillOpacity={1} fill="url(#colorEquity2)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
              <h2 className="text-lg font-semibold mb-4">Active Strategies</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b border-gray-800">
                      <th className="pb-3 text-gray-400 font-medium">Strategy</th>
                      <th className="pb-3 text-gray-400 font-medium">Instrument</th>
                      <th className="pb-3 text-gray-400 font-medium">Return</th>
                      <th className="pb-3 text-gray-400 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-800">
                      <td className="py-4">Dual MA Crossover + RSI</td>
                      <td className="py-4 text-gray-400">SPY</td>
                      <td className="py-4 text-green-400">+68.67%</td>
                      <td className="py-4"><span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded text-sm">Backtested</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Cron Jobs Tab */}
        {activeTab === 'cron' && (
          <div className="space-y-4">
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold">Cron Job Health</h2>
                  <p className="text-gray-400 text-sm mt-1">15 jobs scheduled, 14 healthy, 1 warning</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">14</div>
                    <div className="text-xs text-gray-400">Healthy</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-400">1</div>
                    <div className="text-xs text-gray-400">Warning</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-400">0</div>
                    <div className="text-xs text-gray-400">Failed</div>
                  </div>
                </div>
              </div>
            </div>

            {cronJobs.map((job, index) => (
              <div key={index} className={`bg-gray-900 rounded-xl p-4 border ${
                job.status === 'warning' ? 'border-yellow-600/50' : 'border-gray-800'
              }`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full ${
                        job.status === 'healthy' ? 'bg-green-500' :
                        job.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                      }`} />
                      <h3 className="font-semibold">{job.name}</h3>
                      <span className="text-xs bg-gray-800 px-2 py-1 rounded text-gray-400">
                        {job.schedule}
                      </span>
                    </div>
                    <div className="mt-2 flex items-center space-x-4 text-sm text-gray-400">
                      <span>Last run: {job.lastRun}</span>
                      <span>•</span>
                      <span>Next: {job.nextRun}</span>
                    </div>
                    {job.error && (
                      <div className="mt-2 text-sm text-yellow-400">
                        ⚠️ {job.error}
                      </div>
                    )}
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm ${
                    job.status === 'healthy' ? 'bg-green-500/20 text-green-400' :
                    job.status === 'warning' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {job.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Content Tab */}
        {activeTab === 'content' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <MetricCard icon={Twitter} label="Drafts Ready" value="8" color="blue" />
              <MetricCard icon={Calendar} label="Scheduled" value="0" color="purple" />
              <MetricCard icon={CheckCircle} label="Posted This Week" value="0" color="green" />
              <MetricCard icon={TrendingUp} label="Engagement" value="N/A" color="gray" />
            </div>

            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
              <h2 className="text-lg font-semibold mb-4">This Week's Content</h2>
              <div className="space-y-3">
                {contentCalendar.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="bg-gray-700 px-3 py-1 rounded text-sm font-medium">
                        {item.day}
                      </div>
                      <div>
                        <div className="font-medium">{item.title}</div>
                        <div className="text-sm text-gray-400">{item.type} • {item.platform}</div>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      item.status === 'ready' ? 'bg-green-500/20 text-green-400' :
                      'bg-blue-500/20 text-blue-400'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
              <h2 className="text-lg font-semibold mb-4">Content Queue</h2>
              <div className="space-y-3">
                {[
                  "How I lost money trading (and fixed it)",
                  "The 4-agent system that runs my business",
                  "Why most trading strategies fail",
                  "Building in public: StrategyBacktest journey",
                  "AI agents vs traditional automation"
                ].map((title, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg">
                    <div className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center text-sm text-gray-400">
                      {index + 1}
                    </div>
                    <span>{title}</span>
                    <span className="ml-auto text-xs bg-gray-700 px-2 py-1 rounded text-gray-400">Draft</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Revenue Tab */}
        {activeTab === 'revenue' && (
          <div className="space-y-6">
            <div className="bg-gray-900 rounded-xl p-8 border border-gray-800 text-center">
              <h2 className="text-gray-400 text-lg mb-2">Monthly Recurring Revenue</h2>
              <div className="text-5xl font-bold text-white mb-4">${revenueMetrics.mrr}</div>
              <div className="text-gray-400">Goal: ${revenueMetrics.goal.toLocaleString()}/mo</div>
              <div className="mt-6 max-w-md mx-auto">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Progress</span>
                  <span className="text-white">{revenueMetrics.progress}%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full transition-all"
                    style={{ width: `${revenueMetrics.progress}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <MetricCard icon={DollarSign} label="Total Revenue" value="$0" color="gray" />
              <MetricCard icon={CheckCircle} label="Active Users" value="0" color="gray" />
              <MetricCard icon={TrendingUp} label="Conversion Rate" value="0%" color="gray" />
              <MetricCard icon={Calendar} label="Days to $5K" value="Calculating..." color="gray" />
            </div>

            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
              <h2 className="text-lg font-semibold mb-4">Revenue Streams</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="bg-green-500/20 p-2 rounded">
                      <Rocket className="w-5 h-5 text-green-400" />
                    </div>
                    <div>
                      <div className="font-medium">StrategyBacktest Pro</div>
                      <div className="text-sm text-gray-400">SaaS subscriptions</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">$0</div>
                    <div className="text-sm text-gray-400">0 subscribers</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-500/20 p-2 rounded">
                      <TrendingUp className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <div className="font-medium">Trading Profits</div>
                      <div className="text-sm text-gray-400">Live trading returns</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">$0</div>
                    <div className="text-sm text-gray-400">Paper trading only</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="bg-purple-500/20 p-2 rounded">
                      <Twitter className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <div className="font-medium">Content/Affiliate</div>
                      <div className="text-sm text-gray-400">Sponsorships, affiliates</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">$0</div>
                    <div className="text-sm text-gray-400">Not started</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

// Helper Components
function MetricCard({ 
  icon: Icon, 
  label, 
  value, 
  subtext,
  color = 'blue' 
}: { 
  icon: React.ElementType;
  label: string;
  value: string;
  subtext?: string;
  color?: 'blue' | 'green' | 'yellow' | 'purple' | 'red' | 'gray';
}) {
  const colorClasses = {
    blue: 'bg-blue-500/20 text-blue-400',
    green: 'bg-green-500/20 text-green-400',
    yellow: 'bg-yellow-500/20 text-yellow-400',
    purple: 'bg-purple-500/20 text-purple-400',
    red: 'bg-red-500/20 text-red-400',
    gray: 'bg-gray-500/20 text-gray-400',
  };

  return (
    <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${colorClasses[color]}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="text-2xl font-bold mb-1">{value}</div>
      <div className="text-sm text-gray-400">{label}</div>
      {subtext && <div className="text-xs text-gray-500 mt-2">{subtext}</div>}
    </div>
  );
}

function HealthIndicator({ label, status }: { label: string; status: 'online' | 'warning' | 'offline' }) {
  const colors = {
    online: 'bg-green-500',
    warning: 'bg-yellow-500',
    offline: 'bg-red-500',
  };

  return (
    <div className="flex items-center space-x-2">
      <div className={`w-2 h-2 rounded-full ${colors[status]}`} />
      <span className="text-sm text-gray-400">{label}</span>
    </div>
  );
}
