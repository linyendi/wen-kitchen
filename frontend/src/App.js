import React, { useState, useEffect } from 'react';

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
      .catch(error => console.error('Error:', error));
  }, []);

  const styles = {
    wrapper: {
      minHeight: '100vh',
      backgroundImage: `linear-gradient(rgba(253, 252, 248, 0.94), rgba(253, 252, 248, 0.94)), url(${BACKGROUND_IMG})`,
      backgroundSize: 'cover',
      backgroundAttachment: 'fixed',
      fontFamily: '"Noto Sans TC", sans-serif',
      color: '#5d4037',
      overflowX: 'hidden'
    },
    // --- 弧形標題區塊 ---
    header: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '60px 20px 20px',
    },
    main: { maxWidth: '1200px', margin: '0 auto', padding: '0 20px' },
    cardGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
      gap: '35px',
    },
    // --- 卡片與動畫效果 ---
    card: {
      backgroundColor: 'rgba(255, 255, 255, 0.88)',
      borderRadius: '28px',
      padding: '30px',
      boxShadow: '0 8px 30px rgba(166, 58, 58, 0.04)',
      border: '1px solid rgba(255, 255, 255, 0.6)',
      transition: 'all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)',
      animation: 'fadeInUp 0.8s ease backwards',
    },
    // --- 底部無縫融入設計 ---
    footer: {
      marginTop: '100px',
      display: 'flex',
      justifyContent: 'center',
      padding: '0 20px 80px'
    },
    footerContainer: {
      position: 'relative',
      width: '100%',
      maxWidth: '650px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      // 讓底圖邊緣羽化，完美融入背景
      maskImage: 'radial-gradient(circle, black 60%, transparent 95%)',
      WebkitMaskImage: 'radial-gradient(circle, black 60%, transparent 95%)',
    },
    footerOverlay: {
      position: 'absolute',
      textAlign: 'center',
      width: '80%',
      color: '#5d4037',
      textShadow: '0 0 10px rgba(255,255,255,1), 0 0 5px rgba(255,255,255,0.8)',
      fontWeight: 'bold',
      lineHeight: '2.2',
      fontSize: 'clamp(0.9rem, 2.5vw, 1.15rem)'
    }
  };

  if (loading) return <div style={{textAlign:'center', marginTop:'100px', fontSize:'1.2rem'}}>🏮 正在為您暖鍋中...</div>;

  return (
    <div style={styles.wrapper}>
      {/* 注入動畫 CSS */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .arc-title { fill: #a63a3a; font-weight: 900; letter-spacing: 12px; font-size: 55px; }
      `}</style>

      <header style={styles.header}>
        {/* --- 使用 SVG 製作弧形店名 --- */}
        <svg width="500" height="180" viewBox="0 0 500 180">
          <path id="curve" fill="transparent" d="M 50,150 A 250,150 0 0,1 450,150" />
          <text className="arc-title">
            <textPath href="#curve" startOffset="50%" textAnchor="middle">
              溫 灶 咖
            </textPath>
          </text>
        </svg>
        <p style={{color:'#8d7765', letterSpacing:'5px', fontWeight:'bold', marginTop:'-20px'}}>
          ベビーカステラ | 手作雞蛋糕
        </p>
      </header>

      <main style={styles.main}>
        <div style={styles.cardGrid}>
          {data.menu && data.menu.map((cat, idx) => (
            <div 
              key={idx} 
              style={{...styles.card, animationDelay: `${idx * 0.2}s`}}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 15px 45px rgba(166, 58, 58, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = styles.card.boxShadow;
              }}
            >
              <div style={{display:'flex', alignItems:'center', marginBottom:'20px', borderBottom:'2px solid #a63a3a', paddingBottom:'10px'}}>
                <img src={CAT_ICONS[idx]} alt="icon" style={{width:'50px', height:'50px', marginRight:'15px', borderRadius:'50%'}} />
                <h2 style={{fontSize:'1.6rem', margin:0}}>{cat.category}</h2>
              </div>
              {cat.items && cat.items.map((item, i) => (
                <div key={i} style={{marginBottom:'18px'}}>
                  <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline'}}>
                    <span>
                      <span style={{fontWeight:'700'}}>{item.name}</span>
                      <small style={{color:'#999', marginLeft:'6px'}}>{item.note}</small>
                    </span>
                    <span style={{fontWeight:'bold', color:'#a63a3a'}}>${item.price || '--'}</span>
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
            <img src={FOOTER_BG} alt="footer" style={{width:'100%', borderRadius:'40px', opacity:0.75}} />
            <div style={styles.footerOverlay}>
              <p style={{fontSize: '1.3em', color: '#a63a3a', marginBottom: '10px'}}>{data.shopInfo.description}</p>
              <p>📍 {data.shopInfo.address}</p>
              <p style={{fontSize: '1.2em', color: '#a63a3a'}}>|| {data.shopInfo.lineNotice} ||</p>
              <p style={{fontSize: '0.7em', color: '#999', marginTop: '20px'}}>© 2026 Wen Kitchen</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;
