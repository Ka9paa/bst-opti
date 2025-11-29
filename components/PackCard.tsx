import { ImageWithFallback } from './figma/ImageWithFallback';
import { Download, Heart } from 'lucide-react';

interface PackCardProps {
  title: string;
  description: string;
  price: string;
  image: string;
  downloads: string;
  badge?: string;
}

export function PackCard({ title, description, price, image, downloads, badge }: PackCardProps) {
  return (
    <div className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300">
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        <ImageWithFallback 
          src={image} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {badge && (
          <div className="absolute top-3 left-3 bg-purple-600 text-white px-3 py-1 rounded-full text-sm">
            {badge}
          </div>
        )}
        <button className="absolute top-3 right-3 p-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-100">
          <Heart className="w-5 h-5" />
        </button>
      </div>
      
      <div className="p-5">
        <h3 className="mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-4">{description}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-gray-500 text-sm">
            <Download className="w-4 h-4" />
            <span>{downloads}</span>
          </div>
          <div className="text-purple-600">{price}</div>
        </div>
        
        <button className="w-full mt-4 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors">
          Add to Cart
        </button>
      </div>
    </div>
  );
}
