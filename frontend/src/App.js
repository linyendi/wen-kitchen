import React, { useState, useEffect } from 'react';

// --- 全新的生成式 AI 插畫網址 (符合智慧財產權，專為溫灶咖設計) ---
// 頭部兩側的插畫 (雞蛋糕與茶壺)
const HEADER_ILLUST = 'https://ai-paper-shelf.s3.us-west-2.amazonaws.com/wen_kitchen/header_illust.png'; 
// 商品分類卡片的小圖示 (雞蛋、蛋糕、茶杯)
const CAT_ICONS = [
  'https://ai-paper-shelf.s3.us-west-2.amazonaws.com/wen_kitchen/icon_egg.png',
  'https://ai-paper-shelf.s3.us-west-2.amazonaws.com/wen_kitchen/icon_cake.png',
  'https://ai-paper-shelf.s3.us-west-2.amazonaws.com/wen_kitchen/icon_tea.png'
];
// 尾部店家資訊旁邊的插畫 (可愛告示牌風)
const FOOTER_ILLUST = 'https://ai-paper-shelf.s3.us-west-2.amazonaws.com/wen_kitchen/footer_illust.png';

// 網頁背景圖 (淡淡的紙張紋理)
const PAPER_TEXTURE = 'https://ai-paper-shelf.s3.us-west-2.amazonaws.com/wen_kitchen/paper_texture.png';

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

  // --- 現代日系風格 CSS 設計 ---
  const styles = {
    // 整體背景：紙張紋理，營造溫暖感
    wrapper: {
      minHeight: '100vh',
      backgroundColor: '#fdfcf8',
      backgroundImage: `url(${PAPER_TEXTURE})`, 
      backgroundSize: '200px', // 讓紋理細緻一點
      fontFamily: '"Noto Sans TC", sans-serif', 
      color: '#444',
      margin: 0,
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
    },

    // 1. 頭部區塊 (Header)
    header: {
      textAlign: 'center',
      padding: '60px 20px',
      position: 'relative',
      backgroundImage: `url(${HEADER_ILLUST})`, // 頭部插畫背景
      backgroundSize: 'contain',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    },
    title: { 
      color: '#b71c1c', 
      fontSize: '4.5rem', // 再次放大字體！
      margin: 0, 
      fontWeight: '900',
      letterSpacing: '15px',
      textShadow: '2px 2px 4px rgba(0,0,0,0.1)', // 加上一點點陰影，更有質感
    },
    subTitle: { color: '#8d7765', fontSize: '1.1rem', marginTop: '10px' },

    // 2. 主體區塊 (Main) - 採用格狀佈局 (Grid) 讓卡片並列
    main: {
      flex: 1, // 撐開中間區域
      maxWidth: '1200px', // 限制最大寬度，防止在大螢幕上拉得太開
      margin: '0 auto',
      padding: '40px 20px',
      width: '100%',
      boxSizing: 'border-box',
    },
    // 商品卡片格狀容器
    cardGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', // 關鍵：自動適應排版
      gap: '30px', // 卡片之間的間距
    },
    // 商品卡片樣式
    card: {
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      borderRadius: '20px',
      padding: '30px',
      border: '2px solid #e0e0e0',
      boxShadow: '0 8px 16px rgba(0,0,0,0.05)',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative', // 為了定位小圖示
      transition: 'transform 0.3s ease', // 加上一點滑鼠懸停效果
      cursor: 'default',
    },
    // 卡片內部的分類標題
    cardHeader: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '20px',
      paddingBottom: '10px',
      borderBottom: '2px solid #8d7765',
    },
    cardIcon: {
      width: '40px',
      height: '40px',
      marginRight: '15px',
    },
    cardTitle: {
      color: '#5d4037',
      fontSize: '1.5rem',
      margin: 0,
      fontWeight: 'bold',
    },

    // 卡片內部的商品項目
    itemRow: { marginBottom: '15px', display: 'flex', flexDirection: 'column' },
    itemMain: { display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' },
    itemName: { fontWeight: 'bold', fontSize: '1.1rem' },
    itemNote: { color: '#999', fontSize: '0.85rem', marginLeft: '6px', fontWeight: 'normal' },
    itemPrice: { fontWeight: 'bold', color: '#b71c1c', fontSize: '1.1rem', marginLeft: '10px' },
    itemOptions: { color: '#8d7765', fontSize: '0.85rem', marginTop: '3px' },

    // 3. 尾部區塊 (Footer) - 店家資訊設計
    footer: {
      marginTop: 'auto', // 保持在最底部
      padding: '60px 20px',
      backgroundColor: '#f1ede4', // 比底色深一點的米色
      borderTop: '3px solid #b71c1c',
      textAlign: 'center',
    },
    footerContainer: {
      maxWidth: '600px',
      margin: '0 auto',
      position: 'relative',
      paddingRight: '120px', // 留空間給插畫
    },
    footerIllust: {
      position: 'absolute',
      right: '-20px',
      bottom: '-10px',
      width: '150px',
      height: '150px',
    },
    footerTitle: {
      color: '#b71c1c',
      fontWeight: 'bold',
      fontSize: '1.2rem',
      marginBottom: '15px',
    },
    footerText: { margin: '8px 0', fontSize: '1rem', color: '#555' },
    lineNotice: {
      display: 'inline-block',
      border: '2px solid #5d4037',
      padding: '5px 15px',
      borderRadius: '10px',
      color: '#5d4037',
      fontWeight: 'bold',
      marginTop: '15px',
    }
  };

  if (loading) return (
    <div style={{height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#fdfcf8', color: '#b71c1c', fontSize: '1.2rem'}}>
      🏮 溫灶咖正在生火加熱中...
    </div>
  );

  return (
    <div style={styles.wrapper}>
      {/* 1. 頭部區塊 */}
      <header style={styles.header}>
        <h1 style={styles.title}>溫 灶 咖</h1>
        <p style={styles.subHeader}>ベビーカステラ</p>
      </header>

      {/* 2. 主體區塊 */}
      <main style={styles.main}>
        <div style={styles.cardGrid}>
          {data.menu && data.menu.map((cat, idx) => (
            // 分類卡片
            <div key={idx} style={styles.card}>
              {/* 卡片頭部：插畫小圖示 + 標題 */}
              <div style={styles.cardHeader}>
                <img src={CAT_ICONS[idx % CAT_ICONS.length]} alt="icon" style={styles.cardIcon} />
                <h2 style={styles.cardTitle}>{cat.category}</h2>
              </div>

              {/* 卡片內容：商品清單 */}
              {cat.items && cat.items.map((item, i) => (
                <div key={i} style={styles.itemRow}>
                  <div style={styles.itemMain}>
                    <span style={styles.itemName}>
                      {item.name}
                      {item.note && <span style={styles.itemNote}>({item.note})</span>}
                    </span>
                    <span style={styles.itemPrice}>{item.price ? `$${item.price}` : '--'}</span>
                  </div>
                  {/* 顯示選填選項 */}
                  {item.options && item.options.length > 0 && (
                    <small style={styles.itemOptions}>
                      ○ {item.options.join(' / ')}
                    </small>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </main>

      {/* 3. 尾部區塊 */}
      <footer style={styles.footer}>
        <div style={styles.footerContainer}>
          {/* 尾部告示牌風插畫 */}
          <img src={FOOTER_ILLUST} alt="illust" style={styles.footerIllust} />
          <p style={styles.footerTitle}>{data.shopInfo.description}</p>
          <p style={styles.footerText}>📍 店址：{data.shopInfo.address}</p>
          <div style={styles.lineNotice}>{data.shopInfo.lineNotice}</div>
          <p style={{fontSize: '0.8rem', color: '#aaa', marginTop: '20px'}}>© 2026 Wen Kitchen</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
