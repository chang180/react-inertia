import { dashboard, login, register } from '@/routes';
import { type SharedData } from '@/types';
import { Head, Link, usePage, router } from '@inertiajs/react';
import { useState } from 'react';
import { Form } from '@inertiajs/react';
import { useAppearance } from '@/hooks/use-appearance';

interface Image {
    id: number;
    name: string;
    vibe: string;
    image_path: string;
    liked_by: number[];
}

interface WelcomeProps {
    images: {
        data: Image[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    searchQuery?: string;
}

export default function Welcome({ images, searchQuery = '' }: WelcomeProps) {
    const { auth } = usePage<SharedData>().props;
    const [search, setSearch] = useState(searchQuery || '');
    const { appearance, updateAppearance } = useAppearance();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/', { search }, { preserveState: true });
    };

    const toggleLike = (imageId: number) => {
        router.patch(`/images/${imageId}/like`, {}, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    return (
        <>
                <Head title="圖片管理系統">
                    <meta name="description" content="基於 Laravel + Inertia + React 的現代化圖片管理應用" />
                    <meta name="keywords" content="圖片管理, Laravel, Inertia, React, 相簿" />
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
                        {auth.user ? (
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
                <main className="container mx-auto px-6">
                    {/* 標題區域 */}
                    <div className="mb-12 text-center">
                        <div className="mb-6">
                            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 shadow-lg">
                                <img src="/images/logo.svg" alt="Logo" className="h-12 w-12" />
                            </div>
                            <h1 className="mb-4 text-5xl font-bold text-cyan-800 dark:text-cyan-200">
                                圖片管理系統
                            </h1>
                            <p className="mx-auto max-w-2xl text-lg text-cyan-600 dark:text-cyan-300">
                                基於 Laravel + Inertia + React 的現代化圖片管理應用，支援上傳、收藏、搜尋等功能
                            </p>
                        </div>
                        
                        {/* 統計資訊 */}
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                            <div className="rounded-lg bg-white/80 p-4 shadow-md ring ring-black/5 dark:bg-gray-800/80 dark:ring-white/10">
                                <div className="text-2xl font-bold text-cyan-700 dark:text-cyan-300">{images.total}</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">總圖片數</div>
                            </div>
                            <div className="rounded-lg bg-white/80 p-4 shadow-md ring ring-black/5 dark:bg-gray-800/80 dark:ring-white/10">
                                <div className="text-2xl font-bold text-pink-600 dark:text-pink-400">
                                    {images.data.filter((img) => img.liked_by.includes(1)).length}
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">已收藏</div>
                            </div>
                            <div className="rounded-lg bg-white/80 p-4 shadow-md ring ring-black/5 dark:bg-gray-800/80 dark:ring-white/10">
                                <div className="text-2xl font-bold text-green-600 dark:text-green-400">51</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">可用圖片</div>
                            </div>
                        </div>
                    </div>

                    {/* 搜尋和上傳區域 */}
                    <div className="mb-8 grid gap-8 sm:grid-cols-3">
                        {/* 搜尋功能 */}
                        <div className="rounded-xl bg-white p-6 shadow-lg ring ring-black/5 dark:bg-gray-800 dark:ring-white/10">
                            <div className="mb-4 flex items-center gap-2">
                                <svg className="h-5 w-5 text-cyan-600 dark:text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">搜尋圖片</h2>
                            </div>
                            <form onSubmit={handleSearch} className="flex gap-2">
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="搜尋圖片描述..."
                                    className="flex-1 rounded-lg bg-gray-50 px-4 py-2.5 text-gray-900 placeholder-gray-500 ring ring-gray-200 focus:ring-2 focus:ring-cyan-500 focus:outline-none dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400 dark:ring-gray-600"
                                />
                                <button
                                    type="submit"
                                    className="rounded-lg bg-gradient-to-r from-cyan-500 to-cyan-600 px-6 py-2.5 text-white font-medium hover:from-cyan-600 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 dark:ring-offset-gray-800 transition-all"
                                >
                                    搜尋
                                </button>
                            </form>
                        </div>

                        {/* 喜歡的圖片列表 */}
                        <div className="rounded-xl bg-white p-6 shadow-lg ring ring-black/5 dark:bg-gray-800 dark:ring-white/10">
                            <div className="mb-4 flex items-center gap-2">
                                <svg className="h-5 w-5 fill-pink-500 stroke-pink-500" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                            </svg>
                                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">我的收藏</h2>
                                <span className="ml-auto rounded-full bg-pink-100 px-2 py-1 text-xs font-medium text-pink-800 dark:bg-pink-900/20 dark:text-pink-300">
                                    {images.data.filter((img) => img.liked_by.includes(1)).length}
                                    </span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {images.data.filter((img) => img.liked_by.includes(1)).map((image) => (
                                    <div key={image.id} className="group relative flex items-center overflow-hidden rounded-lg bg-gradient-to-r from-pink-50 to-pink-100 shadow-sm ring ring-pink-200 transition-all hover:scale-105 hover:shadow-md dark:from-pink-900/20 dark:to-pink-800/20 dark:ring-pink-800">
                                        <img
                                            height={36}
                                            width={36}
                                            alt={image.name}
                                            className="aspect-square w-9 object-cover"
                                            src={image.image_path}
                                        />
                                        <p className="px-3 text-xs font-medium text-pink-800 truncate max-w-24 dark:text-pink-200">{image.name}</p>
                                        <button
                                            onClick={() => toggleLike(image.id)}
                                            className="h-full border-l border-pink-200 px-2 hover:bg-red-100 group-hover:bg-red-100 dark:border-pink-700 dark:hover:bg-red-900/20"
                                        >
                                            <svg className="h-4 w-4 stroke-pink-500 group-hover:stroke-red-500 dark:stroke-pink-400 dark:group-hover:stroke-red-400" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                                {images.data.filter((img) => img.liked_by.includes(1)).length === 0 && (
                                    <div className="w-full text-center py-4">
                                        <svg className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                        </svg>
                                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">還沒有收藏任何圖片</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* 上傳表單 */}
                        <div className="rounded-xl bg-white p-6 shadow-lg ring ring-black/5 dark:bg-gray-800 dark:ring-white/10">
                            <div className="mb-4 flex items-center gap-2">
                                <svg className="h-5 w-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">上傳新圖片</h2>
                            </div>
                            <Form
                                action="/images"
                                method="post"
                                encType="multipart/form-data"
                                className="space-y-4"
                            >
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        圖片名稱
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        required
                                        placeholder="輸入圖片名稱..."
                                        className="mt-1 w-full rounded-lg bg-gray-50 px-4 py-2.5 text-gray-900 placeholder-gray-500 ring ring-gray-200 focus:ring-2 focus:ring-cyan-500 focus:outline-none dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400 dark:ring-gray-600"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="vibe" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        圖片描述
                                    </label>
                                    <input
                                        type="text"
                                        name="vibe"
                                        id="vibe"
                                        required
                                        placeholder="輸入圖片描述..."
                                        className="mt-1 w-full rounded-lg bg-gray-50 px-4 py-2.5 text-gray-900 placeholder-gray-500 ring ring-gray-200 focus:ring-2 focus:ring-cyan-500 focus:outline-none dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400 dark:ring-gray-600"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="image" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        選擇圖片
                                    </label>
                                    <input
                                        type="file"
                                        name="image"
                                        id="image"
                                        accept="image/*"
                                        required
                                        className="mt-1 w-full rounded-lg bg-gray-50 px-4 py-2.5 text-gray-900 ring ring-gray-200 focus:ring-2 focus:ring-cyan-500 focus:outline-none dark:bg-gray-700 dark:text-gray-100 dark:ring-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-cyan-50 file:text-cyan-700 hover:file:bg-cyan-100 dark:file:bg-cyan-900/20 dark:file:text-cyan-300"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full rounded-lg bg-gradient-to-r from-green-500 to-green-600 px-4 py-2.5 text-white font-medium hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:ring-offset-gray-800 transition-all"
                                >
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                        </svg>
                                        上傳圖片
                                    </span>
                                </button>
                            </Form>
                        </div>
                    </div>

                    {/* 圖片列表 */}
                    <div className="rounded-xl bg-white p-6 shadow-lg ring ring-black/5 dark:bg-gray-800 dark:ring-white/10">
                        <div className="mb-6 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <svg className="h-5 w-5 text-cyan-600 dark:text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                                    圖片列表
                                </h2>
                                <span className="rounded-full bg-cyan-100 px-2 py-1 text-xs font-medium text-cyan-800 dark:bg-cyan-900/20 dark:text-cyan-300">
                                    {images.total} 張圖片
                                </span>
                            </div>
                        </div>
                        
                        {/* 圖片網格 */}
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {images.data.map((image) => (
                                <div
                                    key={image.id}
                                    className="group overflow-hidden rounded-xl bg-white shadow-lg ring ring-black/5 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 dark:bg-gray-700 dark:ring-white/10"
                                >
                                    <div className="relative overflow-hidden">
                                        <img
                                            className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                            alt={image.name}
                                            src={image.image_path}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                                        <button
                                            onClick={() => toggleLike(image.id)}
                                            className={`absolute top-3 right-3 rounded-full p-2 backdrop-blur-sm transition-all duration-200 ${
                                                image.liked_by.includes(1)
                                                    ? 'bg-red-500/90 text-white hover:bg-red-600/90'
                                                    : 'bg-white/80 text-gray-600 hover:bg-red-500/90 hover:text-white dark:bg-gray-800/80 dark:text-gray-300'
                                            }`}
                                        >
                                            <svg
                                                className="h-5 w-5"
                                                fill={image.liked_by.includes(1) ? 'currentColor' : 'none'}
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                >
                                    <path
                                                    strokeLinecap="round"
                                        strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                                />
                            </svg>
                                        </button>
                                    </div>
                                    <div className="p-4">
                                        <div className="flex items-start justify-between gap-2">
                                            <div className="flex-1 min-w-0">
                                                <p className="font-semibold text-gray-900 truncate dark:text-gray-100">{image.name}</p>
                                                <p className="text-sm text-gray-500 truncate dark:text-gray-400">{image.vibe}</p>
                                            </div>
                                            <div className="flex-shrink-0">
                                                <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                                                    image.liked_by.includes(1)
                                                        ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300'
                                                        : 'bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-300'
                                                }`}>
                                                    {image.liked_by.includes(1) ? '已收藏' : '未收藏'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* 分頁控制 */}
                        {images.last_page > 1 && (
                            <div className="mt-8">
                                <div className="flex justify-center items-center gap-2">
                                    <button
                                        onClick={() => router.get('/', { 
                                            ...(search && { search }), 
                                            page: images.current_page - 1 
                                        }, { preserveState: true })}
                                        disabled={images.current_page === 1}
                                        className="flex items-center gap-2 rounded-lg px-4 py-2 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white font-medium hover:from-cyan-600 hover:to-cyan-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all"
                                    >
                                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                        </svg>
                                        上一頁
                                    </button>
                                    
                                    <div className="flex gap-1">
                                        {Array.from({ length: images.last_page }, (_, i) => i + 1).map(page => (
                                            <button
                                                key={page}
                                                onClick={() => router.get('/', { 
                                                    ...(search && { search }), 
                                                    page 
                                                }, { preserveState: true })}
                                                className={`px-3 py-2 rounded-lg font-medium transition-all ${
                                                    images.current_page === page 
                                                        ? 'bg-gradient-to-r from-cyan-600 to-cyan-700 text-white shadow-lg' 
                                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-600 dark:text-gray-300 dark:hover:bg-gray-500'
                                                }`}
                                            >
                                                {page}
                                            </button>
                                        ))}
                                    </div>
                                    
                                    <button
                                        onClick={() => router.get('/', { 
                                            ...(search && { search }), 
                                            page: images.current_page + 1 
                                        }, { preserveState: true })}
                                        disabled={images.current_page === images.last_page}
                                        className="flex items-center gap-2 rounded-lg px-4 py-2 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white font-medium hover:from-cyan-600 hover:to-cyan-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all"
                                    >
                                        下一頁
                                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        )}
                        
                        {/* 顯示當前頁面資訊 */}
                        <div className="mt-6 text-center">
                            <div className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-sm text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                                顯示第 {((images.current_page - 1) * images.per_page) + 1} - {Math.min(images.current_page * images.per_page, images.total)} 張，共 {images.total} 張圖片
                            </div>
                        </div>
                        </div>
                    </main>
            </div>
        </>
    );
}