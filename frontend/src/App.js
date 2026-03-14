import React, { useState, useEffect } from 'react';

// --- 圖片 Raw 網址 ---
const BACKGROUND_IMG = 'https://raw.githubusercontent.com/linyendi/wen-kitchen/main/frontend/public/image/background.jpeg';
const ICON_EGG_YAKI = 'https://raw.githubusercontent.com/linyendi/wen-kitchen/main/frontend/public/image/cake_yaki.jpeg';
const ICON_EGG_CAKE = 'https://raw.githubusercontent.com/linyendi/wen-kitchen/main/frontend/public/image/cake_normal.jpeg';
const ICON_DRINK = 'https://raw.githubusercontent.com/linyendi/wen-kitchen/main/frontend/public/image/drink.jpeg';
const FOOTER_BG = 'https://raw.githubusercontent.com/linyendi/wen-kitchen/main/frontend/public/image/_c9abdb00-30cc-400a-9b42-39d2046eaa33.jpeg';

// 將圖示放入陣列方便對應
const CAT_ICONS = [ICON_EGG_YAKI, ICON_EGG_CAKE, ICON_DRINK];

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
      // 設定全螢幕背景圖，固定不動 (Fixed)
      backgroundImage: `linear-gradient(rgba(253, 252, 248, 0.9), rgba(253, 252, 248, 0.9)), url(${BACKGROUND_IMG})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      fontFamily: '"Noto Sans TC", sans-serif',
      color: '#444',
      paddingBottom: '60px'
    },
    header: {
      textAlign: 'center',
      padding: '80px 20px',
    },
    title: { 
      fontSize: '4.5rem', 
      color: '#a63a3a', 
      margin: 0, 
      fontWeight: '900', 
      letterSpacing: '15px' 
    },
    main: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 20px',
    },
    cardGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
      gap: '30px',
    },
    card: {
      backgroundColor: 'rgba(255, 255, 255, 0.85)', // 半透明白，透出背景
      borderRadius: '25px',
      padding: '30px',
      border: '1.5px solid #e0e0e0',
      boxShadow: '0 8px 20px rgba(0,0,0,0.05)',
      backdropFilter: 'blur(5px)', // 玻璃擬態效果
    },
    cardHeader: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '20px',
      borderBottom: '2px solid #a63a3a',
      paddingBottom: '10px',
    },
    cardIcon: { width: '50px', height: '50px', marginRight: '15px', borderRadius: '50%' },
    cardTitle: { color: '#a63a3a', fontSize: '1.5rem', margin: 0 },

    itemRow: { marginBottom: '15px' },
    itemMain: { display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' },
    itemName: { fontWeight: 'bold', fontSize: '1.1rem' },
    itemPrice: { fontWeight: 'bold', color: '#a63a3a' },

    // --- 底部浮水印文字疊加設計 ---
    footer: {
      marginTop: '80px',
      display: 'flex',
      justifyContent: 'center',
      padding: '0 20px'
    },
    footerContainer: {
      position: 'relative', // 讓內部文字可以相對於圖片定位
      width: '100%',
      maxWidth: '600px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    footerImg: {
      width: '100%',
      height: 'auto',
      borderRadius: '20px',
      opacity: 0.9
    },
    footerOverlay: {
      position: 'absolute', // 絕對定位，文字浮在圖片上
      textAlign: 'center',
      width: '70%', // 限制文字寬度在告示牌留白處
      color: '#5d4037',
      fontWeight: 'bold',
      pointerEvents: 'none', // 確保不會干擾滑鼠行為
      fontSize: 'clamp(0.8rem, 2.5vw, 1.1rem)' // RWD 字體：隨螢幕縮放
    }
  };

  if (loading) return <div style={{textAlign:'center', marginTop:'100px'}}>🏮 溫灶咖生火中...</div>;

  return (
    <div style={styles.wrapper}>
      <header style={styles.header}>
        <h1 style={styles.title}>溫 灶 咖</h1>
        <p style={{color:'#8d7765', letterSpacing:'2px'}}>ベビーカステラ | 手作雞蛋糕</p>
      </header>

      <main style={styles.main}>
        <div style={styles.cardGrid}>
          {data.menu && data.menu.map((cat, idx) => (
            <div key={idx} style={styles.card}>
              <div style={styles.cardHeader}>
                <img src={CAT_ICONS[idx]} alt="icon" style={styles.cardIcon} />
                <h2 style={styles.cardTitle}>{cat.category}</h2>
              </div>
              {cat.items && cat.items.map((item, i) => (
                <div key={i} style={styles.itemRow}>
                  <div style={styles.itemMain}>
                    <span>{item.name} <small style={{color:'#999'}}>{item.note}</small></span>
                    <span style={styles.itemPrice}>${item.price || '--'}</span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* --- 底部商家資訊：文字疊加在圖片上 --- */}
        <footer style={styles.footer}>
          <div style={styles.footerContainer}>
            <img src={FOOTER_BG} alt="footer background" style={styles.footerImg} />
            <div style={styles.footerOverlay}>
              <p style={{marginBottom: '10px'}}>{data.shopInfo.description}</p>
              <p>📍 {data.shopInfo.address}</p>
              <p style={{marginTop: '10px', fontSize: '1.2em', color: '#a63a3a'}}>
                || {data.shopInfo.lineNotice} ||
              </p>
              <p style={{fontSize: '0.7em', color: '#bbb', marginTop: '15px'}}>© 2026 Wen Kitchen</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;
