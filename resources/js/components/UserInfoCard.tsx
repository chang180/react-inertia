import { type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';

export default function UserInfoCard() {
    const { auth } = usePage<SharedData>().props;

    return (
        <div className="mb-6 rounded-lg bg-white/80 p-4 shadow-md ring ring-black/5 dark:bg-gray-800/80 dark:ring-white/10">
            <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600">
                    <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                </div>
                <div>
                    <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold text-cyan-800 dark:text-cyan-200">
                            {auth.user?.name || '示範訪客'}
                        </h3>
                        {auth.user?.role === 'guest' && (
                            <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900/20 dark:text-blue-300">
                                示範模式
                            </span>
                        )}
                    </div>
                    <p className="text-sm text-cyan-600 dark:text-cyan-300">
                        {auth.user?.role === 'guest' 
                            ? '您正在使用示範模式，可以體驗所有功能' 
                            : '歡迎使用圖片管理系統'
                        }
                    </p>
                </div>
            </div>
        </div>
    );
}
