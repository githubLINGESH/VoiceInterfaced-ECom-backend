import { FunctionComponent, useState} from "react";
import Navbar from "../components/navbar";
import ProductTemplate from "../components/ProductTemplate";
import { useParams } from "react-router-dom";
import Products from "../productData";
import '../ProductTemplate.css'
import SideNavbar from "../components/sidenavbar";

type Products = {
  id: number;
  name: string;
  imageSrc: string;
  store: String;
  price: number;
  description: String;
};



type Desktop3Props = {};

const Desktop3: FunctionComponent<Desktop3Props> = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [selectedOption,setSelectedOption] = useState<string | null>(null);
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);

    const handleSelectOption = (selectedOption: string | null) => {
      setSelectedOption(selectedOption);
    };

    const toggleSidebar = () => {
      setIsSidebarVisible(!isSidebarVisible);
  };

  const closeSidebar = () => {
    setIsSidebarVisible(false);
  };

  // Use useParams to get the value of :productId from the URL
  const { productId } = useParams();

  // Fetch the product details based on the productId
  // Assuming you have an array of products, you can filter the product with the matching ID
  const selectedProduct = Products.find(product => product.id.toString() === productId);

  if (!selectedProduct) {
    // Handle the case where no matching product is found
    return <div>Product not found</div>;
  }

  const handleVoiceOption = () =>{
    setIsVoiceOpen(!isVoiceOpen);
  }

  return (
    <div className="relative bg-white w-full h-[1024px] overflow-hidden text-left text-3xl text-darkslategray-100 font-sora">
      <Navbar toggleSidebar={toggleSidebar} handleVoiceOption={handleVoiceOption}/>
        {/* form div */}
        {isSidebarVisible && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeSidebar}
        />
      )}
      <SideNavbar onSelect={handleSelectOption} isVisible={isSidebarVisible} />

      <div className="flex items-center justify-center">
        <ProductTemplate product={selectedProduct} />
      </div>
    </div>

  );
};

export default Desktop3;
