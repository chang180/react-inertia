import { type SharedData } from '@/types';
import { Head, usePage, router } from '@inertiajs/react';
import { FavoritesProvider } from '@/contexts/FavoritesContext';
import WelcomeHeader from '@/components/WelcomeHeader';
import UserInfoCard from '@/components/UserInfoCard';
import StatsCard from '@/components/StatsCard';
import SearchCard from '@/components/SearchCard';
import FavoritesCard from '@/components/FavoritesCard';
import ImageGrid from '@/components/ImageGrid';

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
                <FavoritesProvider>
                    <WelcomeHeader />
                    
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
                        
                        <UserInfoCard />

                        <StatsCard 
                            totalImages={images.total}
                            chihiroImages={50}
                        />
                    </div>

                    {/* 搜尋和收藏區域 */}
                    <div className="mb-8 grid gap-8 sm:grid-cols-2">
                        <SearchCard 
                            searchQuery={searchQuery}
                            placeholder="搜尋示範圖片..."
                        />
                        
                        <FavoritesCard 
                            title="我的收藏"
                        />
                    </div>

                    <ImageGrid 
                        images={images.data}
                        total={images.total}
                    />

                    {/* 分頁控制 */}
                    {images.last_page > 1 && (
                        <div className="mt-8">
                            <div className="flex justify-center items-center gap-2">
                                <button
                                    onClick={() => router.get('/', { 
                                        ...(searchQuery && { search: searchQuery }), 
                                        page: images.current_page - 1 
                                    }, { preserveState: true, preserveScroll: true })}
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
                                                ...(searchQuery && { search: searchQuery }), 
                                                page 
                                            }, { preserveState: true, preserveScroll: true })}
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
                                        ...(searchQuery && { search: searchQuery }), 
                                        page: images.current_page + 1 
                                    }, { preserveState: true, preserveScroll: true })}
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
                    </main>
                </FavoritesProvider>
            </div>
        </>
    );
}