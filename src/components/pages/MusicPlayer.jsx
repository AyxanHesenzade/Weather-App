const MusicPlayer = ({ music }) => {
  if (!music) return null;

  
  const autoPlayLink = `${music}?autoplay=1`;

  return (
    <div className="Music-Player">
      <div>
        <iframe
          width="100%"
          height="200"
          src={autoPlayLink}
          title="Musiqi"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default MusicPlayer;

  