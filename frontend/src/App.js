import React, { useState, useEffect } from 'react';

// --- 圖片網址保持不變 ---
const BACKGROUND_IMG = 'https://raw.githubusercontent.com/linyendi/wen-kitchen/main/frontend/public/image/background.jpeg';
const ICON_EGG_YAKI = 'https://raw.githubusercontent.com/linyendi/wen-kitchen/main/frontend/public/image/cake_yaki.jpeg';
const ICON_EGG_CAKE = 'https://raw.githubusercontent.com/linyendi/wen-kitchen/main/frontend/public/image/cake_normal.jpeg';
const ICON_DRINK = 'https://raw.githubusercontent.com/linyendi/wen-kitchen/main/frontend/public/image/drink.jpeg';
const FOOTER_BG = 'https://raw.githubusercontent.com/linyendi/wen-kitchen/main/frontend/public/image/_c9abdb00-30cc-400a-9b42-39d2046eaa33.jpeg';

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
      backgroundImage: `linear-gradient(rgba(253, 252, 248, 0.93), rgba(253, 252, 248, 0.93)), url(${BACKGROUND_IMG})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      fontFamily: '"Noto Sans TC", "Microsoft JhengHei", sans-serif',
      color: '#5d4037',
      paddingBottom: '100px'
    },
    header: {
      textAlign: 'center',
      padding: '80px 20px 40px',
    },
    title: { 
      fontSize: '4.5rem', 
      color: '#a63a3a', 
      margin: 0, 
      fontWeight: '900', 
      letterSpacing: '12px' 
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
      backgroundColor: 'rgba(255, 255, 255, 0.85)',
      borderRadius: '25px',
      padding: '30px',
      boxShadow: '0 8px 30px rgba(166, 58, 58, 0.05)',
      border: '1px solid rgba(255, 255, 255, 0.5)',
      transition: 'transform 0.3s ease'
    },
    cardHeader: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '20px',
      borderBottom: '2px solid #a63a3a',
      paddingBottom: '10px',
    },
    cardIcon: { width: '50px', height: '50px', marginRight: '15px', borderRadius: '50%' },
    cardTitle: { fontSize: '1.6rem', margin: 0, fontWeight: '800' },

    itemRow: { marginBottom: '18px' },
    itemMain: { display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' },
    itemName: { fontWeight: '700', fontSize: '1.1rem' },
    itemPrice: { fontWeight: 'bold', color: '#a63a3a', fontSize: '1.1rem' },

    // --- 底部重新設計：取消白霧遮罩，改用文字描邊 ---
    footer: {
      marginTop: '120px',
      display: 'flex',
      justifyContent: 'center',
      padding: '0 20px'
    },
    footerContainer: {
      position: 'relative',
      width: '100%',
      maxWidth: '700px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    footerImg: {
      width: '100%',
      height: 'auto',
      borderRadius: '30px',
      opacity: 0.6, // 降低透明度讓它更像背景
      filter: 'grayscale(20%)'
    },
    footerOverlay: {
      position: 'absolute',
      textAlign: 'center',
      width: '85%',
      color: '#5d4037',
      // 使用 Text-Shadow 代替白霧遮罩，確保文字清晰但不擋圖
      textShadow: '2px 2px 4px rgba(255,255,255,0.9), -2px -2px 4px rgba(255,255,255,0.9), 2px -2px 4px rgba(255,255,255,0.9), -2px 2px 4px rgba(255,255,255,0.9)',
      fontWeight: 'bold',
      lineHeight: '2.2',
      fontSize: 'clamp(0.9rem, 2.8vw, 1.2rem)'
    }
  };

  if (loading) return <div style={{textAlign:'center', marginTop:'100px', fontSize:'1.5rem', color:'#a63a3a'}}>🏮 溫灶咖生火中...</div>;

  return (
    <div style={styles.wrapper}>
      <header style={styles.header}>
        <h1 style={styles.title}>溫 灶 咖</h1>
        <p style={{color:'#8d7765', letterSpacing:'4px', fontWeight:'bold'}}>ベビーカステラ | 手作雞蛋糕</p>
      </header>

      <main style={styles.main}>
        <div style={styles.cardGrid}>
          {data.menu && data.menu.map((cat, idx) => (
            <div 
              key={idx} 
              style={styles.card}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={styles.cardHeader}>
                <img src={CAT_ICONS[idx]} alt="icon" style={styles.cardIcon} />
                <h2 style={styles.cardTitle}>{cat.category}</h2>
              </div>
              {cat.items && cat.items.map((item, i) => (
                <div key={i} style={styles.itemRow}>
                  <div style={styles.itemMain}>
                    <span>
                      <span style={styles.itemName}>{item.name}</span>
                      <small style={{color:'#999', marginLeft:'6px'}}>{item.note}</small>
                    </span>
                    <span style={styles.itemPrice}>${item.price || '--'}</span>
                  </div>
                  {item.options && (
                    <div style={{fontSize:'0.85rem', color:'#8d7765', marginTop:'3px'}}>○ {item.options.join(' / ')}</div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>

        <footer style={styles.footer}>
          <div style={styles.footerContainer}>
            <img src={FOOTER_BG} alt="footer" style={styles.footerImg} />
            <div style={styles.footerOverlay}>
              <p style={{fontSize: '1.3em', color: '#a63a3a', marginBottom: '10px'}}>{data.shopInfo.description}</p>
              <p>📍 {data.shopInfo.address}</p>
              <p style={{fontSize: '1.2em', color: '#a63a3a'}}>|| {data.shopInfo.lineNotice} ||</p>
              <p style={{fontSize: '0.7em', color: '#999', marginTop: '20px'}}>© 2026 Wen Kitchen 溫灶咖</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;
