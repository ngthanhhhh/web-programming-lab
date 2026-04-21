import banner from "../assets/images/banner.jpg";

export default function About() {
  return (
    <div className="about-lux">

      {/* HERO */}
      <section className="lux-hero">
        <img src={banner} alt="beauty" />
        <div className="lux-overlay">
          <h1>Beauty Store</h1>
          <p>Tôn vinh vẻ đẹp tự nhiên của bạn</p>
        </div>
      </section>

      {/* TEXT */}
      <section className="lux-content">
        <div className="lux-divider"></div>

        <h2>Trải nghiệm chăm sóc da tinh tế</h2>

        <p>
          Những sản phẩm được tuyển chọn kỹ lưỡng, đảm bảo an toàn và hiệu quả.
        </p>

        <p>
          Tối giản, tinh tế và hiệu quả — giúp tôn lên vẻ đẹp tự nhiên của bạn.
        </p>
      </section>

      {/* SIGNATURE */}
      <section className="lux-sign">
        <p>— Beauty Store</p>
      </section>

    </div>
  );
}