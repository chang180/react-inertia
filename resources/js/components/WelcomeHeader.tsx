import { dashboard, login, register } from '@/routes';
import { type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { useAppearance } from '@/hooks/use-appearance';

export default function WelcomeHeader() {
    const { auth } = usePage<SharedData>().props;
    const { appearance, updateAppearance } = useAppearance();

    return (
        <header className="mb-6 w-full px-6 pt-6">
            <nav className="flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center gap-3">
                    <img src="/images/logo.svg" alt="圖片管理系統" className="h-10 w-10" />
                    <span className="text-xl font-bold text-cyan-800 dark:text-cyan-200">圖片管理系統</span>
                </div>
                
                {/* Navigation */}
                <div className="flex items-center gap-4">
                    {/* Dark Mode Toggle */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => updateAppearance(appearance === 'dark' ? 'light' : 'dark')}
                            className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
                            title={`切換到 ${appearance === 'dark' ? '淺色' : '深色'} 模式`}
                        >
                            {appearance === 'dark' ? (
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            ) : (
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                </svg>
                            )}
                        </button>
                    </div>
                    
                    {/* Auth Links */}
                    {auth.user && auth.user.role !== 'guest' ? (
                        <Link
                            href={dashboard()}
                            className="inline-block rounded-lg border border-cyan-300 bg-cyan-50 px-5 py-2 text-sm font-medium text-cyan-700 hover:bg-cyan-100 dark:border-cyan-600 dark:bg-cyan-900/20 dark:text-cyan-300 dark:hover:bg-cyan-900/30 transition-colors"
                        >
                            控制台
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={login()}
                                className="inline-block rounded-lg border border-transparent px-5 py-2 text-sm font-medium text-cyan-700 hover:bg-cyan-50 dark:text-cyan-300 dark:hover:bg-cyan-900/20 transition-colors"
                            >
                                登入
                            </Link>
                            <Link
                                href={register()}
                                className="inline-block rounded-lg border border-cyan-300 bg-cyan-50 px-5 py-2 text-sm font-medium text-cyan-700 hover:bg-cyan-100 dark:border-cyan-600 dark:bg-cyan-900/20 dark:text-cyan-300 dark:hover:bg-cyan-900/30 transition-colors"
                            >
                                註冊
                            </Link>
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
}
