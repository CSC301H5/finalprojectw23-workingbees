import { useNavigate, useLocation } from "react-router-dom";
import "./Style.css"
import QuestionList from "./QuestionList";
import Navbar from "./Navbar";
import hives from "../Assets/hives.png";

const ConfigRoom = () => {

    const location = useLocation();
    const navigate = useNavigate();

    return (
        <div class="grid">
            <div class="left">
                <img src={hives} alt="" />
            </div>
            <div class="right">
                <Navbar />
                <div className="config">
                    <h2>Room configuration</h2>
                    <QuestionList
                        token={location.state.token}
                        profilePicture={location.state.profilePicture}
                        hiveName={location.state.hiveName}
                        displayName={location.state.displayName}
                        navigateFunction={navigate}
                        navigatePath={"/waiting1"}
                    />
                </div>
            </div>
        </div>
    );
}
export default ConfigRoom
