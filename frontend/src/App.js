import React, { useState, useEffect } from 'react';

// 這是我們為「溫灶咖」生成的專屬背景圖（半透明手繪風）
const BACKGROUND_URL = 'https://images.unsplash.com/photo-1612202027150-e74a814be394?q=80&w=1600&auto=format&fit=crop'; 

function App() {
  const [data, setData] = useState({ menu: [], shopInfo: {} });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 串接 Render 後端 API
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

  // --- CSS 樣式設計 (大升級) ---
  const styles = {
    // 整體背景：米白色紙張質感 + 專屬背景圖
    wrapper: {
      minHeight: '100vh',
      backgroundColor: '#fdfcf8', // 淡淡的米白色，模擬紙張
      backgroundImage: `linear-gradient(rgba(253, 252, 248, 0.9), rgba(253, 252, 248, 0.9)), url(${BACKGROUND_URL})`, // 疊加一層半透明米色，讓文字清晰
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      fontFamily: '"Noto Sans TC", sans-serif', // 建議加入繁體中文字型
      color: '#333',
      padding: '20px',
    },
    // 主容器：模仿實體菜單的整齊感
    container: { maxWidth: '500px', margin: '0 auto', },
    
    // 標題：深紅色，大氣醒目
    header: { 
      textAlign: 'center', 
      color: '#b71c1c', // 深紅色
      letterSpacing: '5px',
      fontSize: '2.5rem',
      margin: '40px 0',
      borderBottom: '2px solid #b71c1c',
      paddingBottom: '10px'
    },

    // 分類標籤：圓角、深色背景，模仿實體菜單的標籤
    categoryTag: {
      backgroundColor: '#5d4037', // 深棕色，像實體菜單的標籤色
      color: '#fff',
      padding: '5px 20px',
      borderRadius: '20px',
      fontSize: '1.1rem',
      fontWeight: 'bold',
      display: 'inline-block',
      margin: '30px 0 15px 0',
    },

    // 品項排版：使用 flex 讓品項、虛線、價格整齊對齊
    item: { 
      display: 'flex', 
      alignItems: 'baseline', 
      margin: '12px 0', 
      fontSize: '1.05rem', 
    },
    itemName: { fontWeight: 'bold' },
    itemNote: { color: '#888', fontSize: '0.9rem', marginLeft: '5px' },
    itemOptions: { display: 'block', color: '#5d4037', fontSize: '0.85rem', marginTop: '3px' }, // 選項樣式
    dottedLine: { flex: 1, borderBottom: '1px dashed #bbb', margin: '0 10px', height: '1px' }, // 虛線對齊
    itemPrice: { fontWeight: 'bold', color: '#b71c1c', minWidth: '40px', textAlign: 'right' }, // 價格樣式

    // 底部店家資訊：深色區塊，模仿實體菜單底部
    footer: {
      marginTop: '60px',
      padding: '30px',
      backgroundColor: '#f1ede4', // 比底色深一點的米色
      borderTop: '3px solid #b71c1c',
      borderRadius: '10px',
      textAlign: 'center',
      fontSize: '0.95rem',
      lineHeight: '1.8',
    },
    footerHighlight: { color: '#b71c1c', fontWeight: 'bold', fontSize: '1rem' }
  };

  if (loading) return <div style={{textAlign:'center', marginTop:'50px', color:'#b71c1c'}}>🏮 溫灶咖正在生火加熱中...</div>;

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <h1 style={styles.header}>溫 灶 咖</h1>
        
        {data.menu.map((cat, idx) => (
          <div key={idx}>
            <div style={styles.categoryTag}>{cat.category}</div>
            
            {cat.items.map((item, i) => (
              <div key={i} style={{marginBottom:'15px'}}>
                <div style={styles.item}>
                  <span style={styles.itemName}>
                    {item.name}
                    {item.note && <small style={styles.itemNote}>{item.note}</small>}
                  </span>
                  <div style={styles.dottedLine}></div> {/* 虛線對齊 */}
                  <span style={styles.itemPrice}>{item.price ? `$${item.price}` : '--'}</span>
                </div>
                {/* --- 顯示選填選項 (如：全熟蛋) --- */}
                {item.options && item.options.length > 0 && (
                  <small style={styles.itemOptions}>
                    (可選: {item.options.join(', ')})
                  </span>
                )}
              </div>
            ))}
          </div>
        ))}

        {/* --- 底部店家資訊 --- */}
        <div style={styles.footer}>
          <p style={styles.footerHighlight}>{data.shopInfo.description}</p>
          <p>📍 店址：{data.shopInfo.address}</p>
          <p><strong>|| {data.shopInfo.lineNotice} ||</strong></p>
          <p style={{fontSize:'0.8rem', color:'#aaa', marginTop:'20px'}}>© 2026 Wen Kitchen</p>
        </div>
      </div>
    </div>
  );
}

export default App;
