import './Chart.css';
import { LineChart, Line, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


const Chart = ({title, data, dataKey , grid}) => {
    
    return (
        <div className ='chart'>
            <h1 className="chartTitle">{title}</h1>
            {/* 4 unit width then 1unit height */}
            <ResponsiveContainer width = "100%" aspect = {4/1}>
            <LineChart data = {data}>
                {/* stroke define the color of x axis*/}
                <XAxis dataKey = "name" stroke ="#5550bd"/>
                <Line type ="monotone" dataKey = {dataKey} stroke ="#5550bd"/>
                <Tooltip/>
                {grid && <CartesianGrid stroke = "#e0dfdf" strokeDasharray = '5 5'/>}
            </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default Chart;
