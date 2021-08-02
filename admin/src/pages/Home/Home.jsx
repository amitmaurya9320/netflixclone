import Chart from '../../components/Chart/Chart';
import FeaturedInfo from '../../components/FeaturedInfo/FeaturedInfo';
import './Home.css';
import WidgetSmall from '../../components/WidgetsSmall/WidgetSmall';
import WidgetLarge from '../../components/WidgetLarge/WidgetLarge';
import { useState, useEffect, useMemo } from "react";
import axios from "axios";
const Home = () => {
      const MONTH = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  const [userStat, setUserState] = useState([]);
  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await axios.get("/users/stat", {
          headers: {
           token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
           },
        });
        res.data.map((item) =>
          setUserState((prev) => [
            ...prev,
            { name: MONTH[item._id - 1], "New User": item.total },
          ])
        );
      } catch (err) {
        console.log(err);
      }
    };
    getStats();
  }, [MONTH]);
    return (
        <div className ='home'>
            <FeaturedInfo/>
            <Chart data = {userStat} title = "User Analytics" grid dataKey = "New User"/>
            <div className="homeWidgets">
                <WidgetSmall/>
                <WidgetLarge/>
            </div>
        </div>
    )
}

export default Home;
