import "./Cards.css";
import { useEffect, useState } from 'react';
import { db } from '../../FireBase'; 
import { collection, getDocs } from 'firebase/firestore';
import { useNavigate } from "react-router-dom";

function Cards() {

  const navigate = useNavigate();

  const navigateToDetails = (productId) => {
    navigate(`/details/${productId}`);
  };

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const productsCollection = collection(db, 'products');
      const productsSnapshot = await getDocs(productsCollection);
      const productsList = productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(productsList);
    };

    fetchProducts();
  }, []);

  return (
    <div className="container mt-3">
      <h4>Fresh recommendations</h4>   
      <div className="row mt-4">
        {products.map(product => (
          <div key={product.id} onClick={() =>navigateToDetails(product.id)} className="col-md-3 col-sm-6 item mb-4">
            <div className="card item-card card-block p-2">
              <img src={product.imageUrl} alt={product.itemName} />
              <div className="price p-3">   
                <h2 className="card-title mt-3 mb-3">₹{product.price}</h2>
                <p className="card-text">{product.description}</p>
                <p>{product.location}</p>
              </div> 
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cards;
