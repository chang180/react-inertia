import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

interface Image {
    id: number;
    name: string;
    vibe: string;
    image_path: string;
    liked_by: number[];
}

interface FavoritesData {
    favorites: Image[];
    count: number;
}

interface FavoritesContextType {
    favorites: Image[];
    count: number;
    loading: boolean;
    refreshFavorites: () => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

interface FavoritesProviderProps {
    children: ReactNode;
}

export function FavoritesProvider({ children }: FavoritesProviderProps) {
    const [favorites, setFavorites] = useState<Image[]>([]);
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(true);

    const fetchFavorites = useCallback(async () => {
        try {
            setLoading(true);
            const response = await fetch('/images/favorites');
            const data: FavoritesData = await response.json();
            setFavorites(data.favorites || []);
            setCount(data.count || 0);
            setLoading(false);
        } catch (error) {
            console.error('獲取收藏列表失敗:', error);
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchFavorites();
    }, [fetchFavorites]);

    const refreshFavorites = useCallback(() => {
        fetchFavorites();
    }, [fetchFavorites]);

    return (
        <FavoritesContext.Provider value={{
            favorites,
            count,
            loading,
            refreshFavorites
        }}>
            {children}
        </FavoritesContext.Provider>
    );
}

export function useFavorites() {
    const context = useContext(FavoritesContext);
    if (context === undefined) {
        throw new Error('useFavorites must be used within a FavoritesProvider');
    }
    return context;
}
