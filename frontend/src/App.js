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
      // 修改：漸層背景增加層次感 (由暖米色到象牙白)
      backgroundImage: `linear-gradient(to bottom, #fdf5e6 0%, rgba(253, 252, 248, 0.96) 50%, #fff 100%), url(${BACKGROUND_IMG})`,
      backgroundSize: 'cover',
      backgroundAttachment: 'fixed',
      fontFamily: '"Noto Sans TC", sans-serif',
      color: '#5d4037',
    },
    header: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '70px 20px 30px',
    },
    main: { maxWidth: '1200px', margin: '0 auto', padding: '0 20px' },
    cardGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
      gap: '40px',
    },
    card: {
      backgroundColor: 'rgba(255, 253, 249, 0.8)', 
      borderRadius: '30px',
      padding: '35px',
      boxShadow: '0 15px 35px rgba(166, 58, 58, 0.06)',
      border: '1px solid rgba(166, 58, 58, 0.05)',
      backdropFilter: 'blur(8px)',
      transition: 'all 0.4s ease',
    },
    // 新的底部佈局設計
    footer: {
      marginTop: '100px',
      padding: '60px 20px 100px',
      display: 'flex',
      justifyContent: 'center',
    },
    footerLayout: {
      maxWidth: '900px',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: 'rgba(255, 255, 255, 0.4)',
      borderRadius: '40px',
      padding: '40px',
      flexWrap: 'wrap',
      gap: '30px',
      border: '1px solid rgba(255, 255, 255, 0.6)',
    },
    footerInfo: { flex: '1 1 300px', textAlign: 'left' },
    footerImgBox: { 
      flex: '0 1 350px',
      maskImage: 'radial-gradient(circle, black 60%, transparent 95%)',
      WebkitMaskImage: 'radial-gradient(circle, black 60%, transparent 95%)',
    }
  };

  if (loading) return <div style={{textAlign:'center', padding:'100px'}}>🏮 溫灶咖暖鍋中...</div>;

  return (
    <div style={styles.wrapper}>
      <style>{`
        .arc-title { fill: #a63a3a; font-weight: 900; letter-spacing: 12px; font-size: 52px; }
        .deco-line { stroke: #a63a3a; stroke-width: 2; opacity: 0.3; stroke-dasharray: 5, 5; }
      `}</style>

      <header style={styles.header}>
        <svg width="800" height="160" viewBox="0 0 800 160" style={{maxWidth: '100%'}}>
          <path className="deco-line" d="M 50,120 Q 150,120 220,100" fill="transparent" />
          <path id="curve" fill="transparent" d="M 250,130 A 150,90 0 0,1 550,130" />
          <text className="arc-title">
            <textPath href="#curve" startOffset="50%" textAnchor="middle">溫 灶 咖</textPath>
          </text>
          <path className="deco-line" d="M 580,100 Q 650,120 750,120" fill="transparent" />
        </svg>
        <p style={{color:'#8d7765', letterSpacing:'4px', fontWeight:'bold', marginTop:'-15px'}}>
          ベビーカステラ | 手作雞蛋糕專賣
        </p>
      </header>

      <main style={styles.main}>
        <div style={styles.cardGrid}>
          {data.menu && data.menu.map((cat, idx) => (
            <div 
              key={idx} 
              style={styles.card}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-10px)'; e.currentTarget.style.backgroundColor = 'rgba(255, 253, 249, 0.95)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.backgroundColor = 'rgba(255, 253, 249, 0.8)'; }}
            >
              <div style={{display:'flex', alignItems:'center', marginBottom:'25px', borderBottom:'2.5px solid #a63a3a', paddingBottom:'12px'}}>
                <img src={CAT_ICONS[idx]} alt="icon" style={{width:'55px', height:'55px', marginRight:'15px', borderRadius:'50%', boxShadow:'0 4px 8px rgba(0,0,0,0.1)'}} />
                <h2 style={{fontSize:'1.6rem', margin:0, fontWeight:'900'}}>{cat.category}</h2>
              </div>
              {cat.items && cat.items.map((item, i) => (
                <div key={i} style={{marginBottom:'20px'}}>
                  <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline'}}>
                    <span>
                      <span style={{fontWeight:'700', fontSize:'1.1rem'}}>{item.name}</span>
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

        <footer style={styles.footer}>
          <div style={styles.footerLayout}>
            {/* 左側：清楚的店家資訊 */}
            <div style={styles.footerInfo}>
              <h3 style={{fontSize:'1.6rem', color:'#a63a3a', marginBottom:'15px', fontWeight:'900'}}>{data.shopInfo.description}</h3>
              <p style={{fontSize:'1.1rem', margin:'10px 0'}}>📍 店址：{data.shopInfo.address}</p>
              <div style={{display:'inline-block', backgroundColor:'#a63a3a', color:'#fff', padding:'8px 20px', borderRadius:'12px', marginTop:'15px', fontWeight:'bold'}}>
                📲 {data.shopInfo.lineNotice}
              </div>
              <p style={{fontSize:'0.8rem', color:'#bbb', marginTop:'30px'}}>© 2026 Wen Kitchen 溫灶咖</p>
            </div>
            {/* 右側：品牌插圖點綴 */}
            <div style={styles.footerImgBox}>
              <img src={FOOTER_BG} alt="footer illust" style={{width:'100%', borderRadius:'20px'}} />
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;
