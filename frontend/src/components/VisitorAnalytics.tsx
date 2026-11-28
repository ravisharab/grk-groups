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
  const [isOwner, setIsOwner] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [stats, setStats] =
    useState<VisitorStats | null>(null);

  // Record visits for everyone
  useEffect(() => {
    async function recordVisit() {
      try {
        const { error } = await supabase.rpc(
          'record_website_visit',
          {
            p_visitor_id: getVisitorId(),
          }
        );

        if (error) throw error;
      } catch (err) {
        console.error('Visitor tracking error:', err);
      }
    }

    void recordVisit();

    const interval = window.setInterval(
      () => void recordVisit(),
      60000
    );

    return () => window.clearInterval(interval);
  }, []);

  // Verify owner authorization
  useEffect(() => {
    let active = true;
    let version = 0;

    async function checkOwner() {
      const current = ++version;

      setIsOwner(false);
      setOpen(false);
      setStats(null);
      setError('');

      try {
        const { data: sessionData, error: sessionError } =
          await supabase.auth.getSession();

        if (sessionError) throw sessionError;

        if (!sessionData.session) return;

        const { data, error } = await supabase.rpc(
          'is_analytics_owner'
        );

        if (error) throw error;

        if (active && current === version) {
          setIsOwner(data === true);
        }
      } catch (err) {
        console.error('Owner verification failed:', err);
      }
    }

    void checkOwner();

    const { data: { subscription } } =
      supabase.auth.onAuthStateChange((event) => {
        if (event === 'TOKEN_REFRESHED') return;

        version++;
        setIsOwner(false);
        setOpen(false);
        setStats(null);

        window.setTimeout(() => {
          if (active) void checkOwner();
        }, 0);
      });

    return () => {
      active = false;
      version++;
      subscription.unsubscribe();
    };
  }, []);

  // Load statistics only for the authorized owner
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    if (!isOwner || !open) return;

    let active = true;

    async function loadStats() {
      setLoading(true);
      setError('');

      try {
        const { data, error } = await supabase.rpc(
          'get_private_visitor_stats'
        );

        if (error) throw error;

        if (active) {
          setStats(data as VisitorStats);
        }
      } catch (err) {
        console.error('Analytics error:', err);

        if (active) {
          setStats(null);
          setError('Unable to load private statistics.');
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    void loadStats();

    const interval = window.setInterval(
      () => void loadStats(),
      60000
    );

    return () => {
      active = false;
      window.clearInterval(interval);
    };
  }, [isOwner, open, refresh]);

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

  // Hide analytics from all non-owner visitors.
  // Visitor tracking continues in the background.
  if (!isOwner) return null;

  return (
    <div className="fixed bottom-5 right-[190px] z-[90]">

      <button
        type="button"
        aria-label="Private Visitor Analytics"
        aria-expanded={open}
        aria-controls="visitor-analytics"
        onClick={() => setOpen(previous => !previous)}
        className="flex items-center gap-2 rounded-full border border-amber-300/40 bg-gradient-to-r from-[#102747] to-[#06152f] px-4 py-4 font-bold text-amber-300 shadow-xl transition hover:-translate-y-1 sm:px-5"
      >
        <BarChart3 size={22} />

        <span className="hidden text-sm font-bold sm:inline">
          Analytics
        </span>
      </button>

      {open && (
        <div
          id="visitor-analytics"
          className="fixed bottom-24 right-5 z-[90] max-h-[75dvh] w-[min(320px,calc(100vw-40px))] overflow-y-auto rounded-2xl border border-amber-400/40 bg-[#06152f] p-4 text-white shadow-2xl sm:right-[190px]"
        >
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BarChart3
                size={20}
                className="text-amber-300"
              />

              <h2 className="text-sm font-bold text-amber-300">
                Private Visitor Analytics
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

          <div className="mb-3 rounded-lg border border-green-500/20 bg-green-500/10 p-2 text-center text-xs text-green-400">
            🔒 Owner Access Only
          </div>

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

          <button
            type="button"
            disabled={loading}
            onClick={() => setRefresh(value => value + 1)}
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
            Automatically updates every minute while open
          </p>

          <div className="mt-3 border-t border-white/10 pt-3 text-center">
            <p className="text-[10px] font-bold tracking-widest text-amber-300">
              RAVITECH GLOBAL
            </p>
          </div>
        </div>
      )}
    </div>
  );
}