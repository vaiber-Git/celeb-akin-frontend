const ImageComponent = ({ inputUrl }) => {
  return (
    <div className="center ma">
      <div className="absolute mt2">
        <img alt="" src={inputUrl ? inputUrl : null} width="500px" height="auto" />
      </div>
    </div>
  );
};

export default ImageComponent;
