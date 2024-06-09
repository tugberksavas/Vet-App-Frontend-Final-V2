
import React from 'react';
import { Link } from 'react-router-dom';
import PetsIcon from '@mui/icons-material/Pets';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <h1 className="home-text">Tugberk-Vet-APP</h1>
      <p className="home-paragraph">
        Uygulama içinde yapabilecekleriniz hakkında kısa bir bilgilendime!
      </p>
      <ul className="home-list">
        <li className="home-list-item">
          Müşteri Yönetimi: Uygulamada müşteri profilleri kolayca
          oluşturulabilir ve yönetilebilir.
        </li>
        <li className="home-list-item">
          Doktor Yönetimi: Veteriner hekimlerin profilleri uygulamaya kolayca
          eklenebilir ve saklanabilir.
        </li>
        <li className="home-list-item">
          Hayvan Yönetimi: Hayvanların bilgileri uygulamaya kolayca
          eklenebilir ve saklanabilir.
        </li>
        <li className="home-list-item">
          Randevu Yönetimi: Hayvanlar için randevu oluşturulabilir.
        </li>
        <li className="home-list-item">
          Rapor Yazma: Veteriner hekimler, muayene sonuçları hakkındaki
          bilgileri içeren raporlar oluşturabilir.
        </li>
        <li className="home-list-item">
          Aşı Bilgileri: Hayvanların aşı takibi önemlidir. Bu uygulama,
          her bir evcil hayvan için aşı bilgilerini saklar.
        </li>
        <li className="home-list-item">
          Kolay Arama ve Filtreleme: Uygulama, müşterilerin, doktorların,
          hayvanların, randevuların ve raporların hızlıca aranmasını ve
          filtrelenmesini sağlar.
        </li>
      </ul>
      <p className="home-paragraph">
        "Veterinerlik tarih boyunca insanlığın en önemli dostlarına sunduğu
        özenli bakım ile bilinir."
      </p>
      <Link to="/customer" className="login-button">HOSGELDİNİZ</Link>
    </div>
  );
}

export default Home;


Home.jsx

