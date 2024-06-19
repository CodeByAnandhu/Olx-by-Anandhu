import { useState } from "react";

function EditProductForm({ product, onSave, onCancel }) {
    const [formData, setFormData] = useState({
        name: product.itemName,
        price: product.price,
        description: product.description,
        location: product.location,
        imageUrl: product.imageUrl,
    });
    const [imageFile, setImageFile] = useState(null); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleFileChange = (e) => {
        setImageFile(e.target.files[0]); 
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData, imageFile); 
    };

    return (
        <div>
        <form onSubmit={handleSubmit} style={{ border: "none", padding: "50px 50px 20px", display: "flex", flexDirection: "column", gap: "10px", backgroundColor: "#9e9ada68", borderRadius: "10px", width: "500px", alignItems: "center", justifyContent: "center" }}>
            <div>
                <label>Name</label><br />
                <input type="text" name="name" value={formData.name} onChange={handleChange} />
            </div>
            <div>
                <label>Price</label><br />
                <input type="number" name="price" value={formData.price} onChange={handleChange} style={{ padding: "10px 20px", backgroundColor: "white", border: "2px solid #9e9ada68", borderRadius: "5px" }} />
            </div>
            <div>
                <label>Description</label><br />
                <input type="text" name="description" value={formData.description} onChange={handleChange} />
            </div>
            <div>
                <label>Location</label><br />
                <input type="text" name="location" value={formData.location} onChange={handleChange} />
            </div>
            <div>
                <label>Image URL</label><br />
                <input type="file" id="image" name="image" accept="image/*" onChange={handleFileChange} style={{ padding: "10px 10px" }} />
            </div>
            <button type="submit" style={{ padding: "10px 95px", backgroundColor: "white", border: "2px solid #9e9ada68", borderRadius: "5px" }}>Save</button>
            <button type="button" onClick={onCancel} style={{ padding: "10px 88px", backgroundColor: "white", border: "2px solid #9e9ada68", borderRadius: "5px" }}>Cancel</button>
        </form>
        </div>
    );
}

export default EditProductForm;
