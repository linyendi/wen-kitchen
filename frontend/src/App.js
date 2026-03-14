import React, { useState, useEffect } from 'react';

// --- 圖片 Raw 網址 ---
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
    // 注入 Google Fonts 增加日系質感
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@700;900&family=Noto+Sans+TC:wght@400;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

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
      backgroundImage: `linear-gradient(rgba(253, 252, 248, 0.92), rgba(253, 252, 248, 0.92)), url(${BACKGROUND_IMG})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      fontFamily: '"Noto Sans TC", sans-serif',
      color: '#444',
      paddingBottom: '80px'
    },
    header: {
      textAlign: 'center',
      padding: '100px 20px 60px',
    },
    title: { 
      fontFamily: '"Noto Serif TC", serif', // 使用宋體增加質感
      fontSize: '4.8rem', 
      color: '#a63a3a', 
      margin: 0, 
      fontWeight: '900', 
      letterSpacing: '18px' 
    },
    main: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 20px',
    },
    cardGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
      gap: '40px',
    },
    card: {
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderRadius: '30px',
      padding: '35px',
      border: '1px solid rgba(166, 58, 58, 0.1)',
      // 多層次柔和陰影
      boxShadow: '0 10px 30px rgba(0,0,0,0.05), 0 1px 8px rgba(0,0,0,0.02)',
      transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      cursor: 'pointer',
    },
    cardHeader: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '25px',
      borderBottom: '2.5px solid #a63a3a',
      paddingBottom: '12px',
    },
    cardIcon: { width: '55px', height: '55px', marginRight: '18px', borderRadius: '50%', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' },
    cardTitle: { fontFamily: '"Noto Serif TC", serif', color: '#5d4037', fontSize: '1.7rem', margin: 0 },

    itemRow: { marginBottom: '20px' },
    itemMain: { display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' },
    itemName: { fontWeight: '700', fontSize: '1.15rem', color: '#333' },
    itemPrice: { fontWeight: '900', color: '#a63a3a', fontSize: '1.2rem', fontFamily: 'Arial' },

    footer: {
      marginTop: '100px',
      display: 'flex',
      justifyContent: 'center',
      padding: '0 20px'
    },
    footerContainer: {
      position: 'relative',
      width: '100%',
      maxWidth: '650px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    footerImg: {
      width: '100%',
      height: 'auto',
      borderRadius: '25px',
      opacity: 0.8, // 圖片稍微淡化
      filter: 'sepia(15%) brightness(1.05)', // 增加一點暖色調
      boxShadow: '0 15px 40px rgba(0,0,0,0.08)'
    },
    footerOverlay: {
      position: 'absolute',
      textAlign: 'center',
      width: '75%',
      color: '#5d4037',
      padding: '20px',
      // 在文字後墊一層極淡的白霧，增加可讀性
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      backdropFilter: 'blur(3px)',
      borderRadius: '15px',
      fontSize: 'clamp(0.85rem, 2.2vw, 1.15rem)',
      lineHeight: '1.8'
    }
  };

  if (loading) return <div style={{height:'100vh', display:'flex', justifyContent:'center', alignItems:'center', fontSize:'1.5rem', color:'#a63a3a'}}>🏮 溫灶咖生火中...</div>;

  return (
    <div style={styles.wrapper}>
      <header style={styles.header}>
        <h1 style={styles.title}>溫 灶 咖</h1>
        <p style={{color:'#8d7765', letterSpacing:'4px', fontWeight:'700', marginTop:'15px'}}>ベビーカステラ | 手作雞蛋糕</p>
      </header>

      <main style={styles.main}>
        <div style={styles.cardGrid}>
          {data.menu && data.menu.map((cat, idx) => (
            <div 
              key={idx} 
              style={styles.card}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-8px)'}
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
                      <small style={{color:'#999', marginLeft:'8px'}}>{item.note}</small>
                    </span>
                    <span style={styles.itemPrice}>${item.price || '--'}</span>
                  </div>
                  {item.options && (
                    <div style={{fontSize:'0.85rem', color:'#8d7765', marginTop:'4px'}}>○ {item.options.join(' / ')}</div>
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
              <p style={{fontFamily:'"Noto Serif TC", serif', fontWeight:'bold', fontSize:'1.2em', marginBottom:'15px'}}>{data.shopInfo.description}</p>
              <p>📍 {data.shopInfo.address}</p>
              <p style={{marginTop:'10px', fontSize:'1.3em', color:'#a63a3a', fontWeight:'900'}}>
                || {data.shopInfo.lineNotice} ||
              </p>
              <p style={{fontSize:'0.75em', color:'#999', marginTop:'20px'}}>© 2026 Wen Kitchen 溫灶咖</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;
