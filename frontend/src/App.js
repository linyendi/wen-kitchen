import React, { useState, useEffect } from 'react';

function App() {
  const [menuData, setMenuData] = useState([]);
  const [loading, setLoading] = useState(true);

  // 正式連動 Render 的後端網址
  const API_URL = "https://wen-kitchen-backend.onrender.com/api/menu";

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        setMenuData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("讀取失敗:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ backgroundColor: '#fdf5e6', minHeight: '100vh', fontFamily: 'serif' }}>
      {/* 主視覺 */}
      <div style={{ 
        backgroundColor: '#8b0000', height: '380px', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', color: 'white',
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("https://images.unsplash.com/photo-1590086782792-42dd2350140d?q=80&w=2000")',
        backgroundSize: 'cover', backgroundPosition: 'center'
      }}>
        <h1 style={{ fontSize: '3.5rem', margin: 0, textShadow: '2px 2px 4px #000' }}>溫灶咖</h1>
        <p style={{ letterSpacing: '8px', marginTop: '10px' }}>找回紅磚房裡的溫馨味</p>
      </div>

      {/* 菜單內容 */}
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '40px 20px' }}>
        <h2 style={{ textAlign: 'center', color: '#8b0000', borderBottom: '2px solid #8b0000', paddingBottom: '10px' }}>美味菜單</h2>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <p>正在生火加熱中... (初次開啟約需 50 秒)</p>
          </div>
        ) : (
          menuData.map((group, idx) => (
            <div key={idx} style={{ marginBottom: '30px' }}>
              <h3 style={{ backgroundColor: '#8b0000', color: 'white', padding: '5px 15px', display: 'inline-block' }}>{group.category}</h3>
              {group.items.map((item, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 0', borderBottom: '1px dashed #ccc' }}>
                  <span>{item.name} <small style={{color:'#d97706'}}>{item.note}</small></span>
                  <span style={{ fontWeight: 'bold', color: '#8b0000' }}>${item.price}</span>
                </div>
              ))}
            </div>
          ))
        )}
      </div>

      {/* 頁尾 */}
      <footer style={{ textAlign: 'center', padding: '40px', color: '#777', borderTop: '1px solid #ddd' }}>
        <p>© 溫灶咖 - 紅磚房的溫暖回憶</p>
      </footer>
    </div>
  );
}

export default App;
