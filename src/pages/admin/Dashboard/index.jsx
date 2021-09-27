import Chart from "../components/Chart/Chart";
import DATA from "../components/Chart/DataChart";
import FeatureInfor from "../components/FeatureInfor/FeatureInfor";
import './Dashboard.scss';


function DashBoardPage() {
  return (
    <div className="dashboard">
        <div className="dashboard__feature">
          <FeatureInfor title='Revenue' money="$21,000" rate="+1.0%" sub="Compared to last month" />
          <FeatureInfor title="Booking" money="1,430" rate="+1.6%" sub="Compared to last month" />
          <FeatureInfor title="User" money="230" rate="+0.4%" sub="Compared to last month" />
        </div>
        <Chart DATA = {DATA}/>
    </div>
  );
};

export default DashBoardPage;