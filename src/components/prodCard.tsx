import React from "react";

type Product = {
  id: number;
  name: string;
  imageSrc: string;
  store: string;
  price: number;
  d_price: number;
  discount: number;
  description: string;
  link: string;
};

type ProductCardProps = {
  product: Product;
  onProductClick: (product: Product) => void;
  onAddToCartClick: (product: Product) => void;
};

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onProductClick,
  onAddToCartClick,
}) => {
  return (
    <div className="grid sm:col-span-1 items-center m-4">
      <div className="relative w-64 h-80">
        <div className="absolute inset-0 bg-whitesmoke-100 rounded-md" />

        {/* Centered image container */}
        <div className="absolute top-0 left-0 w-full h-[60%] bg-white shadow-[1px_1px_2px_rgba(0,_0,_0,_0.25)_inset] rounded-md flex items-center justify-center overflow-hidden">
          <img
            className="object-contain w-[70%] h-[70%] cursor-pointer z-10"
            src={product.imageSrc}
            alt={product.name}
            onClick={() => onProductClick(product)}
          />
        </div>

        <div className="absolute inset-0 flex flex-col justify-between p-4">
          <div className="z-[99999]">
            <div className="text-red">{product.discount}% off</div>
            <div className="text-black font-bold">₹{product.d_price}</div>
            <div className="text-gray-500 line-through">₹{product.price}</div>
          </div>
          <div className="absolute flex justify-between top-[72%]">
            <a
              className="text-blue-500 underline"
              href={product.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                textDecoration: "none",
                color: "inherit",
                cursor: "pointer",
              }}
            >
              {product.name}
            </a>
          </div>
          <div className="items-center h-6">
            <button
              className="px-2 py-2 text-white rounded-md w-[50%] text-left text-base font-sora h-8"
              style={{ background: "black" }}
              onClick={() => onAddToCartClick(product)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
