import Camera from "./Camera/Camera";
import "./ExploreContainer.css";

const ExploreContainer: React.FC = () => {
  return (
    <div id="container">
      <div className="camera-container">
        <Camera />
      </div>
    </div>
  );
};

export default ExploreContainer;
