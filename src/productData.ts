    type Product = {
        id: number;
        name: string;
        imageSrc: string;
        store: String,
        price: number,
        description: String,
        link:String
    };
    
        // Define your product data here as an array
        const Products = [
        {
            id: 1,
            name: "boAt Smartwatches Starts @999",
            imageSrc: "https://res.cloudinary.com/dwmz05ivk/image/upload/v1702021706/Ecommerce/Today%20Offers/ntqwhdzollqpge2bnfjy.png",
            store: "Amazon",
            price: 5999,
            d_price: 999,
            discount : 80,
            description: "Description of Product 1",
            link:"https://www.amazon.in/dp/B0BX43SC5F/ref=cm_sw_r_as_gl_apa_gl_i_4NW58F56RCN4H08PW59C?linkCode=ml2&tag=mystore1060a-21"
        },
        {
            id: 2,
            name: 'Laptop Stand @199.',
            imageSrc: 'https://res.cloudinary.com/dwmz05ivk/image/upload/v1702021706/Ecommerce/Today%20Offers/rebtgre9lglluvy6e9ou.png',
            store: "Amazon",
            price: 499,
            d_price: 199,
            discount : 65,
            description: "Description of Product 2",
            link:"https://www.amazon.in/dp/B07DGD4Z4C/ref=cm_sw_r_as_gl_apa_gl_i_dl_9QWVNEB6ZX34EDESKP8R?linkCode=ml2&tag=mystore1060a-21"
        },
        {
            id: 3,
            name: "Premium 750 Watt Mixer-Grinder",
            imageSrc: "https://res.cloudinary.com/dwmz05ivk/image/upload/v1702021707/Ecommerce/Today%20Offers/xse6r6dfqab3y3vv9wgg.png",
            store: "Amazon",
            price: 4999,
            d_price:2399,
            discount : 52,
            description: "Description of Product 3",
            link:"https://www.amazon.in/dp/B07DGD4Z4C/ref=cm_sw_r_as_gl_apa_gl_i_dl_9QWVNEB6ZX34EDESKP8R?linkCode=ml2&tag=mystore1060a-21"
        },
        {
            id: 4,
            name: "Oreole Amaze Ultra High Speed 24 Inch",
            imageSrc: "https://res.cloudinary.com/dwmz05ivk/image/upload/v1702021707/Ecommerce/Today%20Offers/hmsml8llp1jrpol5npmq.png",
            store: "Amazon",
            price: 2490,
            d_price : 1399,
            discount : 40,
            description: "Description of Product 4",
            link:"https://www.amazon.in/dp/B0BHTHWPJX/ref=cm_sw_r_as_gl_apa_gl_i_dl_48DX43DJXRKV27TPQY8R?linkCode=ml2&tag=mystore1060a-21"
        },
        {
            id: 5,
            name: "Spin Mop Bucket with Pully",
            imageSrc: "https://res.cloudinary.com/dwmz05ivk/image/upload/v1702021707/Ecommerce/Today%20Offers/nsqqyld1hlwniojz8ubf.png",
            store: "Amazon",
            price: 1349,
            d_price: 999,
            discount : 60,
            description: "Description of Product 4",
            link:"https://www.amazon.in/dp/B0877JGJLP/ref=cm_sw_r_as_gl_apa_gl_i_dl_76QFAZ9RB55K4J61B18J?linkCode=ml2&tag=mystore1060a-21"
        },
        {
            id: 6,
            name: "aadi Synthetic |Lightweight|Comfort",
            imageSrc: "https://res.cloudinary.com/dwmz05ivk/image/upload/v1702021707/Ecommerce/Today%20Offers/vvxbtxap0bx8l2adcaoa.png",
            store: "Amazon",
            price: 1999,
            d_price: 899,
            discount : 55,
            description: "Description of Product 4",
            link:"https://www.amazon.in/dp/B077MZ785Q/ref=cm_sw_r_as_gl_apa_gl_i_BWD65BEVR7YWCVY2Z2JW?linkCode=ml2&tag=mystore1060a-21"
        },
        {
            id: 7,
            name: "ASIAN Men's Super Shoes START @476",
            imageSrc: "https://res.cloudinary.com/dwmz05ivk/image/upload/v1702021707/Ecommerce/Today%20Offers/uveal8tdee6hkptxuyv2.png",
            store: "Amazon",
            price: 1299,
            d_price: 679,
            discount : 48,
            description: "Description of Product 4",
            link:"https://www.amazon.in/dp/B0CFXY2B5R/ref=cm_sw_r_as_gl_apa_gl_i_DJ9ZBTG3FWA43STAGMC4?linkCode=ml2&tag=mystore1060a-21"
        },
        {
            id: 8,
            name: "Textured PU Leather Stylish Duffle Bags",
            imageSrc: "https://res.cloudinary.com/dwmz05ivk/image/upload/v1702021707/Ecommerce/Today%20Offers/jn8ihhqek0kkw40l9d2i.png",
            store: "Amazon",
            price: 1500,
            d_price: 839,
            discount : 45,
            description: "Description of Product 8",
            link:"https://www.amazon.in/dp/B0BVC227W1/ref=cm_sw_r_as_gl_apa_gl_i_H2NB8GTFM6XBZFHRXM1K?linkCode=ml2&tag=mystore1060a-21"
        },
        {
            id: 8,
            name: "Textured PU Leather Stylish Duffle Bags",
            imageSrc: "https://res.cloudinary.com/dwmz05ivk/image/upload/v1702021707/Ecommerce/Today%20Offers/jn8ihhqek0kkw40l9d2i.png",
            store: "Amazon",
            price: 1500,
            d_price: 839,
            discount : 45,
            description: "Description of Product 8",
            link:"https://www.amazon.in/dp/B0BVC227W1/ref=cm_sw_r_as_gl_apa_gl_i_H2NB8GTFM6XBZFHRXM1K?linkCode=ml2&tag=mystore1060a-21"
        },
        {
            id: 8,
            name: "Textured PU Leather Stylish Duffle Bags",
            imageSrc: "https://res.cloudinary.com/dwmz05ivk/image/upload/v1702021707/Ecommerce/Today%20Offers/jn8ihhqek0kkw40l9d2i.png",
            store: "Amazon",
            price: 1500,
            d_price: 839,
            discount : 45,
            description: "Description of Product 8",
            link:"https://www.amazon.in/dp/B0BVC227W1/ref=cm_sw_r_as_gl_apa_gl_i_H2NB8GTFM6XBZFHRXM1K?linkCode=ml2&tag=mystore1060a-21"
        },
        {
            id: 8,
            name: "Textured PU Leather Stylish Duffle Bags",
            imageSrc: "https://res.cloudinary.com/dwmz05ivk/image/upload/v1702021707/Ecommerce/Today%20Offers/jn8ihhqek0kkw40l9d2i.png",
            store: "Amazon",
            price: 1500,
            d_price: 839,
            discount : 45,
            description: "Description of Product 8",
            link:"https://www.amazon.in/dp/B0BVC227W1/ref=cm_sw_r_as_gl_apa_gl_i_H2NB8GTFM6XBZFHRXM1K?linkCode=ml2&tag=mystore1060a-21"
        },
        {
            id: 8,
            name: "Textured PU Leather Stylish Duffle Bags",
            imageSrc: "https://res.cloudinary.com/dwmz05ivk/image/upload/v1702021707/Ecommerce/Today%20Offers/jn8ihhqek0kkw40l9d2i.png",
            store: "Amazon",
            price: 1500,
            d_price: 839,
            discount : 45,
            description: "Description of Product 8",
            link:"https://www.amazon.in/dp/B0BVC227W1/ref=cm_sw_r_as_gl_apa_gl_i_H2NB8GTFM6XBZFHRXM1K?linkCode=ml2&tag=mystore1060a-21"
        },
        {
            id: 8,
            name: "Textured PU Leather Stylish Duffle Bags",
            imageSrc: "https://res.cloudinary.com/dwmz05ivk/image/upload/v1702021707/Ecommerce/Today%20Offers/jn8ihhqek0kkw40l9d2i.png",
            store: "Amazon",
            price: 1500,
            d_price: 839,
            discount : 45,
            description: "Description of Product 8",
            link:"https://www.amazon.in/dp/B0BVC227W1/ref=cm_sw_r_as_gl_apa_gl_i_H2NB8GTFM6XBZFHRXM1K?linkCode=ml2&tag=mystore1060a-21"
        },
        {
            id: 8,
            name: "Textured PU Leather Stylish Duffle Bags",
            imageSrc: "https://res.cloudinary.com/dwmz05ivk/image/upload/v1702021707/Ecommerce/Today%20Offers/jn8ihhqek0kkw40l9d2i.png",
            store: "Amazon",
            price: 1500,
            d_price: 839,
            discount : 45,
            description: "Description of Product 8",
            link:"https://www.amazon.in/dp/B0BVC227W1/ref=cm_sw_r_as_gl_apa_gl_i_H2NB8GTFM6XBZFHRXM1K?linkCode=ml2&tag=mystore1060a-21"
        },
        {
            id: 8,
            name: "Textured PU Leather Stylish Duffle Bags",
            imageSrc: "https://res.cloudinary.com/dwmz05ivk/image/upload/v1702021707/Ecommerce/Today%20Offers/jn8ihhqek0kkw40l9d2i.png",
            store: "Amazon",
            price: 1500,
            d_price: 839,
            discount : 45,
            description: "Description of Product 8",
            link:"https://www.amazon.in/dp/B0BVC227W1/ref=cm_sw_r_as_gl_apa_gl_i_H2NB8GTFM6XBZFHRXM1K?linkCode=ml2&tag=mystore1060a-21"
        },
        {
            id: 8,
            name: "Textured PU Leather Stylish Duffle Bags",
            imageSrc: "https://res.cloudinary.com/dwmz05ivk/image/upload/v1702021707/Ecommerce/Today%20Offers/jn8ihhqek0kkw40l9d2i.png",
            store: "Amazon",
            price: 1500,
            d_price: 839,
            discount : 45,
            description: "Description of Product 8",
            link:"https://www.amazon.in/dp/B0BVC227W1/ref=cm_sw_r_as_gl_apa_gl_i_H2NB8GTFM6XBZFHRXM1K?linkCode=ml2&tag=mystore1060a-21"
        },
        {
            id: 8,
            name: "Textured PU Leather Stylish Duffle Bags",
            imageSrc: "https://res.cloudinary.com/dwmz05ivk/image/upload/v1702021707/Ecommerce/Today%20Offers/jn8ihhqek0kkw40l9d2i.png",
            store: "Amazon",
            price: 1500,
            d_price: 839,
            discount : 45,
            description: "Description of Product 8",
            link:"https://www.amazon.in/dp/B0BVC227W1/ref=cm_sw_r_as_gl_apa_gl_i_H2NB8GTFM6XBZFHRXM1K?linkCode=ml2&tag=mystore1060a-21"
        },
        {
            id: 8,
            name: "Textured PU Leather Stylish Duffle Bags",
            imageSrc: "https://res.cloudinary.com/dwmz05ivk/image/upload/v1702021707/Ecommerce/Today%20Offers/jn8ihhqek0kkw40l9d2i.png",
            store: "Amazon",
            price: 1500,
            d_price: 839,
            discount : 45,
            description: "Description of Product 8",
            link:"https://www.amazon.in/dp/B0BVC227W1/ref=cm_sw_r_as_gl_apa_gl_i_H2NB8GTFM6XBZFHRXM1K?linkCode=ml2&tag=mystore1060a-21"
        },
        {
            id: 8,
            name: "Textured PU Leather Stylish Duffle Bags",
            imageSrc: "https://res.cloudinary.com/dwmz05ivk/image/upload/v1702021707/Ecommerce/Today%20Offers/jn8ihhqek0kkw40l9d2i.png",
            store: "Amazon",
            price: 1500,
            d_price: 839,
            discount : 45,
            description: "Description of Product 8",
            link:"https://www.amazon.in/dp/B0BVC227W1/ref=cm_sw_r_as_gl_apa_gl_i_H2NB8GTFM6XBZFHRXM1K?linkCode=ml2&tag=mystore1060a-21"
        }
        ];

        export default Products;