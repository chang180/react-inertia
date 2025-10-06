import { Form } from '@inertiajs/react';

interface UploadCardProps {
    action?: string;
    method?: string;
    title?: string;
    showTitle?: boolean;
    className?: string;
}

export default function UploadCard({ 
    action = '/images',
    method = 'post',
    title = '上傳新圖片',
    showTitle = true,
    className = ''
}: UploadCardProps) {
    return (
        <div className={`rounded-xl bg-white p-6 shadow-lg ring ring-black/5 dark:bg-gray-800 dark:ring-white/10 ${className}`}>
            {showTitle && (
                <div className="mb-4 flex items-center gap-2">
                    <svg className="h-5 w-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{title}</h2>
                </div>
            )}
            <Form
                action={action}
                method={method}
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
    );
}
