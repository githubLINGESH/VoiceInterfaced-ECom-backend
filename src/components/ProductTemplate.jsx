    import React from 'react';
    import CopyToClipboard from './clipboard';

    const ProductTemplate = ({ product }) => {

    return (
        <div className="grid sm:grid-rows-2 bg-whitesmoke-100 w-3/4 h-3/4">
            {/* Product image and pricing */}
            <div className="grid row-span-1 grid-cols-1 md:grid-cols-2">
                {/* Product image */ }
                <div className="m-4 grid col-span-1">
                    <div className="m-4 flex bg-white items-center justify-center">
                        {product.imageSrc ? (
                        <img
                            className="h-[321.48px] lg:w-[289.67px] md:w-[210px] sm:w-[160px] object-cover"
                            alt=""
                            src={product.imageSrc}
                        />
                        ) : (
                        <p>Image not available</p>
                        )}
                        </div>
                </div>
                {/**Products details and pricing */}
                <div className="m-4 grid col-span-1 md:grid-cols-4">
                    <div className="grid col-span-3">
                    <div className="py-4 h-[47px] text-black">
                        <span className="font-semibold font-sora">{product.name}</span>
                        <div className="mt-2 flex justify-center items-center bg-silver h-[46px] rounded ">
                            Go to AMAZON
                        </div>
                    </div>

                    <div className="mt-8 inline-block h-[79px] text-black">
                        <b>
                        <span>AMAZON</span>
                        </b>
                        <span className="text-darkslategray-100">
                        <b>{` `}</b>
                        <span className="font-sora">has</span>
                        <span>{' '}{product.name} on sale for INR ₹{product.d_price} Only</span>
                        </span>
                    </div>

                    <div className="h-[29px] text-7xl text-silver">
                        
                        <div className="text-5xl inline-block relative">
                            ₹{product.price}
                        </div>

                        <div className="px-4 text-red inline-block">
                            <img
                                className="max-w-full overflow-hidden max-h-full"
                                alt=""
                                src="/vector7.svg"
                                />
                                {product.discount}%
                        </div>

                        <div className="text-darkslategray-100 inline-block w-[71px] h-[29px]">
                            ₹{product.d_price}
                        </div>
                    </div>

                    <div className="flex mr-6 rounded text-darkslategray-100">
                        <div className="-m-2 flex items-center mt-4 space-x-0">
                            <a
                                    style={{ textDecoration: "none" }}
                                    href={product.link}
                                    className="flex items-center justify-center space-x-2 text-white px-4 py-2 rounded-l"
                            >
                            <button className="cursor-pointer flex items-center justify-center space-x-2 bg-red-500 text-white px-4 py-2 rounded border-t border-r border-b border-l border-black">
                                    <span className="text-darkslategray-100 text-xl">Shop Now</span>
                                    <img src="/vector11.svg" alt="Shop now" className="w-4 h-4" />
                            </button>
                            </a>
                            <div>
                            <button className="cursor-pointer flex items-center justify-center space-x-2 bg-red text-white px-4 py-2 rounded border-l border-t border-r border-b border-whitesmoke-100">
                                    <span className="text-whitesmoke-100 text-xl">Add To Cart</span>
                            </button>
                            </div>
                        </div>
                        </div>
                    </div>

                    {/**Sharing Options */}
                    <div className="grid col-span-1 m-4">
                    <CopyToClipboard text={product.link} copyIcon="/pixelarticonscopy.svg" />
                    <a
                            href={`tg://msg_url?url=${encodeURIComponent(product.link)}`}
                            style={{
                                textDecoration: 'none', // Remove underline
                                color: 'inherit', // Inherit text color
                                cursor: 'pointer', // Change cursor on hover
                            }}
                            >
                        <img
                            className="max-w-full overflow-hidden max-h-full"
                            alt=""
                            src="/telegram-icon.svg"
                        />
                        </a>
                        <a
                        href={`whatsapp://send?text=${product.link}`}
                        style={{
                            textDecoration: 'none', // Remove underline
                            color: 'inherit', // Inherit text color
                            cursor: 'pointer', // Change cursor on hover
                        }}
                        >
                        <img
                            className="max-w-full overflow-hidden max-h-full"
                            alt=""
                            src="/whatsapp-icon.svg"
                        />
                        </a>
                        </div>
                </div>
            </div>
            <div className="grid row-span-1">
            {/* How to buy this product section */}
            <div className="mt-8 bg-whitesmoke-100 border border-silver p-4">
                <div className="bg-gainsboro w-full py-4">
                    <h2 className="px-2 text-xl">How to buy this product?</h2>
                </div>
                <div className="mt-4">
                    <p className="text-lg">- Go to Amazon product page:</p>
                    <ul className="list-disc list-inside mt-2">
                        <li>
                            <span>Go to Amazon product page : use this special link to get to the product page on Amazon</span>
                        </li>
                        <li>
                            <span>Sometimes you may see variation in product price due to “different seller” or “offer ended”.</span>
                        </li>
                    </ul>
                    <p className="mt-4 text-lg">- Disclaimer:</p>
                    <ul className="list-disc list-inside mt-2">
                        <li>
                            <span className="text-black">{`Disclosure: `}</span>
                            <span>If you purchase something through a deal or link on our site, we may get a small share of the sale.</span>
                        </li>
                    </ul>
                </div>
            </div>
            </div>
    </div>
    );
    };

    export default ProductTemplate;
