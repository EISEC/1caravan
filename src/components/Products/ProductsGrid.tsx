import React from 'react';
import ProductCard from './ProductCard';

interface Product {
    id: string;
    title: string;
    img: string;
    price?: string;
    description?: string;
    slug?: string;
    category?: string;
    status?: string;
}

interface ProductsGridProps {
    products: Product[];
    title?: string;
    subtitle?: string;
}

const ProductsGrid: React.FC<ProductsGridProps> = ({ products, title, subtitle }) => {
    if (!products || products.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="text-gray-500 text-lg">
                    Товары не найдены
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Заголовок секции */}
            {(title || subtitle) && (
                <div className="text-center mb-8">
                    {title && (
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            {title}
                        </h2>
                    )}
                    {subtitle && (
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            {subtitle}
                        </p>
                    )}
                </div>
            )}

            {/* Сетка товаров */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            {/* Информация о количестве товаров */}
            <div className="text-center mt-8 text-gray-600">
                Показано {products.length} товаров
            </div>
        </div>
    );
};

export default ProductsGrid;
