import { FunctionComponent } from "react";

const Userinfo: FunctionComponent = () => {
  return (
    <div className="relative bg-white w-full h-[418px] overflow-hidden text-left text-5xl text-darkslategray-100 font-sora">
      <div className="absolute top-[21px] left-[36px] w-[356px] h-[367px]">
        <img
          className="absolute top-[0px] left-[135px] w-[86px] h-[68px] overflow-hidden"
          alt=""
          src="/iconparktwotonepeople.svg"
        />
        <div className="absolute top-[198px] left-[0px] font-light inline-block w-[126px] h-[23px]">{`EMAIL `}</div>
        <div className="absolute top-[236px] left-[0px] rounded-lg bg-whitesmoke-100 box-border w-[356px] h-[47px] border-[1px] border-solid border-darkslategray-300" />
        <div className="absolute top-[317px] left-[92px] rounded-[20px] bg-darkslategray-200 w-[171px] h-[50px]" />
        <div className="absolute top-[246px] left-[22px] text-xl font-light inline-block w-[262px] h-[27px]">
          Emailll@123
        </div>
        <div className="absolute top-[326px] left-[130px] text-7xl font-light text-white inline-block w-[145px] h-8">
          Logout
        </div>
        <div className="absolute top-[131px] left-[0px] rounded-lg bg-whitesmoke-100 box-border w-[356px] h-[47px] border-[1px] border-solid border-darkslategray-300" />
        <div className="absolute top-[93px] left-[0px] font-light inline-block w-[198px] h-[23px]">
          USER NAME
        </div>
        <div className="absolute top-[141px] left-[22px] text-xl font-light inline-block w-[262px] h-[27px]">
          userrr
        </div>
      </div>
    </div>
  );
};

export default Userinfo;
