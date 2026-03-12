import React, { useState, useEffect } from 'react';

// --- 使用高穩定性的開源圖片 (Unsplash) ---
// 頭部背景：溫馨的廚房桌案
const HEADER_BG = 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=1200';
// 分類圖示：雞蛋、甜點、茶飲
const CAT_ICONS = [
  'https://cdn-icons-png.flaticon.com/512/837/837713.png', // 雞蛋 (雞蛋燒)
  'https://cdn-icons-png.flaticon.com/512/2682/2682442.png', // 蛋糕 (雞蛋糕)
  'https://cdn-icons-png.flaticon.com/512/3504/3504827.png'  // 茶 (呷涼的)
];
// 尾部背景：小店溫馨氛圍
const FOOTER_BG = 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&q=80&w=800';

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
      fontFamily: '"Noto Sans TC", sans-serif',
      color: '#444',
      margin: 0,
      padding: 0,
    },
    // 1. 頭部設計
    header: {
      height: '350px',
      backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${HEADER_BG})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      color: '#fff',
    },
    title: { 
      fontSize: '4.5rem', 
      margin: 0, 
      fontWeight: '900', 
      letterSpacing: '15px',
      textShadow: '3px 3px 6px rgba(0,0,0,0.5)'
    },
    subTitle: { fontSize: '1.2rem', marginTop: '10px', opacity: 0.9 },

    // 2. 主體卡片設計
    main: {
      maxWidth: '1200px',
      margin: '-50px auto 60px', // 讓卡片往上蓋過頭部一點點
      padding: '0 20px',
    },
    cardGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
      gap: '25px',
    },
    card: {
      backgroundColor: '#fff',
      borderRadius: '20px',
      padding: '30px',
      boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
      border: '1px solid #eee',
    },
    cardHeader: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '20px',
      borderBottom: '2px solid #a63a3a',
      paddingBottom: '10px',
    },
    cardIcon: { width: '40px', height: '40px', marginRight: '15px' },
    cardTitle: { color: '#a63a3a', fontSize: '1.6rem', margin: 0 },

    // 品項樣式
    itemRow: { marginBottom: '18px' },
    itemMain: { display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' },
    itemName: { fontWeight: 'bold', fontSize: '1.1rem' },
    itemNote: { color: '#999', fontSize: '0.85rem', marginLeft: '5px' },
    itemPrice: { fontWeight: 'bold', color: '#a63a3a', fontSize: '1.2rem' },
    itemOptions: { color: '#8d7765', fontSize: '0.85rem', marginTop: '4px' },

    // 3. 尾部設計
    footer: {
      backgroundColor: '#2c2c2c',
      color: '#fff',
      padding: '60px 20px',
      textAlign: 'center',
      backgroundImage: `linear-gradient(rgba(44,44,44,0.85), rgba(44,44,44,0.85)), url(${FOOTER_BG})`,
      backgroundSize: 'cover',
    },
    footerContent: { maxWidth: '600px', margin: '0 auto' },
    footerTitle: { color: '#fdfcf8', fontSize: '1.4rem', marginBottom: '20px' },
    footerLine: { margin: '10px 0', opacity: 0.8 },
    lineNotice: {
      display: 'inline-block',
      padding: '8px 25px',
      border: '1px solid #fff',
      borderRadius: '30px',
      marginTop: '20px',
      fontWeight: 'bold',
    }
  };

  if (loading) return (
    <div style={{height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#fdfcf8'}}>
      🏮 溫灶咖正在生火中...
    </div>
  );

  return (
    <div style={styles.wrapper}>
      <header style={styles.header}>
        <h1 style={styles.title}>溫 灶 咖</h1>
        <p style={styles.subTitle}>ベビーカステラ | 手作雞蛋糕</p>
      </header>

      <main style={styles.main}>
        <div style={styles.cardGrid}>
          {data.menu && data.menu.map((cat, idx) => (
            <div key={idx} style={styles.card}>
              <div style={styles.cardHeader}>
                <img src={CAT_ICONS[idx % CAT_ICONS.length]} alt="icon" style={styles.cardIcon} />
                <h2 style={styles.cardTitle}>{cat.category}</h2>
              </div>
              {cat.items && cat.items.map((item, i) => (
                <div key={i} style={styles.itemRow}>
                  <div style={styles.itemMain}>
                    <span style={styles.itemName}>
                      {item.name}
                      {item.note && <span style={styles.itemNote}>({item.note})</span>}
                    </span>
                    <span style={styles.itemPrice}>{item.price ? `$${item.price}` : '--'}</span>
                  </div>
                  {item.options && item.options.length > 0 && (
                    <div style={styles.itemOptions}>○ {item.options.join(' / ')}</div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </main>

      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <h3 style={styles.footerTitle}>{data.shopInfo.description}</h3>
          <p style={styles.footerLine}>📍 店址：{data.shopInfo.address}</p>
          <div style={styles.lineNotice}>|| {data.shopInfo.lineNotice} ||</div>
          <p style={{fontSize: '0.8rem', marginTop: '30px', opacity: 0.5}}>© 2026 Wen Kitchen</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
