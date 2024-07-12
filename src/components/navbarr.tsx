import React from 'react';
    import { useNavigate } from 'react-router-dom';

    export default function Navbarr() {
        const navigate = useNavigate();
        function handleHelpClick() {
            navigate('/desktop-4');
            }

            function handleCartClick(){
                navigate('/desktop-2');
            }
        
    return (
        <div className="absolute top-[0px] left-[0px] w-[1460px] h-[175px]">
            <div className="absolute top-[0px] left-[0px] bg-darkslategray-100 shadow-[0px_4px_10px_rgba(0,_0,_0,_0.25)] w-[1440px] h-28" />
            <div className="absolute top-[41px] left-[881px] font-light inline-block w-[130px] h-[34px]"
            onClick={handleCartClick}>
            CART
            </div>
            <img
            className="absolute h-[25.71%] w-[3.49%] top-[20%] right-[40.48%] bottom-[54.29%] left-[56.03%] max-w-full overflow-hidden max-h-full"
            onClick={handleCartClick}
            alt=""
            src="/vector.svg"
            />
            <div className="absolute top-[28px] left-[290px] w-[493px] h-[54px]">
            <input
                    type="text"
                    className="absolute top-[0px] left-[-1px] rounded-8xs bg-white shadow-[2px_4px_4px_1px_rgba(0,_0,_0,_0.25)_inset] box-border w-[494px] h-[54px] border-l-[1px] border-solid border-darkslategray-100 h-28 text-11xl text-white font-inter"
                    placeholder='search items'
                />
            <div className="absolute top-[0px] left-[435px] rounded-tl-none rounded-tr-8xs rounded-br-8xs rounded-bl-none bg-whitesmoke-100 w-[57px] h-[54px]" />
            <img
                className="absolute h-[56.67%] w-[6.57%] top-[21.67%] right-[2.6%] bottom-[21.67%] left-[90.83%] max-w-full overflow-hidden max-h-full"
                alt=""
                src="/vector1.svg"
            />
            </div>
            <div className="absolute top-[32px] left-[1121px] w-[339px] h-12 text-whitesmoke-100">
            <img
                className="absolute top-[0px] left-[143px] rounded-3xl w-[123px] h-12"
                alt=""
                src="/rectangle-4.svg"
            />
            <img
                className="absolute h-[93.75%] w-[15.04%] top-[4.17%] right-[62.83%] bottom-[2.08%] left-[22.12%] max-w-full overflow-hidden max-h-full"
                onClick={handleHelpClick}
                alt=""
                src="/vector2.svg"
            />
            <div className="absolute h-full w-[15.04%] top-[0%] right-[44.25%] bottom-[0%] left-[40.71%] rounded-[50%] bg-whitesmoke-100" />
            <img
                className="absolute h-[58.33%] top-[18.75%] right-[159px] bottom-[22.92%] max-h-full w-7"
                alt=""
                src="/vector3.svg"
            />
            <div className="absolute top-[5px] left-[0px] font-light inline-block w-[150px] h-10"
            onClick={handleHelpClick}>
                Help
            </div>
            <div className="absolute top-[4px] left-[189px] font-light text-darkslategray-100 inline-block w-[150px] h-10 [-webkit-text-stroke:1px_#ecf0f1]">
                user
            </div>
            </div>
            <img
            className="absolute h-[25.71%] w-[3.49%] top-[18.29%] right-[24.11%] bottom-[56%] left-[72.4%] max-w-full overflow-hidden max-h-full"
            alt=""
            src="/vector4.svg"
            />
            <div className="absolute top-[112px] left-[0px] w-[1440px] h-[63px] text-black font-sora">
            <div className="absolute top-[0px] left-[0px] bg-silver w-[1440px] h-[63px]" />
            <div className="absolute top-[13px] left-[643px] font-light inline-block w-[189px] h-[38px]">
                Terms of use
            </div>
            <div className="absolute top-[13px] left-[442px] font-light inline-block w-[189px] h-[38px]">
                Disclaimer
            </div>
            <div className="absolute top-[13px] left-[869px] font-light inline-block w-[315px] h-[38px]">
                Affiliate Disclosure
            </div>
            <div className="absolute top-[0px] left-[250px] bg-whitesmoke-200 w-[162px] h-[63px]" />
            <div className="absolute top-[13px] left-[282px] font-light inline-block w-[189px] h-[43px]">
                About
            </div>
            <div className="absolute top-[54px] left-[250px] bg-darkslategray-100 w-[162px] h-[9px]" />
            </div>
            <img
            className="absolute top-[28px] left-[40px] w-[158px] h-[75px] object-cover"
            alt=""
            src="/plugin-icon--1-1-1@2x.png"
            />
        </div>
    );
    }