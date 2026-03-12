import React, { useState, useEffect } from 'react';

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
    container: { padding: '20px', maxWidth: '600px', margin: '0 auto', fontFamily: 'Arial, sans-serif', backgroundColor: '#fff' },
    header: { textAlign: 'center', color: '#d32f2f' },
    categoryTitle: { backgroundColor: '#e0e0e0', padding: '5px 15px', borderRadius: '15px', display: 'inline-block', margin: '15px 0 10px 0' },
    item: { display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #eee' },
    footer: { marginTop: '40px', padding: '20px', borderTop: '2px solid #d32f2f', textAlign: 'center', fontSize: '0.9rem', color: '#333' }
  };

  if (loading) return <div style={{textAlign:'center', marginTop:'50px'}}>🏮 溫灶咖生火中...</div>;

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>溫 灶 咖</h1>
      
      {data.menu.map((cat, idx) => (
        <div key={idx}>
          <div style={styles.categoryTitle}>{cat.category}</div>
          {cat.items.map((item, i) => (
            <div key={i} style={styles.item}>
              <span>{item.name} <small style={{color:'#888'}}>{item.note}</small></span>
              <span>{item.price ? `$${item.price}` : '--'}</span>
            </div>
          ))}
        </div>
      ))}

      <div style={styles.footer}>
        <p>{data.shopInfo.description}</p>
        <p>📍 {data.shopInfo.address}</p>
        <p><strong>|| {data.shopInfo.lineNotice} ||</strong></p>
      </div>
    </div>
  );
}

export default App;
