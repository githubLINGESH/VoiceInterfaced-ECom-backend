    import React from 'react';
    import CopyToClipboard from './clipboard';

    const ProductTemplate = ({ product }) => {

    return (
        <div className="absolute top-[84px] left-[68px] w-[1202px] h-[863px]">
        <div className="absolute top-[0px] left-[0px] bg-whitesmoke-100 w-[1202px] h-[863px]"/>
        <div className="absolute top-[36.84px] left-[27.21px] bg-white w-[504.06px] h-[345.65px]" />
        {product.imageSrc ? (
        <img
            className="absolute top-[48.93px] left-[136.69px] h-[321.48px] lg:w-[289.67px] md:w-[210px] sm:w-[160px] object-cover"
            alt=""
            src={product.imageSrc}
        />
        ) : (
        <p>Image not available</p>
        )}

        <b className="absolute top-[54px] left-[600px] text-7xl inline-block w-[454px] h-5">
            {product.name}
        </b>
        <div className="absolute top-[334.15px] left-[50.02px] text-5xl font-semibold inline-block w-[157.38px] h-[24.17px]">
            {product.store}
        </div>
        <img
            className="absolute top-[301px] left-[599.7px] w-[1.3px] h-[74.24px]"
            alt=""
            src="/line-7.svg"
        />
        <div className="absolute top-[301px] left-[600px] w-[469.3px] h-[81px]">
            <img
            className="absolute top-[0px] left-[468.8px] w-px h-[74px]"
            alt=""
            src="/line-8.svg"
            />
            <img
            className="absolute top-[0px] left-[231.3px] w-[1.07px] h-[74.24px]"
            alt=""
            src="/line-71.svg"
            />
            <div className="absolute top-[23px] left-[286.3px] inline-block w-[132px] h-7">
            Add to cart
            </div>
            <div className="absolute top-[0.38px] left-[0.5px] box-border w-[469.3px] h-px border-t-[1px] border-solid border-silver" />
            <img
            className="absolute top-[73px] left-[1px] w-[468.3px] h-[1.12px]"
            alt=""
            src="/line-6.svg"
            />
            <div className="absolute top-[0px] left-[0px] bg-silver w-[232px] h-[74px]" />
            <a href={`${product.link}`}
            style={{
                textDecoration: 'none', // Remove underline
                color: 'inherit', // Inherit text color
                cursor: 'pointer', // Change cursor on hover
            }}>
            <div className="absolute top-[23px] left-[35.3px] inline-block w-[121px] h-[58px]">{`Shop now `}</div>
            </a>
            <img
            className="absolute h-[27.78%] w-[5.33%] top-[32.1%] right-[59.45%] bottom-[40.12%] left-[35.22%] max-w-full overflow-hidden max-h-full"
            alt=""
            src="/vector6.svg"
            />
        </div>
        <a
            href={`tg://msg_url?url=${encodeURIComponent(product.link)}`}
            style={{
                textDecoration: 'none', // Remove underline
                color: 'inherit', // Inherit text color
                cursor: 'pointer', // Change cursor on hover
            }}
            >
        <img
            className="absolute h-[6.72%] w-[4.55%] top-[24.33%] right-[2.1%] bottom-[68.94%] left-[93.34%] max-w-full overflow-hidden max-h-full"
            alt=""
            src="/telegram-icon.svg"
        />
        </a>
        <CopyToClipboard text={product.link} copyIcon="/pixelarticonscopy.svg" />
        <a
        href={`whatsapp://send?text=${product.link}`}
        style={{
            textDecoration: 'none', // Remove underline
            color: 'inherit', // Inherit text color
            cursor: 'pointer', // Change cursor on hover
        }}
        >
        <img
            className="absolute h-[6.7%] w-[4.55%] top-[14.72%] right-[2.1%] bottom-[78.58%] left-[93.34%] max-w-full overflow-hidden max-h-full"
            alt=""
            src="/whatsapp-icon.svg"
        />
        </a>

        <div className="absolute top-[245px] left-[601px] w-[274px] h-[29px] text-7xl text-silver">
            <div className="absolute top-[2px] left-[0px] text-5xl inline-block w-[89px] h-[23px]">
                ₹{product.price}
            </div>
            <img
            className="absolute top-[15.5px] left-[5px] w-[77.06px] h-px"
            alt=""
            src="/line-1.svg"
            />
            <img
            className="absolute h-[62.07%] w-[8.03%] top-[24.14%] right-[55.11%] bottom-[13.79%] left-[36.86%] max-w-full overflow-hidden max-h-full"
            alt=""
            src="/vector7.svg"
            />
            <div className="absolute top-[0px] left-[203px] text-darkslategray-100 inline-block w-[71px] h-[29px]">
            ₹{product.d_price}
            </div>
            <div className="absolute h-[79.31%] w-[27.37%] top-[0%] left-[46.72%] text-red inline-block">
            {product.discount}%
            </div>
        </div>
        <div className="absolute top-[403px] left-[27px] w-[1150px] h-[439px] text-5xl">
            <div className="absolute top-[0px] left-[0px] bg-whitesmoke-100 box-border w-[1150px] h-[439px] border-[1px] border-solid border-silver" />
            <div className="absolute top-[0px] left-[0px] bg-gainsboro w-[1150px] h-[69px]" />
            <div className="absolute top-[20px] left-[30px] inline-block w-[310px] h-[35px]">
            How to buy this product?
            </div>
            <div className="absolute top-[81px] left-[66px] inline-block w-[378px] h-9">
            - Go to Amazon product page:
            </div>
            <div className="absolute top-[295px] left-[66px] text-inherit font-inherit inline-block w-[1054px] h-[113px]">
            <ul className="m-0 pl-[29px]">
                <li className="mb-0">
                <span>
                    Sometimes you may see variation in product price due to
                    “different seller” or “offer ended”.
                </span>
                </li>
            </ul>
            <p className="m-0">&nbsp;</p>
            <ul className="m-0 pl-[29px]">
                <li>
                <span className="text-black">{`Disclosure: `}</span>
                <span>
                    If you purchase something through a deal or link on our site,
                    we may get a small share of the sale.
                </span>
                </li>
            </ul>
            </div>
            <div className="absolute top-[238px] left-[77px] inline-block w-[171px] h-9">
            - Disclaimer:
            </div>
            <img
            className="absolute top-[81px] left-[29px] w-[30px] h-[30px] overflow-hidden"
            alt=""
            src="/oouiarticleredirectltr.svg"
            />
            <div className="absolute top-[137px] left-[60px] text-inherit font-inherit text-black inline-block w-[1054px] h-[113px]">
            <ul className="m-0 pl-[29px]">
                {" "}
                Go to Amazon product page : use this special link to get to the
                product page on Amazon
            </ul>
            </div>
            <div className="absolute top-[219.5px] left-[22.5px] box-border w-[1100px] h-px border-t-[1px] border-solid border-silver" />
        </div>
        <div className="absolute top-[16.48px] left-[563.48px] box-border w-px h-[366.03px] border-r-[1px] border-solid border-silver" />
        <div className="absolute top-[170px] left-[601px] inline-block w-[476px] h-[79px] text-black">
            <b>
            <span>AMAZON</span>
            </b>
            <span className="text-darkslategray-100">
            <b>{` `}</b>
            <span className="font-sora">has</span>
            <span className="font-semibold font-sora">{` `}{product.name}</span>
            <span> Starts @{product.offerPrice} on sale for INR ₹{product.offerPrice} Only</span>
            </span>
        </div>
        <div className="absolute top-[98px] left-[601px] w-[468px] h-[47px] text-black">
            <div className="absolute top-[0px] left-[0px] bg-silver w-[468px] h-[46px]" />
            <div className="absolute top-[13px] left-[138px] inline-block w-[186px] h-[34px]">
            Go to AMAZON
            </div>
        </div>
        </div>
    );
    };

    export default ProductTemplate;
