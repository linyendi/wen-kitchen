import React, { useState, useEffect } from 'react';

// --- 使用你上傳的 GitHub Raw 圖片網址 ---
const HEADER_BG = 'https://raw.githubusercontent.com/linyendi/wen-kitchen/main/frontend/public/image/_f5af5eaa-7bb3-474f-88ab-3fa8477894e9.jpeg';
const CAT_ICON_ALL = 'https://raw.githubusercontent.com/linyendi/wen-kitchen/main/frontend/public/image/_2766c5b7-c1cd-46da-ac3f-4fe6133eef3a.jpeg';
const FOOTER_ILLUST = 'https://raw.githubusercontent.com/linyendi/wen-kitchen/main/frontend/public/image/_c9abdb00-30cc-400a-9b42-39d2046eaa33.jpeg';

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
      fontFamily: '"Noto Sans TC", "Microsoft JhengHei", sans-serif',
      color: '#444',
      margin: 0,
      padding: 0,
    },
    // 1. 頭部設計：確保插圖在兩側
    header: {
      height: '300px',
      backgroundImage: `url(${HEADER_BG})`,
      backgroundSize: 'contain', // 確保插圖不被切掉
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundColor: '#fdfcf8',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: '20px'
    },
    title: { 
      fontSize: '4.2rem', 
      margin: 0, 
      fontWeight: '900', 
      letterSpacing: '12px',
      color: '#a63a3a',
      textShadow: '2px 2px 0px #fff, -2px -2px 0px #fff, 2px -2px 0px #fff, -2px 2px 0px #fff' // 文字白邊增加可讀性
    },
    subTitle: { fontSize: '1.1rem', marginTop: '5px', color: '#8d7765', fontWeight: 'bold' },

    // 2. 主體卡片設計
    main: {
      maxWidth: '1100px',
      margin: '20px auto 60px',
      padding: '0 20px',
    },
    cardGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
      gap: '30px',
    },
    card: {
      backgroundColor: '#fff',
      borderRadius: '25px',
      padding: '35px',
      boxShadow: '0 12px 30px rgba(141, 119, 101, 0.1)',
      border: '1.5px solid #f1ede4',
      position: 'relative',
      overflow: 'hidden'
    },
    cardHeader: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '25px',
      borderBottom: '2px solid #d4c5b9',
      paddingBottom: '12px',
    },
    // 分類圖示：圓形裁切效果
    cardIconWrapper: {
      width: '60px',
      height: '60px',
      borderRadius: '50%',
      overflow: 'hidden',
      marginRight: '15px',
      border: '2px solid #f1ede4'
    },
    cardIconImg: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    },
    cardTitle: { color: '#5d4037', fontSize: '1.6rem', margin: 0, fontWeight: 'bold' },

    // 品項樣式
    itemRow: { marginBottom: '20px' },
    itemMain: { display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' },
    itemName: { fontWeight: 'bold', fontSize: '1.15rem', color: '#333' },
    itemNote: { color: '#999', fontSize: '0.85rem', marginLeft: '5px' },
    itemPrice: { fontWeight: 'bold', color: '#a63a3a', fontSize: '1.2rem' },
    itemOptions: { color: '#8d7765', fontSize: '0.85rem', marginTop: '5px', fontStyle: 'italic' },

    // 3. 尾部設計：加入小雞告示牌插圖
    footer: {
      backgroundColor: '#f1ede4',
      padding: '60px 20px',
      textAlign: 'center',
      borderTop: '2px solid #d4c5b9',
      position: 'relative',
    },
    footerContent: { 
      maxWidth: '800px', 
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      flexWrap: 'wrap',
      gap: '30px'
    },
    footerIllust: {
      width: '180px',
      height: 'auto',
      borderRadius: '15px',
      boxShadow: '5px 5px 15px rgba(0,0,0,0.05)'
    },
    footerInfo: { textAlign: 'left', minWidth: '280px' },
    footerTitle: { color: '#a63a3a', fontSize: '1.3rem', marginBottom: '15px', fontWeight: 'bold' },
    lineNotice: {
      display: 'inline-block',
      padding: '6px 20px',
      backgroundColor: '#5d4037',
      color: '#fff',
      borderRadius: '8px',
      marginTop: '15px',
      fontSize: '0.9rem'
    }
  };

  if (loading) return (
    <div style={{height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#fdfcf8', color: '#a63a3a', fontSize: '1.2rem'}}>
      🏮 溫灶咖正在生火中...
    </div>
  );

  return (
    <div style={styles.wrapper}>
      <header style={styles.header}>
        <h1 style={styles.title}>溫 灶 咖</h1>
        <p style={styles.subTitle}>ベビーカステラ | 手作雞蛋糕專賣</p>
      </header>

      <main style={styles.main}>
        <div style={styles.cardGrid}>
          {data.menu && data.menu.map((cat, idx) => (
            <div key={idx} style={styles.card}>
              <div style={styles.cardHeader}>
                <div style={styles.cardIconWrapper}>
                  <img src={CAT_ICON_ALL} alt="icon" style={styles.cardIconImg} />
                </div>
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
          <div style={styles.footerInfo}>
            <h3 style={styles.footerTitle}>{data.shopInfo.description}</h3>
            <p style={{margin: '5px 0'}}>📍 {data.shopInfo.address}</p>
            <div style={styles.lineNotice}>📲 {data.shopInfo.lineNotice}</div>
          </div>
          <img src={FOOTER_ILLUST} alt="小雞告示牌" style={styles.footerIllust} />
        </div>
        <p style={{fontSize: '0.8rem', marginTop: '40px', color: '#aaa'}}>© 2026 Wen Kitchen 溫灶咖</p>
      </footer>
    </div>
  );
}

export default App;
