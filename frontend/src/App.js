import React, { useState } from 'react';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#fdf5e6', fontFamily: 'serif', minHeight: '100vh' }}>
      {/* 紅磚風主視覺 */}
      <div style={{ 
        backgroundColor: '#8b0000', 
        height: '350px', 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center', 
        justifyContent: 'center',
        color: 'white',
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url("https://images.unsplash.com/photo-1516216628859-9bccecab13ca?q=80&w=2000")',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <h1 style={{ fontSize: '3.5rem', margin: 0, textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>溫灶咖</h1>
        <p style={{ letterSpacing: '8px', marginTop: '15px', fontSize: '1.2rem' }}>回到紅磚房的溫馨時光</p>
      </div>

      {/* 菜單展示區 */}
      <div style={{ maxWidth: '700px', margin: '0 auto', padding: '40px 20px' }}>
        <h2 style={{ color: '#8b0000', borderBottom: '3px solid #8b0000', paddingBottom: '10px', textAlign: 'center' }}>- 傳統手作菜單 -</h2>
        
        {/* 雞蛋燒 */}
        <div style={{ marginTop: '30px' }}>
            <h3 style={{ backgroundColor: '#8b0000', color: 'white', padding: '5px 20px', display: 'inline-block', borderRadius: '0 15px 15px 0' }}>雞蛋燒</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 10px', borderBottom: '1px dashed #8b0000' }}>
                <span>肉鬆起司蛋 <small style={{color: '#d97706', fontWeight: 'bold'}}>(熱銷)</small></span>
                <span style={{ color: '#8b0000', fontWeight: 'bold' }}>$45</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 10px', borderBottom: '1px dashed #8b0000' }}>
                <span>只有肉鬆蛋</span>
                <span style={{ color: '#8b0000', fontWeight: 'bold' }}>$40</span>
            </div>
        </div>

        {/* 雞蛋糕 */}
        <div style={{ marginTop: '30px' }}>
            <h3 style={{ backgroundColor: '#8b0000', color: 'white', padding: '5px 20px', display: 'inline-block', borderRadius: '0 15px 15px 0' }}>雞蛋糕</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 10px', borderBottom: '1px dashed #8b0000' }}>
                <span>古早味雞蛋糕</span>
                <span style={{ color: '#8b0000', fontWeight: 'bold' }}>$20</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 10px', borderBottom: '1px dashed #8b0000' }}>
                <span>香濃奶酥</span>
                <span style={{ color: '#8b0000', fontWeight: 'bold' }}>$35</span>
            </div>
        </div>
      </div>

      {/* 底部管理入口 */}
      <footer style={{ textAlign: 'center', padding: '60px 20px', backgroundColor: '#eee', marginTop: '40px' }}>
        <p>© 溫灶咖 - 品牌專屬網站</p>
        <button onClick={() => {
            const pwd = prompt("請輸入管理員密碼：");
            if(pwd === "wen888") alert("驗證成功！即將進入編輯模式（開發中）");
        }} style={{ background: 'none', border: 'none', color: '#999', cursor: 'pointer', fontSize: '0.8rem' }}>管理者登入</button>
      </footer>
    </div>
  );
}

export default App;
