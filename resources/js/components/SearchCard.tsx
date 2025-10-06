import { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';

interface SearchCardProps {
    searchQuery?: string;
    placeholder?: string;
    onSearch?: (query: string) => void;
}

export default function SearchCard({ 
    searchQuery = '', 
    placeholder = '搜尋圖片描述...',
    onSearch 
}: SearchCardProps) {
    const [search, setSearch] = useState(searchQuery || '');
    const [isSearching, setIsSearching] = useState(false);

    // 即時搜尋功能
    useEffect(() => {
        if (search.trim() === '') {
            setIsSearching(false);
            return;
        }

        setIsSearching(true);
        const timeoutId = setTimeout(() => {
            if (onSearch) {
                onSearch(search);
            } else {
                router.get('/', { search }, { 
                    preserveState: true, 
                    preserveScroll: true,
                    replace: true, // 使用 replace 避免歷史記錄堆積
                    onFinish: () => setIsSearching(false)
                });
            }
        }, 500); // 500ms 延遲，避免過於頻繁的請求

        return () => clearTimeout(timeoutId);
    }, [search, onSearch]);

    const handleClear = () => {
        setSearch('');
        setIsSearching(false);
        // 清除搜尋時也要觸發搜尋
        if (onSearch) {
            onSearch('');
        } else {
            router.get('/', {}, { 
                preserveState: true, 
                preserveScroll: true,
                replace: true
            });
        }
    };

    return (
        <div className="rounded-xl bg-white p-6 shadow-lg ring ring-black/5 dark:bg-gray-800 dark:ring-white/10">
            <div className="mb-4 flex items-center gap-2">
                <svg className="h-5 w-5 text-cyan-600 dark:text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">搜尋圖片</h2>
            </div>
            <div className="relative">
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder={placeholder}
                    className={`w-full rounded-lg bg-gray-50 px-4 py-2.5 text-gray-900 placeholder-gray-500 ring ring-gray-200 focus:ring-2 focus:ring-cyan-500 focus:outline-none dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400 dark:ring-gray-600 ${
                        search ? 'pr-12' : 'pr-4'
                    }`}
                />
                {search && (
                    <button
                        type="button"
                        onClick={handleClear}
                        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-gray-400 hover:bg-gray-200 hover:text-gray-600 dark:hover:bg-gray-600 dark:hover:text-gray-300 transition-colors"
                        title="清除搜尋"
                    >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                )}
            </div>
            {search && (
                <div className="mt-2 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    {isSearching ? (
                        <>
                            <svg className="h-4 w-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            搜尋中...
                        </>
                    ) : (
                        <>
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            搜尋完成
                        </>
                    )}
                </div>
            )}
        </div>
    );
}
