import React, { useState } from 'react';
import axios from 'axios';

const About = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    // Create a local preview URL
    if (selectedFile) {
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  // Handle upload logic
  const handleUpload = async (e) => {
  e.preventDefault();
  if (!file) return alert("Please select a file!");

  const formData = new FormData();
  formData.append('profile', file);

  try {
    setLoading(true);
    // Note the added "/api/user" prefix and port 3001
    const response = await axios.post('http://localhost:3001/api/user/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      withCredentials: true // Important since you use cookie-parser/cors credentials
    });

    console.log("Success:", response.data);
    setMessage("Uploaded! URL: " + response.data.imageUrl);
  } catch (err) {
    console.error("Upload Error:", err.response?.data || err.message);
    setMessage("Upload failed: " + (err.response?.data?.message || "Server Error"));
  } finally {
    setLoading(false);
    setFile("")
  }
};

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h3>Upload Profile Picture</h3>
      
      <form onSubmit={handleUpload}>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        
        {preview && (
          <div style={{ marginTop: '10px' }}>
            <img src={preview} alt="Preview" style={{ width: '150px', borderRadius: '50%' }} />
          </div>
        )}

        <button
        className='border px-2 rounded cursor-pointer'
         type="submit" disabled={loading} style={{ marginTop: '10px', display: 'block' }}>
          {loading ? 'Uploading...' : 'Upload to Cloudinary'}
        </button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default About;
