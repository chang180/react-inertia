import { useFavorites } from '@/contexts/FavoritesContext';

interface StatsCardProps {
    totalImages: number;
    chihiroImages: number;
}

export default function StatsCard({ totalImages, chihiroImages }: StatsCardProps) {
    const { count, loading } = useFavorites();

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-lg bg-white/80 p-4 shadow-md ring ring-black/5 dark:bg-gray-800/80 dark:ring-white/10">
                <div className="text-2xl font-bold text-cyan-700 dark:text-cyan-300">{totalImages}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">示範圖片數</div>
            </div>
            <div className="rounded-lg bg-white/80 p-4 shadow-md ring ring-black/5 dark:bg-gray-800/80 dark:ring-white/10">
                <div className="text-2xl font-bold text-pink-600 dark:text-pink-400">
                    {loading ? (
                        <div className="inline-flex items-center gap-1">
                            <svg className="h-5 w-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                        </div>
                    ) : (
                        count
                    )}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">我的收藏</div>
            </div>
            <div className="rounded-lg bg-white/80 p-4 shadow-md ring ring-black/5 dark:bg-gray-800/80 dark:ring-white/10">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">{chihiroImages}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">千尋圖片</div>
            </div>
        </div>
    );
}
