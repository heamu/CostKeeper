/* eslint-disable react/prop-types */
import { Row ,Card} from "antd"
import "./styles.css"
import Button from "../Button/index.jsx"
function Cards({showExpenseModal,showIncomeModal,income,
    expense,
    currentBalance,handleBalanceReset}) {


    return (
        <div>
            <Row className="my-row">
                <Card
                className="my-card"
                 title="Current Balance"
                >
                <p style={{color:currentBalance<0?"red":"",textAlign:"center",fontWeight:"bolder",fontSize:"1.5rem"}}>{currentBalance>=0?`₹${currentBalance}`:`-₹${-currentBalance}`}</p>
                <Button onClick={handleBalanceReset} blue={true} text="Reset Balance" />
                </Card>

                <Card
                className="my-card"
                 title="Total Income"
                >
                <p style={{textAlign:"center",fontWeight:"bolder",fontSize:"1.5rem"}} >₹{income}</p>
                <Button blue={true} text="Add Income" onClick={showIncomeModal}/>
                </Card>

                <Card
                className="my-card"
                 title="Total Expenses"
                >
                <p style={{textAlign:"center",fontWeight:"bolder",fontSize:"1.5rem"}} >₹{expense}</p>
                <Button blue={true} text="Add Expense" onClick={showExpenseModal} />
                </Card>
            </Row>
        </div>
    )
}

export default Cards

