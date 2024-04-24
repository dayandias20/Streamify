export const Carousel = () => {
  return (
    <div
      className="banner"
      style={{
        backgroundImage: `url(https://png.pngtree.com/background/20210710/original/pngtree-movie-ticket-cinema-promotion-banner-picture-image_1050764.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '300px',
        position: 'relative',
        opacity: 1
      }}
    >
      <div className="banner-content">
        <h1 className="banner-title">Streamify</h1>
        <br />
        <div className="container">
          <div className="row row-cols-lg-2" id="op1">
            <div className="col card text-center" id="op">
              <ul>
                <br />
                <li>
                The premier source of global entertainment metadata and box office revenue
                </li>
                <br />
              </ul>
            </div>
            <div className="col card text-center" id="op">
              <ul>
                <li>10+ million titles</li>
                <li>14+ million cast and crew</li>
                <li>Global Box office data</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}