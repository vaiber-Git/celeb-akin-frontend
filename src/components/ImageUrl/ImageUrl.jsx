import "./ImageUrl.css";

const ImageUrl = ({ onInputChange, onButtonSubmit, faceIdentified }) => {
  return (
    <div>
      <p className="f3">Find Your Celebrity Look Alike</p>
      <br />
      <p className="f3">{faceIdentified}</p>
      <div className="center">
        <div className="form center pa4 br3 shadow-5">
          <input
            type="text"
            onChange={onInputChange}
            placeholder={"Put URL of your picture"}
            className="f4 pa2 w-70"
          />
          <button
            onClick={onButtonSubmit}
            className="w-30 grow f4  link ph3 pv2 dib white bg-light-purple"
          >
            Detect
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageUrl;
