/* eslint-disable react/prop-types */  
import { Line } from '@ant-design/charts';  

import { Radio } from 'antd';  
import { useState, useMemo } from 'react';  

const Page = ({ transactions }) => {  
  const [selectGraph, setSelectGraph] = useState("income");  

  const aggregatedData = useMemo(() => {  
    return transactions.reduce((acc, current) => {  
      // Determine the type to aggregate based on selection  
      const shouldInclude = selectGraph === "total"   
        || (selectGraph === "income" && current.type === "income")   
        || (selectGraph === "expense" && current.type === "expense");  

      if (shouldInclude) {  
        const found = acc.find(item => item.date === current.date);  
        if (found) {  
          found.amount += current.amount;  
        } else {  
          acc.push({ date: current.date, amount: current.amount });  
        }  
      }  
      return acc;  
    }, []);  
  }, [transactions, selectGraph]);  

  const config = {  
    data: aggregatedData,  
    xField: 'date',  
    yField: 'amount',  
    // Additional chart configuration can go here  
  };  

  return (  
    <div  className='disable-on-lessWidth' style={{textAlign:"center"}}>  
      <div>  
        <Radio.Group  
          value={selectGraph}  
          onChange={(e) => setSelectGraph(e.target.value)}  
        >  
          <Radio.Button value="income">Income</Radio.Button>  
          <Radio.Button value="expense">Expense</Radio.Button>  
          <Radio.Button value="total">Total</Radio.Button>  
        </Radio.Group>  
      </div>  

      <div style={{display:"flex",alignContent:"center",justifyContent:"center"}}>

      <div style={{width:"70vw",height:"70vh"}}>
      <Line  {...config} />  
      </div>
      </div>
      
    </div>  
  );  
};  

export default Page;