import { useState } from 'react';
import { db, auth } from '../../FireBase'; 
import { collection, addDoc } from 'firebase/firestore';
import {useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import './Uplode.css';
import Navbar from '../Navbar/Navbar'
import SecondNav from '../SecondNav/SecondNav'

const AddProduct = () => {
  const [itemName, setItemName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [userName, setName] = useState('');
  const [image, setImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = auth.currentUser;
      if (!user) throw new Error('User not authenticated');

      const storage = getStorage();
      const imageRef = ref(storage, `products/${image.name}`);
      await uploadBytes(imageRef, image);
      const imageUrl = await getDownloadURL(imageRef);

      await addDoc(collection(db, 'products'), {
        itemName,
        price,
        description,
        location,
        phoneNumber,
        userName,
        imageUrl,
        userId: user.uid,
      }).then(() => {
        console.log('Product added successfully');
      })

      toast.success('Product added successfully');

      setItemName('');
      setPrice('');
      setDescription('');
      setLocation('');
      setPhoneNumber('');
      setName('');
      setImage(null);
      setSelectedImage(null);
      
      navigate('/');
 
    } catch (err) {
      console.log('Error while storing product data in Firestore', err);
      toast.error(err.message);
    }
  };

  return (
    <div>
    <Navbar/>
    <SecondNav/>
    <form className="form" onSubmit={handleSubmit}>
      <div className="input-box">
        <h1>Post your Ad</h1>
        <div className="input-row">
          <label htmlFor="itemName">Item Name</label>
          <input type="text" onChange={(e) => setItemName(e.target.value)} value={itemName} placeholder='Enter the item name' id="itemName" name="itemName" required />
        </div>
        <div className="input-row">
          <label htmlFor="price">Price</label>
          <input type="text" onChange={(e) => setPrice(e.target.value)} value={price} placeholder='Price of the product' id="price" name="price" required />
        </div>
        <div className="input-row">
          <label htmlFor="description">Description</label>
          <textarea id="description" onChange={(e) => setDescription(e.target.value)} value={description} placeholder='Add a description' name="description" rows="4" required></textarea>
        </div>
        <div className="input-row">
          <label htmlFor="location">Location</label>
          <input type="text" onChange={(e) => setLocation(e.target.value)} value={location} placeholder='Add your location' id="location" name="location" required />
        </div>
        <div className="input-row">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input type="text" onChange={(e) => setPhoneNumber(e.target.value)} value={phoneNumber} placeholder='Add phone number' id="phoneNumber" name="phoneNumber" required />
        </div>
        <div className="input-row">
          <label htmlFor="name">Name</label>
          <input type="text" onChange={(e) => setName(e.target.value)} value={userName} placeholder='Add your name' id="name" name="name" required />
        </div>
        <div className="input-row">
          <label htmlFor="image">Upload Image</label>
          <input type="file" id="image" name="image" accept="image/*" onChange={handleImageChange} required />
          {selectedImage && (
            <div className="image-preview">
              <img src={selectedImage} alt="Preview" />
            </div>
          )}
        </div>
        <button className='submitBtn' type='submit'>Submit</button>
      </div>
      
    </form>
    </div>
  );
};

export default AddProduct;
