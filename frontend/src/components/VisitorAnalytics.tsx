
import { useEffect, useState } from 'react';
import {
  BarChart3,
  X,
  Users,
  CalendarDays,
  CalendarRange,
  Calendar,
  Globe,
  RefreshCw,
} from 'lucide-react';

import { supabase } from '../lib/supabase';

type VisitorStats = {
  today: number;
  yesterday: number;
  weekly: number;
  monthly: number;
  yearly: number;
  total: number;
};

function getVisitorId(): string {
  const key = 'grk_visitor_id';

  let visitorId = localStorage.getItem(key);

  if (!visitorId) {
    visitorId = crypto.randomUUID();
    localStorage.setItem(key, visitorId);
  }

  return visitorId;
}

export default function VisitorAnalytics() {
  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState('');

  const [stats, setStats] =
    useState<VisitorStats | null>(null);

  async function loadStats() {
    setLoading(true);
    setError('');

    try {
      const { data, error } = await supabase.rpc(
        'get_visitor_stats'
      );

      if (error) throw error;

      setStats(data as VisitorStats);
    } catch (err) {
      console.error('Analytics error:', err);
      setError('Unable to load visitor statistics.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function initializeAnalytics() {
      try {
        const visitorId = getVisitorId();

        const { error } = await supabase.rpc(
          'record_website_visit',
          {
            p_visitor_id: visitorId,
          }
        );

        if (error) throw error;

        await loadStats();
      } catch (err) {
        console.error('Visitor tracking error:', err);
        setError('Unable to register website visit.');
        setLoading(false);
      }
    }

    void initializeAnalytics();

    const interval = window.setInterval(
      () => void initializeAnalytics(),
      60000
    );

    return () => window.clearInterval(interval);
  }, []);

  const items = [
    {
      label: 'Today',
      value: stats?.today,
      icon: Users,
    },
    {
      label: 'Yesterday',
      value: stats?.yesterday,
      icon: CalendarDays,
    },
    {
      label: 'This Week',
      value: stats?.weekly,
      icon: CalendarRange,
    },
    {
      label: 'This Month',
      value: stats?.monthly,
      icon: CalendarDays,
    },
    {
      label: 'This Year',
      value: stats?.yearly,
      icon: Calendar,
    },
    {
      label: 'All Time',
      value: stats?.total,
      icon: Globe,
    },
  ];

  return (
    <div className="fixed right-5 top-24 z-[80]">

      {/* Analytics Button */}

      <button
        type="button"
        aria-expanded={open}
        aria-controls="visitor-analytics"
        onClick={() => {
          if (!open) void loadStats();
          setOpen(!open);
        }}
        className="ml-auto flex items-center gap-2 rounded-full border border-amber-400/40 bg-[#06152f]/95 px-3 py-2 text-amber-300 shadow-lg backdrop-blur-md transition-all hover:border-amber-400 hover:scale-105"
      >
        <BarChart3 size={17} />

        <span className="text-xs font-bold">
          Analytics
        </span>
      </button>

      {/* Analytics Popup */}

      {open && (
        <div
          id="visitor-analytics"
          className="mt-3 max-h-[75dvh] w-[min(320px,calc(100vw-40px))] overflow-y-auto rounded-2xl border border-amber-400/40 bg-[#06152f] p-4 text-white shadow-2xl"
        >

          {/* Header */}

          <div className="mb-4 flex items-center justify-between">

            <div className="flex items-center gap-2">

              <BarChart3
                size={20}
                className="text-amber-300"
              />

              <h2 className="text-sm font-bold text-amber-300">
                GRK Visitor Analytics
              </h2>

            </div>

            <button
              type="button"
              aria-label="Close analytics"
              onClick={() => setOpen(false)}
              className="rounded-full p-1 text-slate-300 hover:bg-white/10"
            >
              <X size={18} />
            </button>

          </div>

          {/* Statistics */}

          <div className="grid grid-cols-2 gap-3">

            {items.map(item => {
              const Icon = item.icon;

              return (
                <div
                  key={item.label}
                  className="rounded-xl border border-amber-400/20 bg-[#102747] p-3 text-center"
                >

                  <Icon
                    size={19}
                    className="mx-auto mb-2 text-amber-300"
                  />

                  <p className="text-2xl font-black text-amber-300">

                    {item.value === undefined
                      ? '—'
                      : item.value.toLocaleString()}

                  </p>

                  <p className="mt-1 text-[11px] text-slate-300">
                    {item.label}
                  </p>

                </div>
              );
            })}

          </div>

          {error && (
            <p className="mt-3 text-center text-xs text-red-400">
              {error}
            </p>
          )}

          {/* Refresh Button */}

          <button
            type="button"
            disabled={loading}
            onClick={() => void loadStats()}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-amber-400/30 py-2 text-xs font-medium text-amber-300 hover:bg-amber-400/10 disabled:opacity-50"
          >

            <RefreshCw
              size={14}
              className={loading ? 'animate-spin' : ''}
            />

            {loading ? 'Updating...' : 'Refresh Statistics'}

          </button>

          <p className="mt-3 text-center text-[10px] text-slate-400">
            Unique browser visitors · Eastern Time
          </p>

          <p className="mt-1 text-center text-[10px] text-slate-400">
            Automatically updates every minute
          </p>

          <div className="mt-3 border-t border-white/10 pt-3 text-center">

            <p className="text-[10px] font-bold tracking-widest text-amber-300">
              GRK GROUPS
            </p>

          </div>

        </div>
      )}

    </div>
  );
}
