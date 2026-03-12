import React, { useState, useEffect } from 'react';

// 使用一張溫馨的烘焙背景圖
const BACKGROUND_URL = 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1600&auto=format&fit=crop';

function App() {
  const [data, setData] = useState({ menu: [], shopInfo: {} });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://wen-kitchen-backend.onrender.com/api/menu')
      .then(response => response.json())
      .then(result => {
        setData(result);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  const styles = {
    wrapper: {
      minHeight: '100vh',
      backgroundColor: '#fdfcf8',
      backgroundImage: `linear-gradient(rgba(253, 252, 248, 0.92), rgba(253, 252, 248, 0.92
