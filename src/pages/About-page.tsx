import { FunctionComponent } from "react";
import Navbarr from "../components/navbarr";

const AboutPage: FunctionComponent = () => {
  return (
    <div className="relative bg-white w-full h-[1024px] overflow-hidden text-left text-11xl text-white font-inter">
    <Navbarr/>
      <div className="absolute top-[212px] left-[119px] w-[1202px] h-[759px] text-3xl text-black font-sora">
        <div className="absolute top-[0px] left-[0px] bg-whitesmoke-200 w-[1202px] h-[759px]" />
        <div className="absolute top-[89px] left-[68px] font-light inline-block w-[1117px] h-[100px]">{`dash is a one stop platform of Loots, Deals, Offers and Coupons in the world of online shopping. With Roobai.com, rest assured, you will get the most updated coupons and offers present online. We try our best to remain updated & serve our customers to avail all the time.`}</div>
        <div className="absolute top-[212px] left-[37px] text-7xl font-semibold text-darkslategray-100 inline-block w-[293px] h-[30px]">
          What We Do?
        </div>
        <div className="absolute top-[265px] left-[65px] font-light whitespace-pre-wrap inline-block w-[1102px] h-[341px]">
          <p className="m-0">{`The answer is pretty simple; we help people save money online. We search for the best deals and offers across various sections of the retailing industry and present them to our shoppers. This is turn help them to make better shopping decisions and save more using our deals and offers. `}</p>
          <p className="m-0">&nbsp;</p>
          <p className="m-0">
            We understand the essence of saving money and that is why we do not
            let our grip lose in our dedication, persistence and perseverance to
            find the best to be the best Whether you are looking for lowest
            prices or discount coupons, whether it’s about availing freebies or
            contest giveaways, we are providing it all at one place.
          </p>
          <p className="m-0">&nbsp;</p>
          <p className="m-0">{`With  application you can get best offers & deals from top online shopping sites like Amazon.Accessing  is quick and ad-free with less app memory and lot of notifications through Telegram, WhatsApp.`}</p>
        </div>
        <b className="absolute top-[26px] left-[37px] text-[38px] inline-block text-darkslategray-100 w-[221px] h-[50px]">{`About `}</b>
      </div>
    </div>
  );
};

export default AboutPage;
