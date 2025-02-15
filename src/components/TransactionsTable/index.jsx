/* eslint-disable react/prop-types */
import { Table, Radio, Select, Modal } from "antd";
import { useState } from "react";
import searchSvg from "/assets/search.svg?url";
import deleteSvg from "/assets/delete.svg?url";
import "./styles.css";
import Papa from "papaparse"
import { renderMatches } from "react-router-dom";
function TransactionsTable({ transactions,importFromCsv,handleDeleteTransaction }) {
  const [search, setSearch] = useState("");
  const [filterByType, setFilterByType] = useState("");
  const [sortKey, setSortKey] = useState("");
  //   type:type,
  //   date:moment(values.date).format("YYYY-MM-DD"),
  //   amount:parseFloat(values.amount),
  //   tag:values.tag,
  //   name:values.name,
  function style(_, item) {
    console.log(item)
    return (
      <span style={{ color: `${item.type == "income" ? "green" : "red"}` }}>
        {_}
      </span>
    );
  }

  function confirmDelete(transactionId){
                  Modal.confirm({
                    title: 'Are you sure you want to delete all transactions',  
                    content: 'This action cannot be undone.',  
                    okText: 'Yes',  
                    okType: 'danger',  
                 cancelText: 'No',  
      onOk() {  
        handleDeleteTransaction(transactionId)
      },  
      onCancel() {  
        
      },  
  })}
  
  // eslint-disable-next-line no-unused-vars
  function deleteSVG(_,{id}){
    
       return(
         <div style={{margin:"0px",padding:"0px",width:"0.8rem",height:"0.8rem"}}>
            <img onClick={()=>{confirmDelete(id)}} src={deleteSvg} alt="" />
         </div>
       )
  }
  

  const columns = [
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: style,
      className:"disable-on-lessWidth"
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: style,
    },
    {
      title: "Tag",
      dataIndex: "tag",
      key: "tag",
      render: style,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: style,
      className:"disable-on-lessWidth"
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: style,
    },
    {
      render:deleteSVG,
    }
  ];
  let filteredTransactions = transactions.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) &&
      item.type.includes(filterByType)
  );
  let sorted = filteredTransactions.sort((a, b) => {
    if (sortKey === "date") {
      return new Date(a.date) - new Date(b.date);
    } else if (sortKey === "amount") {
      return a.amount - b.amount;
    } else return 0;
  });

  function exportCSV(){
    var csv = Papa.unparse(transactions);

     console.log(csv)

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
     const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', 'data.csv');
  link.style.visibility = 'hidden';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  }

  return (
    <>
      <div
        className="table-wrapper"
        style={{
          width: "100%",
          padding: "0rem 2rem",
        }}
      >
        <div
          className="action-control"
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "1rem",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          <div className="input-flex">
            <img src={searchSvg} width="16" />
            <input
              type="text"
              value={search}
              placeholder="Search by Name"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Select
            className="select-input"
            onChange={(e) => setFilterByType(e)}
            options={[
              { value: "", label: <span>All</span> },
              { value: "income", label: <span>Income</span> },
              { value: "expense", label: <span>Expense</span> },
            ]}
          />
        </div>
        <div className="my-table">
          <div
            className="t-wrap"
            style={{
              display:"flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              marginBottom: "1rem",
            }}
          >
            <h2 style={{textAlign:"center"}}>My Transactions</h2>
            

            <div className="radio-style">
            <Radio.Group
              value={sortKey}
              onChange={(e) => {
                setSortKey(e.target.value);
              }}
            >
              <Radio.Button value="">No sort</Radio.Button>
              <Radio.Button value="date">Sort by Date</Radio.Button>
              <Radio.Button value="amount">Sort by Amount</Radio.Button>
            </Radio.Group>
            </div>
            
            <div
             className="export-import-wrap"
             style={{
               display: "flex",
               justifyContent: "center",
               gap: "1rem",
               width: "30%",
              }}
              >
              <button onClick={exportCSV}className="btn export-import">Export to CSV</button>
              <label htmlFor='file-csv' className="btn btn-blue  export-import">Import from CSV</label>
              <input
              onChange={importFromCsv}
                id="file-csv"
                type="file"
                accept=".csv"
                required
                style={{ display: "none" }}
                />
            </div>
          
          
                </div>
          <div className="table-style">
              <Table dataSource={sorted} columns={columns} />
          </div>
          
        </div>
      </div>
    </>
  );
}

export default TransactionsTable;
