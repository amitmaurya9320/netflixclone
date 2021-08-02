import './FeaturedInfo.css';
import {ArrowDownward,ArrowUpward} from '@material-ui/icons';
function FeaturedInfo() {
    return (
        <div className = "featuredInfo">
            <div className="featuredItem">
                <span className ='FeaturedTitle'>Revenue</span>
                <div className="featureMoneyContainer">
                    <span className="featuredMoney">$2,415</span>
                    <span className = 'featureMoneyRate'>-11.4<ArrowDownward className ='featuredIcon negative'/></span>
                </div>
                <span className="featuredSub">Compared to last Month</span>
            </div>
            <div className="featuredItem">
                <span className ='FeaturedTitle'>Sales</span>
                <div className="featureMoneyContainer">
                    <span className="featuredMoney">$4,415</span>
                    <span className = 'featureMoneyRate'>-1.4<ArrowDownward className ='featuredIcon negative'/></span>
                </div>
                <span className="featuredSub">Compared to last Month</span>
            </div>
            <div className="featuredItem">
                <span className ='FeaturedTitle'>Cost</span>
                <div className="featureMoneyContainer">
                    <span className="featuredMoney">$2,415</span>
                    <span className = 'featureMoneyRate'>+2.4<ArrowUpward className ='featuredIcon'/></span>
                </div>
                <span className="featuredSub">Compared to last Month</span>
            </div>
        </div>
    )
}

export default FeaturedInfo;
