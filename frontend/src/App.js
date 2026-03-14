import React, { useState, useEffect } from 'react';

// 圖片網址保持不變
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
      // 加深遮罩，增加溫潤感
      backgroundImage: `linear-gradient(rgba(253, 252, 248, 0.95), rgba(253, 252, 248, 0.95)), url(${BACKGROUND_IMG})`,
      backgroundSize: 'cover',
      backgroundAttachment: 'fixed',
      fontFamily: '"Noto Sans TC", sans-serif',
      color: '#5d4037',
      overflowX: 'hidden'
    },
    header: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '80px 20px 40px',
    },
    main: { maxWidth: '1200px', margin: '0 auto', padding: '0 20px' },
    cardGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
      gap: '40px',
    },
    card: {
      // 改為米色半透明，增加融合度
      backgroundColor: 'rgba(254, 250, 243, 0.75)', 
      borderRadius: '30px',
      padding: '35px',
      boxShadow: '0 10px 40px rgba(166, 58, 58, 0.05)',
      border: '1px solid rgba(255, 255, 255, 0.6)',
      backdropFilter: 'blur(10px)', // 毛玻璃效果提升質感
      transition: 'all 0.4s ease',
      animation: 'fadeInUp 1s ease backwards',
    },
    // 底部背景羽化融合
    footerContainer: {
      position: 'relative',
      width: '100%',
      maxWidth: '750px',
      margin: '0 auto',
      maskImage: 'radial-gradient(circle, black 65%, transparent 100%)',
      WebkitMaskImage: 'radial-gradient(circle, black 65%, transparent 100%)',
      opacity: 0.8
    }
  };

  if (loading) return <div style={{textAlign:'center', padding:'100px'}}>🏮 溫灶咖暖鍋中...</div>;

  return (
    <div style={styles.wrapper}>
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .arc-title { fill: #a63a3a; font-weight: 900; letter-spacing: 12px; font-size: 50px; }
        .decoration-line { stroke: #a63a3a; stroke-width: 2; opacity: 0.4; }
      `}</style>

      <header style={styles.header}>
        {/* 在標題兩側增加裝飾線條，撐開空間 */}
        <svg width="800" height="180" viewBox="0 0 800 180" style={{maxWidth: '100%'}}>
          {/* 左側裝飾 */}
          <path className="decoration-line" d="M 50,140 Q 150,140 200,120" fill="transparent" />
          {/* 弧形標題 */}
          <path id="curve" fill="transparent" d="M 250,150 A 150,100 0 0,1 550,150" />
          <text className="arc-title">
            <textPath href="#curve" startOffset="50%" textAnchor="middle">溫 灶 咖</textPath>
          </text>
          {/* 右側裝飾 */}
          <path className="decoration-line" d="M 600,120 Q 650,140 750,140" fill="transparent" />
        </svg>
        <p style={{color:'#8d7765', letterSpacing:'5px', fontWeight:'bold', marginTop:'-30px'}}>
          ベビーカステラ | 手作雞蛋糕
        </p>
      </header>

      <main style={styles.main}>
        <div style={styles.cardGrid}>
          {data.menu && data.menu.map((cat, idx) => (
            <div 
              key={idx} 
              style={{...styles.card, animationDelay: `${idx * 0.2}s`}}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-12px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{display:'flex', alignItems:'center', marginBottom:'25px', borderBottom:'2px solid #a63a3a', paddingBottom:'12px'}}>
                <img src={CAT_ICONS[idx]} alt="icon" style={{width:'55px', height:'55px', marginRight:'15px', borderRadius:'50%'}} />
                <h2 style={{fontSize:'1.6rem', margin:0, fontWeight:'900'}}>{cat.category}</h2>
              </div>
              {cat.items && cat.items.map((item, i) => (
                <div key={i} style={{marginBottom:'20px'}}>
                  <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline'}}>
                    <span>
                      <span style={{fontWeight:'bold', fontSize:'1.1rem'}}>{item.name}</span>
                      <small style={{color:'#999', marginLeft:'8px'}}>{item.note}</small>
                    </span>
                    <span style={{fontWeight:'900', color:'#a63a3a'}}>${item.price || '--'}</span>
                  </div>
                  {item.options && (
                    <div style={{fontSize:'0.85rem', color:'#8d7765', marginTop:'4px'}}>○ {item.options.join(' / ')}</div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>

        <footer style={{marginTop:'120px', paddingBottom:'80px'}}>
          <div style={styles.footerContainer}>
            <img src={FOOTER_BG} alt="footer" style={{width:'100%', borderRadius:'40px'}} />
            <div style={{position:'absolute', textAlign:'center', width:'75%', textShadow:'0 0 10px white'}}>
              <p style={{fontSize:'1.3em', color:'#a63a3a', fontWeight:'bold'}}>{data.shopInfo.description}</p>
              <p>📍 {data.shopInfo.address}</p>
              <p style={{fontSize:'1.2em', fontWeight:'bold'}}>|| {data.shopInfo.lineNotice} ||</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;
