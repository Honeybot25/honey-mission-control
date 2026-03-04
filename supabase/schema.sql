-- Supabase Database Schema for Mission Control
-- Production-grade schema for tasks, projects, agents, activities, and knowledge

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Projects table (PARA - Projects)
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT,
    status TEXT CHECK (status IN ('active', 'completed', 'archived', 'paused')),
    goal TEXT,
    deadline DATE,
    area_id UUID REFERENCES areas(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    metrics JSONB DEFAULT '{}'
);

-- Areas table (PARA - Areas of responsibility)
CREATE TABLE areas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT,
    icon TEXT,
    color TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Resources table (PARA - Resources)
CREATE TABLE resources (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    content TEXT,
    type TEXT CHECK (type IN ('note', 'link', 'file', 'reference')),
    tags TEXT[],
    project_id UUID REFERENCES projects(id),
    area_id UUID REFERENCES areas(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tasks table (with deep linking)
CREATE TABLE tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    status TEXT CHECK (status IN ('todo', 'in_progress', 'done', 'blocked', 'cancelled')) DEFAULT 'todo',
    priority TEXT CHECK (priority IN ('low', 'medium', 'high', 'urgent')) DEFAULT 'medium',
    project_id UUID REFERENCES projects(id),
    area_id UUID REFERENCES areas(id),
    assigned_to TEXT, -- agent name or user
    due_date DATE,
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    parent_task_id UUID REFERENCES tasks(id), -- for subtasks
    tags TEXT[],
    metadata JSONB DEFAULT '{}'
);

-- Agents table
CREATE TABLE agents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    status TEXT CHECK (status IN ('active', 'idle', 'paused', 'error')) DEFAULT 'idle',
    last_action TEXT,
    last_action_at TIMESTAMP WITH TIME ZONE,
    metrics JSONB DEFAULT '{}',
    config JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Activity/Signal feed (unified timeline)
CREATE TABLE activities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    type TEXT CHECK (type IN ('trade', 'deployment', 'content', 'task', 'system', 'agent', 'note')),
    agent TEXT, -- which agent generated this
    title TEXT NOT NULL,
    description TEXT,
    severity TEXT CHECK (severity IN ('info', 'success', 'warning', 'error', 'critical')) DEFAULT 'info',
    metadata JSONB DEFAULT '{}',
    project_id UUID REFERENCES projects(id),
    task_id UUID REFERENCES tasks(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Daily notes (journal)
CREATE TABLE daily_notes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    date DATE NOT NULL UNIQUE,
    content TEXT,
    highlights TEXT[],
    tasks_completed INTEGER DEFAULT 0,
    tasks_total INTEGER DEFAULT 0,
    mood TEXT,
    energy INTEGER CHECK (energy >= 1 AND energy <= 10),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Goals (OKRs)
CREATE TABLE goals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    type TEXT CHECK (type IN ('financial', 'product', 'content', 'trading', 'personal')),
    target_value NUMERIC,
    current_value NUMERIC DEFAULT 0,
    unit TEXT,
    deadline DATE,
    status TEXT CHECK (status IN ('active', 'completed', 'paused', 'cancelled')) DEFAULT 'active',
    area_id UUID REFERENCES areas(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_tasks_project ON tasks(project_id);
CREATE INDEX idx_tasks_due ON tasks(due_date);
CREATE INDEX idx_activities_type ON activities(type);
CREATE INDEX idx_activities_created ON activities(created_at DESC);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_agents_status ON agents(status);

-- Triggers for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_areas_updated_at BEFORE UPDATE ON areas FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_resources_updated_at BEFORE UPDATE ON resources FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_tasks_updated_at BEFORE UPDATE ON tasks FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_agents_updated_at BEFORE UPDATE ON agents FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_daily_notes_updated_at BEFORE UPDATE ON daily_notes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_goals_updated_at BEFORE UPDATE ON goals FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert default areas
INSERT INTO areas (name, description, icon, color) VALUES
('Trading Systems', 'Systematic trading and backtesting', 'TrendingUp', 'green'),
('Product Development', 'Building revenue-generating products', 'Rocket', 'blue'),
('Content & Distribution', 'Building audience and driving awareness', 'Twitter', 'purple'),
('Operations', 'Infrastructure, automation, and systems', 'Server', 'orange'),
('Research', 'Deep dives and opportunity discovery', 'Brain', 'pink');

-- Insert default agents
INSERT INTO agents (name, role, status, metrics) VALUES
('TraderBot', 'Trading systems and execution', 'active', '{"trades_today": 0, "pnl_today": 0}'),
('ProductBuilder', 'Building revenue-generating products', 'active', '{"projects_shipped": 3, "deployments_today": 3}'),
('DistributionAgent', 'Content and audience building', 'idle', '{"drafts_ready": 8, "posts_today": 0}'),
('MemoryManager', 'Knowledge management and consolidation', 'active', '{"notes_indexed": 5, "last_sync": "2 hours ago"}');

-- Insert sample goals
INSERT INTO goals (title, description, type, target_value, current_value, unit, deadline, status) VALUES
('Reach $5K MRR', 'Monthly recurring revenue from products', 'financial', 5000, 0, 'USD', '2026-12-31', 'active'),
('Ship 12 Products', 'Launch one product per month', 'product', 12, 3, 'products', '2026-12-31', 'active'),
('Grow to 10K Followers', 'Build audience on X/Twitter', 'content', 10000, 0, 'followers', '2026-12-31', 'active'),
('Deploy Live Trading', 'Go from paper to live trading', 'trading', 1, 0, 'systems', '2026-06-30', 'active');

-- Insert sample activities
INSERT INTO activities (type, agent, title, description, severity, metadata) VALUES
('deployment', 'ProductBuilder', 'StrategyBacktest deployed', 'Trading backtest platform now live', 'success', '{"url": "https://trading-dashboard-xi-eight.vercel.app"}'),
('deployment', 'ProductBuilder', 'Second Brain Web deployed', 'PARA knowledge browser now live', 'success', '{"url": "https://second-brain-web-sooty.vercel.app"}'),
('deployment', 'ProductBuilder', 'Mission Control deployed', 'Unified company dashboard now live', 'success', '{"url": "https://mission-control-lovat-rho.vercel.app"}'),
('system', 'MemoryManager', 'Nightly consolidation complete', 'Daily note updated, brain organized', 'info', '{}'),
('trade', 'TraderBot', 'Backtest completed', 'Dual MA strategy: +68.67% return', 'success', '{"return": 68.67}'),
('content', 'DistributionAgent', 'Content calendar created', '8 tweet drafts ready for posting', 'info', '{"drafts": 8}');
