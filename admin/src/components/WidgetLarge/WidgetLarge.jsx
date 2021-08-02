import './WidgetLarge.css'

const WidgetLarge = () => {

    const Button = ({type}) =>{
        return (
            <button className ={'widgetLargeBtn '+type}>
                {type}
            </button>
        );
    }
    return (
        <div className = "widgetLarge">
            <h3 className="widgetLargeTitle">
                Latest transaction
            </h3>
            <table className = 'widgetLargeTable'>
                <tbody>
               <tr className ='widgetLargeTr'>
                <th className = 'widgetLargeTh'>Customer</th>
                <th className = 'widgetLargeTh'>Date</th>
                <th className = 'widgetLargeTh'>Amount</th>
                <th className = 'widgetLargeTh'>Status</th>
               </tr>
               <tr className ='widgetLargeTr'>
                   <td className="widgetLargeUser">
                       <img src="https://tse3.mm.bing.net/th?id=OIP.n28A85TsiU5IgK0C4940bgHaIf&pid=Api&P=0&w=300&h=300" alt="" className ='widgetLargeImg'/>
                       <span className = 'widgetLargeName'>Amit Maurya</span>
                   </td>
                   <td className="widgetLargeDate">
                       2 jun 2021
                   </td>
                    <td className="widgetLargeAmount">
                      $122.00
                   </td>
                    <td className="widgetLargeStatus">
                       <Button type ='Approved'/>
                   </td>
               </tr>
                <tr className ='widgetLargeTr'>
                   <td className="widgetLargeUser">
                       <img src="https://tse3.mm.bing.net/th?id=OIP.n28A85TsiU5IgK0C4940bgHaIf&pid=Api&P=0&w=300&h=300" alt="" className ='widgetLargeImg'/>
                       <span className = 'widgetLargeName'>Amit Maurya</span>
                   </td>
                   <td className="widgetLargeDate">
                       2 jun 2021
                   </td>
                    <td className="widgetLargeAmount">
                      $122.00
                   </td>
                    <td className="widgetLargeStatus">
                       <Button type ='Declined'/>
                   </td>
               </tr>
                              <tr className ='widgetLargeTr'>
                   <td className="widgetLargeUser">
                       <img src="https://tse3.mm.bing.net/th?id=OIP.n28A85TsiU5IgK0C4940bgHaIf&pid=Api&P=0&w=300&h=300" alt="" className ='widgetLargeImg'/>
                       <span className = 'widgetLargeName'>Amit Maurya</span>
                   </td>
                   <td className="widgetLargeDate">
                       2 jun 2021
                   </td>
                    <td className="widgetLargeAmount">
                      $122.00
                   </td>
                    <td className="widgetLargeStatus">
                       <Button type ='Pending'/>
                   </td>
               </tr>
                              <tr className ='widgetLargeTr'>
                   <td className="widgetLargeUser">
                       <img src="https://tse3.mm.bing.net/th?id=OIP.n28A85TsiU5IgK0C4940bgHaIf&pid=Api&P=0&w=300&h=300" alt="" className ='widgetLargeImg'/>
                       <span className = 'widgetLargeName'>Amit Maurya</span>
                   </td>
                   <td className="widgetLargeDate">
                       2 jun 2021
                   </td>
                    <td className="widgetLargeAmount">
                      $122.00
                   </td>
                    <td className="widgetLargeStatus">
                       <Button type ='Approved'/>
                   </td>
               </tr>
               </tbody>
            </table>
        </div>
    )
}

export default WidgetLarge
