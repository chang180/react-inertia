import { router } from '@inertiajs/react';
import { useFavorites } from '@/contexts/FavoritesContext';

interface FavoritesCardProps {
    title?: string;
    showCount?: boolean;
}

export default function FavoritesCard({ 
    title = '我的收藏',
    showCount = true
}: FavoritesCardProps) {
    const { favorites, loading, refreshFavorites } = useFavorites();

    const toggleLike = (imageId: number) => {
        router.patch(`/images/${imageId}/like`, {}, {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                // 重新獲取收藏列表
                refreshFavorites();
            }
        });
    };

    return (
        <div className="rounded-xl bg-white p-6 shadow-lg ring ring-black/5 dark:bg-gray-800 dark:ring-white/10">
            <div className="mb-4 flex items-center gap-2">
                <svg className="h-5 w-5 fill-pink-500 stroke-pink-500" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{title}</h2>
                {showCount && (
                    <span className="ml-auto rounded-full bg-pink-100 px-2 py-1 text-xs font-medium text-pink-800 dark:bg-pink-900/20 dark:text-pink-300">
                        {favorites.length}
                    </span>
                )}
            </div>
            <div className="flex flex-wrap gap-2">
                {loading ? (
                    <div className="w-full text-center py-4">
                        <div className="inline-flex items-center gap-2 text-gray-500 dark:text-gray-400">
                            <svg className="h-4 w-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            載入收藏中...
                        </div>
                    </div>
                ) : (
                    <>
                        {favorites.map((image) => (
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
                        {favorites.length === 0 && (
                            <div className="w-full text-center py-4">
                                <svg className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">還沒有收藏任何圖片</p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
