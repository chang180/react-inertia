import { type SharedData } from '@/types';
import { usePage, router } from '@inertiajs/react';
import { useFavorites } from '@/contexts/FavoritesContext';

interface Image {
    id: number;
    name: string;
    vibe: string;
    image_path: string;
    liked_by: number[];
}

interface ImageGridProps {
    images: Image[];
    total: number;
}

export default function ImageGrid({ images, total }: ImageGridProps) {
    const { auth } = usePage<SharedData>().props;
    const { favorites, refreshFavorites } = useFavorites();
    
    // 創建收藏 ID 集合，用於快速查找
    const favoriteIds = new Set(favorites.map(fav => fav.id));

    const toggleLike = (imageId: number) => {
        router.patch(`/images/${imageId}/like`, {}, {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                // 觸發收藏狀態刷新
                refreshFavorites();
            }
        });
    };

    return (
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
                        {total} 張圖片
                    </span>
                </div>
            </div>
            
            {/* 圖片網格 */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {images.map((image) => (
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
                                    favoriteIds.has(image.id)
                                        ? 'bg-red-500/90 text-white hover:bg-red-600/90'
                                        : 'bg-white/80 text-gray-600 hover:bg-red-500/90 hover:text-white dark:bg-gray-800/80 dark:text-gray-300'
                                }`}
                            >
                                <svg
                                    className="h-5 w-5"
                                    fill={favoriteIds.has(image.id) ? 'currentColor' : 'none'}
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
                                        favoriteIds.has(image.id)
                                            ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300'
                                            : 'bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-300'
                                    }`}>
                                        {favoriteIds.has(image.id) ? '已收藏' : '未收藏'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
