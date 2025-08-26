import LeftScreen from "../../../pages/MainScreen/LeftScreen";
import MidScreen from "../../../pages/MainScreen/MidScreen";
import RightScreen from "../../../pages/MainScreen/RightScreen";
import Top from "../../../pages/nav/Top";

const Dashboard = () => {
    return (
        <div className="">
            <Top/>
            {/* body */}
            <section className="md:flex h-screen">
                <LeftScreen/>
                <MidScreen/>
                <RightScreen/>
            </section>
        </div>
    )
}

export default Dashboard;