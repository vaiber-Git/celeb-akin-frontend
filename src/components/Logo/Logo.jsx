import Tilt from 'react-parallax-tilt';
import "./Logo.css";
import toro from "./toro.jpg";

const Logo = () => {
  return (
    <div className="ma4 mt0">
      <Tilt className="Tilt br2 shadow-2">
      <div style={{ height: '100px', width: '100px', backgroundColor: 'white'}}>
        <img src={toro} height={"90px"} width={"100px"} alt="Logo" />
      </div>
    </Tilt>
    </div>
  );
};

export default Logo;
