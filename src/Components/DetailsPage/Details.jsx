import  { useEffect, useState } from 'react';
import Navbar from "../Navbar/Navbar";
import SecondNav from "../SecondNav/SecondNav";
import Footer from "../Footer/Footer";
import "./Details.css";
import { useParams } from "react-router-dom";
import { doc, getDoc } from 'firebase/firestore';
import { db } from "./../../FireBase"; 

function Details() {
  const { productId } = useParams();
  const [productData, setProductData] = useState(null);
  
  useEffect(() => {
    const fetchProductData = async () => {
      try {

        const productRef = doc(db, 'products', productId);

      
        const productSnapshot = await getDoc(productRef);

        if (productSnapshot.exists()) {
          
          const data = productSnapshot.data();
          setProductData(data);
        } else {
        
          console.log('No product found with ID:', productId);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProductData();
  }, [productId]);

  
  return (
    <div>
      <Navbar />
      <SecondNav />
      <main>
        <section>
          <div className="image">
            {productData && <img src={productData.imageUrl} alt={productData.name} />}
          </div>
          <div className="right">
            <div className="priceCard">
              {productData ? (
                <>
                  <h1>{productData.itemName}</h1>
                  <h4>₹ {productData.price}</h4>
                  <span>
                    <i className="fa-solid fa-location-dot"></i> {productData.location}
                  </span>
                </>
              ) : (
                <p>Loading...</p>
              )}
            </div>

            <div className="sellerDetails">
              {productData ? (
                <>
                  <h4>{productData.sellerName}</h4>
                  <p>{productData.description}</p>
                  <span>
                    <i className="fa-solid fa-phone"></i> Ph: {productData.phoneNumber}
                  </span>
                </>
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Details;
