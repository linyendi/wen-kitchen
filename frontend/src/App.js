import React, { useState, useEffect } from 'react';

function App() {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 這裡填入你剛剛測試成功的 Render 後端網址
    fetch('https://wen-kitchen-backend.onrender.com/api/menu')
      .then(response => response.json())
      .then(data => {
        setMenu(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching menu:', error);
        setLoading(false);
      });
  }, []);

  const styles = {
    container: { padding: '20px', maxWidth: '600px', margin: '0 auto', fontFamily: 'Arial, sans-serif', backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' },
    header: { textAlign: 'center', color: '#d32f2f', borderBottom: '2px solid #d32f2f', paddingBottom: '10px' },
    category: { marginTop: '20px', color: '#555', fontSize: '1.2rem', fontWeight: 'bold' },
    item: { display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px dashed #ddd' },
    price: { fontWeight: 'bold', color: '#d32f2f' },
    note: { fontSize: '0.8rem', color: '#888', marginLeft: '5px' },
    loading: { textAlign: 'center', marginTop: '50px', color: '#888' }
  };

  if (loading) return <div style={styles.loading}>🏮 溫灶咖正在生火加熱中，請稍候...</div>;

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>🏮 溫灶咖 🏮</h1>
      {menu.map((cat, idx) => (
        <div key={idx}>
          <div style={styles.category}>{cat.category}</div>
          {cat.items.map((item, i) => (
            <div key={i} style={styles.item}>
              <span>
                {item.name} 
                {item.note && <span style={styles.note}>({item.note})</span>}
              </span>
              <span style={styles.price}>${item.price}</span>
            </div>
          ))}
        </div>
      ))}
      <p style={{textAlign: 'center', marginTop: '30px', fontSize: '0.8rem', color: '#aaa'}}>© 2026 Wen Kitchen</p>
    </div>
  );
}

export default App;
