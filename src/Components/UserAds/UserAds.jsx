import Navbar from "../Navbar/Navbar";
import SecondNav from "../SecondNav/SecondNav";
import Footer from "../Footer/Footer";
import { collection, query, where, getDocs, doc, updateDoc ,deleteDoc} from 'firebase/firestore';
import { db , storage } from "../../FireBase"; 
import { useEffect, useState } from "react";
import { useUser } from '../../UserContext';
import EditProductForm from "../Edit/Edit";  
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; 

function UserAds() {
    const { user } = useUser();
    const [productData, setProductData] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                if (!user || !user.uid) {
                    console.log('User not logged in or missing UID');
                    return;
                }

                const productsRef = collection(db, 'products');
                const q = query(productsRef, where('userId', '==', user.uid));
                const querySnapshot = await getDocs(q);

                const products = [];
                querySnapshot.forEach((doc) => {
                    products.push({ id: doc.id, ...doc.data() });
                });

                setProductData(products);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProductData();
    }, [user]);

    const handleEditClick = (product) => {
        setEditingProduct(product);
    };

    const handleSave = async (updatedProduct, imageFile) => {
        try {
            let imageUrl = updatedProduct.imageUrl;

            if (imageFile) {
                const storageRef = ref(storage, `images/${imageFile.name}`);
                await uploadBytes(storageRef, imageFile);
                imageUrl = await getDownloadURL(storageRef);
            }

            const productRef = doc(db, 'products', editingProduct.id);
            await updateDoc(productRef, { ...updatedProduct, imageUrl });

            setProductData((prevData) =>
                prevData.map((product) =>
                    product.id === editingProduct.id ? { ...product, ...updatedProduct, imageUrl } : product
                )
            );
            setEditingProduct(null);
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };
    const handleCancel = () => {
        setEditingProduct(null);
    };


    const handleDeleteClick = async (productId) => {
        try {
            const productRef = doc(db, 'products', productId);
            await deleteDoc(productRef);
            setProductData((prevData) =>
                prevData.filter((product) => product.id !== productId)
            );
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };



    return (
        <div>
            <Navbar />
            <SecondNav />
            <div className="container mt-3">
                <h4>Your Ads</h4>
                <div className="row mt-4">
                    {productData.map((product) => (
                        <div className="col-md-3 col-sm-6 item mb-4" key={product.id}>
                            <div className="card item-card card-block p-2">
                                <div className="modify" style={{ position: "absolute", top: "15px", right: "15px", color: "Black", fontSize: "20px" }}>
                                    <i className="fa-solid fa-pen-to-square" style={{ cursor: "pointer", marginRight: "10px", backgroundColor: "white", padding: "8px", borderRadius: "50%" }} onClick={() => handleEditClick(product)}></i>
                                    <i className="fa-solid fa-trash" onClick={()=> handleDeleteClick(product.id)} style={{ backgroundColor: "white", padding: "8px", borderRadius: "50%" }}></i>
                                </div>
                                <img src={product.imageUrl || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"} alt={product.name} />
                                <div className="price p-3">
                                    <h2 className="card-title mt-3 mb-3">₹ {product.price}</h2>
                                    <p className="card-text">{product.description}</p>
                                    <p>{product.location}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {editingProduct && (
                    <div className="card" style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                    <EditProductForm
                        product={editingProduct}
                        onSave={handleSave}
                        onCancel={handleCancel}
                    />
                </div>
                )}
            </div>
            <Footer />
        </div>
    );
}

export default UserAds;
