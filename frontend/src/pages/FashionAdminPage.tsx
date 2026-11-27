
import { useEffect, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import {
  ShieldCheck,
  LogOut,
  Package,
  Layers,
  CheckCircle,
  FileText,
} from 'lucide-react';

import { supabase } from '../lib/supabase';
import AdminLogin from '../components/fashion/AdminLogin';
import ProductManager from '../components/fashion/ProductManager';

export default function FashionAdminPage() {
  const [session, setSession] =
    useState<Session | null>(null);

  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState('');

  const [totalProducts, setTotalProducts] = useState(0);
  const [publishedProducts, setPublishedProducts] = useState(0);
  const [categories, setCategories] = useState(0);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    let active = true;
    let authChanged = false;

    const { data: listener } =
      supabase.auth.onAuthStateChange((_event, newSession) => {
        authChanged = true;
        if (active) {
          setIsAdmin(false);
          setLoading(true);
          setSession(newSession);
          if (!newSession) setLoading(false);
        }
      });

    supabase.auth.getSession().then(({ data, error }) => {
      if (!active || authChanged) return;

      if (error) {
        setError('Unable to verify your login session.');
      }

      setSession(data.session);
      if (!data.session) setLoading(false);
    });

    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    let active = true;

    async function verifyAdmin() {
      if (!session) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError('');

      try {
        const { data, error } =
          await supabase.rpc('is_fashion_admin');

        if (!active) return;

        if (error) throw error;

        setIsAdmin(data === true);
      } catch {
        if (active) {
          setIsAdmin(false);
          setError('Administrator verification failed.');
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    void verifyAdmin();

    return () => {
      active = false;
    };
  }, [session]);

  useEffect(() => {
    if (!isAdmin) return;

    let active = true;

    async function loadDashboard() {
      const [products, published, collections] =
        await Promise.all([
          supabase
            .from('fashion_products')
            .select('id', { count: 'exact', head: true }),

          supabase
            .from('fashion_products')
            .select('id', { count: 'exact', head: true })
            .eq('is_published', true),

          supabase
            .from('fashion_categories')
            .select('id', { count: 'exact', head: true }),
        ]);

      if (!active) return;

      if (products.error || published.error || collections.error) {
        setError('Unable to load dashboard statistics.');
        return;
      }

      setTotalProducts(products.count ?? 0);
      setPublishedProducts(published.count ?? 0);
      setCategories(collections.count ?? 0);
    }

    void loadDashboard();

    return () => {
      active = false;
    };
  }, [isAdmin, refreshKey]);

  async function logout() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      setError('Unable to sign out. Please try again.');
    }
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#06152f] text-amber-400">
        Verifying administrator access...
      </main>
    );
  }

  if (!session) {
    return <AdminLogin />;
  }

  if (!isAdmin) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-5 bg-[#06152f] px-6 text-white">

        <ShieldCheck size={55} className="text-red-400" />

        <h1 className="text-3xl font-bold text-red-400">
          Access Denied
        </h1>

        <p>
          {error || 'You are not an authorized GRK Fashion administrator.'}
        </p>

        <button
          onClick={logout}
          className="rounded-xl bg-amber-400 px-6 py-3 font-bold text-slate-950"
        >
          Sign Out
        </button>

      </main>
    );
  }

  const stats = [
    {
      name: 'Total Products',
      value: totalProducts,
      icon: Package,
    },
    {
      name: 'Published Products',
      value: publishedProducts,
      icon: CheckCircle,
    },
    {
      name: 'Collections',
      value: categories,
      icon: Layers,
    },
    {
      name: 'Draft Products',
      value: totalProducts - publishedProducts,
      icon: FileText,
    },
  ];

  return (
    <main className="min-h-screen bg-[#06152f] px-6 pb-20 pt-36 text-white">

      <div className="mx-auto max-w-7xl">

        <div className="flex flex-wrap items-center justify-between gap-5">

          <div>

            <p className="text-xs font-bold tracking-widest text-amber-400">
              SECURE ADMINISTRATION PORTAL
            </p>

            <h1 className="mt-3 text-4xl font-black text-amber-400">
              GRK Fashion Admin
            </h1>

            <p className="mt-3 text-sm text-slate-400">
              Signed in as {session.user.email}
            </p>

          </div>

          <button
            onClick={logout}
            className="flex items-center gap-2 rounded-xl border border-amber-400/40 px-5 py-3 text-amber-400 hover:bg-amber-400 hover:text-slate-950"
          >
            <LogOut size={18} />
            Sign Out
          </button>

        </div>

        {error && (
          <p role="alert" className="mt-6 text-red-400">
            {error}
          </p>
        )}

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

          {stats.map(stat => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.name}
                className="rounded-2xl border border-amber-400/30 bg-[#102747] p-6"
              >

                <Icon
                  size={30}
                  className="text-amber-400"
                />

                <h2 className="mt-4 text-4xl font-black text-amber-400">
                  {stat.value}
                </h2>

                <p className="mt-2 text-slate-300">
                  {stat.name}
                </p>

              </div>
            );
          })}

        </div>

       <ProductManager
  onProductsChanged={() =>
    setRefreshKey(previous => previous + 1)
  }
/> 
      </div>

    </main>
  );
}
