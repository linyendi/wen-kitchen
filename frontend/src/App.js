import React, { useState, useEffect } from 'react';

// 背景圖片網址 (確保是一整行，避免斷行報錯)
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
      backgroundImage: `linear-gradient(rgba(253, 252, 248, 0.92), rgba(253, 252, 248, 0.92)), url(${BACKGROUND_URL})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      color: '#444',
      padding: '40px 20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    container: { width: '100%', maxWidth: '500px' },
    header: { 
      textAlign: 'center', 
      color: '#a63a3a', 
      fontSize: '2.8rem', 
      margin: '0 0 10px 0', 
      fontWeight: '900',
      letterSpacing: '8px'
    },
    subHeader: { textAlign: 'center', color: '#888', marginBottom: '40px', fontSize: '0.9rem' },
    categoryTag: {
      backgroundColor: '#8d7765',
      color: '#fff',
      padding: '4px 18px',
      borderRadius: '20px',
      fontSize: '1rem',
      fontWeight: 'bold',
      display: 'inline-block',
      marginTop: '30px',
      marginBottom: '15px'
    },
    itemRow: { marginBottom: '18px' },
    itemMain: { display: 'flex', alignItems: 'baseline' },
    itemName: { fontWeight: 'bold', fontSize: '1.1rem' },
    itemNote: { color: '#999', fontSize: '0.85rem', marginLeft: '6px' },
    dottedLine: { flex: 1, borderBottom: '1.5px dotted #ccc', margin: '0 10px' },
    itemPrice: { fontWeight: 'bold', color: '#a63a3a', fontSize: '1.1rem' },
    itemOptions: { display: 'block', color: '#8d7765', fontSize: '0.85rem', marginTop: '4px' },
    footer: {
      marginTop: '60px',
      padding: '30px 20px',
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
      borderRadius: '15px',
      textAlign: 'center',
      border: '1px solid #eee'
    },
    footerLine: { margin: '8px 0', fontSize: '0.95rem' }
  };

  if (loading) return (
    <div style={{height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#fdfcf8', color: '#a63a3a'}}>
      🏮 溫灶咖生火中...
    </div>
  );

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <h1 style={styles.header}>溫 灶 咖</h1>
        <p style={styles.subHeader}>ベビーカステラ</p>
        
        {data.menu && data.menu.map((cat, idx) => (
          <div key={idx}>
            <div style={styles.categoryTag}>{cat.category}</div>
            {cat.items && cat.items.map((item, i) => (
              <div key={i} style={styles.itemRow}>
                <div style={styles.itemMain}>
                  <span style={styles.itemName}>{item.name}</span>
                  {item.note && <span style={styles.itemNote}>{item.note}</span>}
                  <div style={styles.dottedLine}></div>
                  <span style={styles.itemPrice}>{item.price ? `$${item.price}` : '--'}</span>
                </div>
                {item.options && item.options.length > 0 && (
                  <small style={styles.itemOptions}>
                    ○ {item.options.join(' / ')}
                  </small>
                )}
              </div>
            ))}
          </div>
        ))}

        {data.shopInfo && (
          <div style={styles.footer}>
            <p style={{color: '#a63a3a', fontWeight: 'bold', marginBottom: '15px'}}>{data.shopInfo.description}</p>
            <p style={styles.footerLine}>📍 {data.shopInfo.address}</p>
            <p style={styles.footerLine}><strong>|| {data.shopInfo.lineNotice} ||</strong></p>
            <p style={{fontSize: '0.8rem', color: '#bbb', marginTop: '20px'}}>© 2026 Wen Kitchen</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
