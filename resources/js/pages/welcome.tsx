import { dashboard, login, register } from '@/routes';
import { type SharedData } from '@/types';
import { Head, Link, usePage, router } from '@inertiajs/react';
import { useState } from 'react';
import { Form } from '@inertiajs/react';

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
    const [search, setSearch] = useState(searchQuery);

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
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>
            <div className="min-h-screen bg-gradient-to-b from-cyan-200 to-white to-[60vh]">
                <header className="mb-6 w-full px-6 pt-6">
                    <nav className="flex items-center justify-end gap-4">
                        {auth.user ? (
                            <Link
                                href={dashboard()}
                                className="inline-block rounded-sm border border-cyan-300 px-5 py-1.5 text-sm leading-normal text-cyan-700 hover:border-cyan-400"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={login()}
                                    className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-cyan-700 hover:border-cyan-300"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={register()}
                                    className="inline-block rounded-sm border border-cyan-300 px-5 py-1.5 text-sm leading-normal text-cyan-700 hover:border-cyan-400"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </nav>
                </header>
                <main className="container mx-auto px-6">
                    {/* 標題區域 */}
                    <div className="mb-8 text-center">
                        <h1 className="mb-4 text-4xl font-bold text-cyan-800">
                            圖片管理系統
                        </h1>
                        <p className="text-lg text-cyan-600">
                            基於 Laravel + Inertia + React 的現代化圖片管理應用
                        </p>
                    </div>

                    {/* 搜尋和上傳區域 */}
                    <div className="mb-8 grid gap-8 sm:grid-cols-2">
                        {/* 搜尋功能 */}
                        <div className="rounded-lg bg-white p-6 shadow-md ring ring-black/5">
                            <h2 className="mb-4 text-lg font-semibold text-gray-800">搜尋圖片</h2>
                            <form onSubmit={handleSearch} className="flex gap-2">
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="搜尋圖片描述..."
                                    className="flex-1 rounded-sm bg-white px-3 py-2 ring ring-black/20 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                                />
                                <button
                                    type="submit"
                                    className="rounded-sm bg-cyan-500 px-4 py-2 text-white hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                >
                                    搜尋
                                </button>
                            </form>
                        </div>

                        {/* 上傳表單 */}
                        <div className="rounded-lg bg-white p-6 shadow-md ring ring-black/5">
                            <h2 className="mb-4 text-lg font-semibold text-gray-800">上傳新圖片</h2>
                            <Form
                                action="/images"
                                method="post"
                                encType="multipart/form-data"
                                className="space-y-4"
                            >
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                        圖片名稱
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        required
                                        className="mt-1 w-full rounded-sm bg-white px-3 py-2 ring ring-black/20 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="vibe" className="block text-sm font-medium text-gray-700">
                                        圖片描述
                                    </label>
                                    <input
                                        type="text"
                                        name="vibe"
                                        id="vibe"
                                        required
                                        className="mt-1 w-full rounded-sm bg-white px-3 py-2 ring ring-black/20 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                                        選擇圖片
                                    </label>
                                    <input
                                        type="file"
                                        name="image"
                                        id="image"
                                        accept="image/*"
                                        required
                                        className="mt-1 w-full rounded-sm bg-white px-3 py-2 ring ring-black/20 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full rounded-sm bg-cyan-500 px-4 py-2 text-white hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                >
                                    上傳圖片
                                </button>
                            </Form>
                        </div>
                    </div>

                    {/* 圖片列表 */}
                    <div className="rounded-lg bg-white p-6 shadow-md ring ring-black/5">
                        <h2 className="mb-6 text-lg font-semibold text-gray-800">
                            圖片列表 ({images.total} 張圖片)
                        </h2>
                        
                        {/* 圖片網格 */}
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {images.data.map((image) => (
                                <div
                                    key={image.id}
                                    className="overflow-hidden rounded-lg bg-white shadow-md ring ring-black/5 hover:-translate-y-0.5 transition-transform"
                                >
                                    <img
                                        className="aspect-square w-full object-cover"
                                        alt={image.name}
                                        src={image.image_path}
                                    />
                                    <div className="flex items-center justify-between p-4 text-sm">
                                        <div className="flex items-center gap-2">
                                            <p className="font-semibold">{image.name}</p>
                                            <span className="text-slate-300">·</span>
                                            <p className="text-slate-500">{image.vibe}</p>
                                        </div>
                                        <button
                                            onClick={() => toggleLike(image.id)}
                                            className={`rounded-full p-1 transition-colors ${
                                                image.liked_by.includes(1) // 假設用戶 ID 為 1
                                                    ? 'text-red-500 hover:text-red-600'
                                                    : 'text-gray-400 hover:text-red-500'
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
                                </div>
                            ))}
                        </div>

                        {/* 分頁控制 */}
                        {images.last_page > 1 && (
                            <div className="mt-6 flex justify-center items-center gap-2">
                                <button
                                    onClick={() => router.get('/', { 
                                        ...(search && { search }), 
                                        page: images.current_page - 1 
                                    }, { preserveState: true })}
                                    disabled={images.current_page === 1}
                                    className="px-3 py-1 rounded bg-cyan-500 text-white disabled:bg-gray-300 disabled:cursor-not-allowed"
                                >
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
                                            className={`px-3 py-1 rounded ${
                                                images.current_page === page 
                                                    ? 'bg-cyan-700 text-white' 
                                                    : 'bg-cyan-100 hover:bg-cyan-200'
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
                                    className="px-3 py-1 rounded bg-cyan-500 text-white disabled:bg-gray-300 disabled:cursor-not-allowed"
                                >
                                    下一頁
                                </button>
                            </div>
                        )}
                        
                        {/* 顯示當前頁面資訊 */}
                        <div className="mt-4 text-sm text-gray-500 text-center">
                            顯示第 {((images.current_page - 1) * images.per_page) + 1} - {Math.min(images.current_page * images.per_page, images.total)} 張，共 {images.total} 張圖片
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}