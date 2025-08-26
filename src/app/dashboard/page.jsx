import LeftScreen from "../../../component/MainScreen/LeftScreen";
import MidScreen from "../../../component/MainScreen/MidScreen";
import RightScreen from "../../../component/MainScreen/RightScreen";
import Top from "../../../component/nav/Top";

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