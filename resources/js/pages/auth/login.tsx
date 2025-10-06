import AuthenticatedSessionController from '@/actions/App/Http/Controllers/Auth/AuthenticatedSessionController';
import InputError from '@/components/input-error';
import { register } from '@/routes';
import { request } from '@/routes/password';
import { Form, Head, Link } from '@inertiajs/react';
import { LoaderCircle, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { useAppearance } from '@/hooks/use-appearance';

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const [showPassword, setShowPassword] = useState(false);
    const { appearance, updateAppearance } = useAppearance();

    return (
        <>
            <Head title="登入">
                <meta name="description" content="登入圖片管理系統" />
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>
            
            <div className="min-h-screen bg-gradient-to-b from-cyan-200 to-white to-[60vh] dark:from-gray-900 dark:to-gray-800">
                <header className="mb-6 w-full px-6 pt-6">
                    <nav className="flex items-center justify-between">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                            <img src="/images/logo.svg" alt="圖片管理系統" className="h-10 w-10" />
                            <span className="text-xl font-bold text-cyan-800 dark:text-cyan-200">圖片管理系統</span>
                        </Link>
                        
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
                    </nav>
                </header>

                <main className="container mx-auto px-6">
                    <div className="mx-auto max-w-md">
                        {/* 標題區域 */}
                        <div className="mb-8 text-center">
                            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 shadow-lg">
                                <svg className="h-10 w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                </svg>
                            </div>
                            <h1 className="mb-2 text-3xl font-bold text-cyan-800 dark:text-cyan-200">
                                歡迎回來
                            </h1>
                            <p className="text-cyan-600 dark:text-cyan-300">
                                請登入您的帳戶以繼續使用
                            </p>
                        </div>

                        {/* 登入表單 */}
                        <div className="rounded-xl bg-white p-8 shadow-lg ring ring-black/5 dark:bg-gray-800 dark:ring-white/10">
                            <Form
                                {...AuthenticatedSessionController.store.form()}
                                resetOnSuccess={['password']}
                                className="space-y-6"
                            >
                                {({ processing, errors }) => (
                                    <>
                                        {/* 電子郵件欄位 */}
                                        <div className="space-y-2">
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                電子郵件地址
                                            </label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                                                    <Mail className="h-5 w-5 text-gray-400" />
                                                </div>
                                                <input
                                                    id="email"
                                                    type="email"
                                                    name="email"
                                                    required
                                                    autoFocus
                                                    tabIndex={1}
                                                    autoComplete="email"
                                                    placeholder="請輸入您的電子郵件"
                                                    className="w-full rounded-lg border border-gray-300 bg-gray-50 pl-10 pr-4 py-3 text-gray-900 placeholder-gray-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400"
                                                />
                                            </div>
                                            <InputError message={errors.email} />
                                        </div>

                                        {/* 密碼欄位 */}
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                    密碼
                                                </label>
                                                {canResetPassword && (
                                                    <Link
                                                        href={request()}
                                                        className="text-sm text-cyan-600 hover:text-cyan-500 dark:text-cyan-400 dark:hover:text-cyan-300"
                                                        tabIndex={5}
                                                    >
                                                        忘記密碼？
                                                    </Link>
                                                )}
                                            </div>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                                                    <Lock className="h-5 w-5 text-gray-400" />
                                                </div>
                                                <input
                                                    id="password"
                                                    type={showPassword ? 'text' : 'password'}
                                                    name="password"
                                                    required
                                                    tabIndex={2}
                                                    autoComplete="current-password"
                                                    placeholder="請輸入您的密碼"
                                                    className="w-full rounded-lg border border-gray-300 bg-gray-50 pl-10 pr-12 py-3 text-gray-900 placeholder-gray-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                                                >
                                                    {showPassword ? (
                                                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                                    ) : (
                                                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                                    )}
                                                </button>
                                            </div>
                                            <InputError message={errors.password} />
                                        </div>

                                        {/* 記住我選項 */}
                                        <div className="flex items-center space-x-3">
                                            <input
                                                id="remember"
                                                name="remember"
                                                type="checkbox"
                                                tabIndex={3}
                                                className="h-4 w-4 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700"
                                            />
                                            <label htmlFor="remember" className="text-sm text-gray-700 dark:text-gray-300">
                                                記住我
                                            </label>
                                        </div>

                                        {/* 登入按鈕 */}
                                        <button
                                            type="submit"
                                            className="w-full rounded-lg bg-gradient-to-r from-cyan-500 to-cyan-600 px-4 py-3 text-white font-medium hover:from-cyan-600 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 dark:ring-offset-gray-800 transition-all disabled:opacity-50"
                                            tabIndex={4}
                                            disabled={processing}
                                            data-test="login-button"
                                        >
                                            {processing ? (
                                                <div className="flex items-center justify-center gap-2">
                                                    <LoaderCircle className="h-4 w-4 animate-spin" />
                                                    登入中...
                                                </div>
                                            ) : (
                                                '登入'
                                            )}
                                        </button>
                                    </>
                                )}
                            </Form>

                            {/* 註冊連結 */}
                            <div className="mt-6 text-center">
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    還沒有帳戶？{' '}
                                    <Link
                                        href={register()}
                                        className="font-medium text-cyan-600 hover:text-cyan-500 dark:text-cyan-400 dark:hover:text-cyan-300"
                                        tabIndex={5}
                                    >
                                        立即註冊
                                    </Link>
                                </p>
                            </div>

                            {/* 狀態訊息 */}
                            {status && (
                                <div className="mt-4 rounded-lg bg-green-50 p-4 text-center text-sm font-medium text-green-600 dark:bg-green-900/20 dark:text-green-400">
                                    {status}
                                </div>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
