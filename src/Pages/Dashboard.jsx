import Header from "../components/Header/index.jsx"
import Cards from "../components/Cards/index.jsx"
import AddIncomeModal from "../components/Modals/AddIncome.jsx";
import AddExpenseModal from "../components/Modals/addExpense.jsx";
import {auth, db} from "../firebase.js" 
import {getDocs, query,collection, addDoc,writeBatch, doc, deleteDoc} from "firebase/firestore"
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { SyncLoader } from "react-spinners";
import { useAuthState } from "react-firebase-hooks/auth";
import TransactionsTable from "../components/TransactionsTable/index.jsx"
import { parse } from "papaparse";
import Page from "../components/Charts/index.jsx";
import { useNavigate } from "react-router-dom";
import { Modal } from "antd";


function Dashboard() {
  const [loading1,setLoading] = useState(true);
  const [transactions,setTransactions] = useState([]);
  const [user,loading] = useAuthState(auth);
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);
  const [income , setIncome] = useState(0);
  const [expense , setExpense] = useState(0);
  const [currentBalance , setCurrentBalance] = useState(0);
  const navigate = useNavigate();
const showExpenseModal = () => {
    setIsExpenseModalVisible(true);
  };

  const showIncomeModal = () => {
    setIsIncomeModalVisible(true);
  };

  const handleExpenseCancel = () => {
    setIsExpenseModalVisible(false);
  };

  const handleIncomeCancel = () => {
    setIsIncomeModalVisible(false);
  };



  function importFromCsv(event) {
    event.preventDefault();
    try {
      parse(event.target.files[0], {
        header: true,
        complete: async function (results) {
          // Now results.data is an array of objects representing your CSV rows
          for (const transaction of results.data) {
            // Write each transaction to Firebase, you can use the addTransaction function here
            console.log("Transactions", transaction);
            const newTransaction = {
              ...transaction,
              amount: parseInt(transaction.amount),
            };
            await addTransaction(newTransaction, true);
          }
        },
      });
      toast.success("All Transactions Added");
      fetchTransactions();
      event.target.files = null;
    } catch (e) {
      toast.error(e.message);
    }
  }



  function onFinish(values,type){
     const newTransaction = {
        type:type,
        date:values.date.format("YYYY-MM-DD"),
        amount:parseFloat(values.amount),
        tag:values.tag,
        name:values.name,
     };

     addTransaction(newTransaction);
  };

  
  async function addTransaction(transaction,many){
    console.log(transaction)
    try{
        const docref = await addDoc(
            collection(db,`users/${user.uid}/transactions`),
            transaction
        );

        console.log("Document written with Id : " , docref.id);
         setTransactions([...transactions,transaction]);
        if(!many){
            toast.success("Transaction Added!");
        }
    }
    catch(e){
        console.log("Error adding document : ",e);
        if(!many){
            toast.error("couldn't add transaction");
        }
    }
  }

  
  useEffect(()=>{
   
    fetchTransactions();
    
  },[user]);

  useEffect(()=>{
   calculateBalance();
  },[transactions])

  function calculateBalance(){
    let incomeTotal=0;
    let expenseTotal = 0;

    transactions.forEach(transaction=>{
      if(transaction.type=="income"){
        incomeTotal+=transaction.amount;
      }

      if(transaction.type=="expense"){
        expenseTotal+=transaction.amount;
      }
      setIncome(incomeTotal);
      setExpense(expenseTotal);
      setCurrentBalance(incomeTotal-expenseTotal);
    })
  }

async function fetchTransactions(){
  console.log(user);
  setLoading(true);
  if(user){
    const q = query(collection(db,`users/${user.uid}/transactions`));
    const querySnapshot = await getDocs(q);
    let transactionsArray = [];
    querySnapshot.forEach((doc)=>{
      
      transactionsArray.push({id:doc.id,...doc.data()});
    });
    setTransactions(transactionsArray);
    //console.log(transactionsArray);
    //toast.success("Transactons Fetched");
  }
  setLoading(false);
}






  const style = {
    width:"100vw",
    height:"100vh",
    display : "flex",
    justifyContent : "center",
    alignItems:"Center"
  }



  function handleFriends(){
    navigate("/dashboard/friends")
  }

  
 

    const deleteAllUserTransactions = async () => {  
      const usersRef = collection(db, 'users'); // Collection where users are stored  
      const usersSnapshot = await getDocs(usersRef); // Fetch all users  
  
      const batch = writeBatch(db); // Create a write batch  
  
      for (const userDoc of usersSnapshot.docs) {  
        const userId = userDoc.id; // Get the user ID  
        const transactionsRef = collection(db, `users/${userId}/transactions`); // Reference to the user's transactions collection  
  
        // Get all transactions for the user  
        const transactionsSnapshot = await getDocs(transactionsRef);   
  
        transactionsSnapshot.docs.forEach(doc => {  
          batch.delete(doc.ref); // Prepare each transaction document for deletion  
        });  
      }  
  
      await batch.commit(); // Commit the batch deletion 
      fetchTransactions(); 
      toast.success('All user transactions deleted successfully.');  
    };  
  
    // Handler function for the button click  
    const handleDeleteAllTransactions = async () => {  
      try {  
        await deleteAllUserTransactions();  
      } catch (error) {  
        console.error('Error deleting transactions:', error);  
      }  
    };  
  

    async function handleDeleteTransaction(transactionId){
      
      const transactionRef = doc(db, `users/${user.uid}/transactions`, transactionId); // Construct the document reference  

    try {  
      await deleteDoc(transactionRef); // Delete the document
      fetchTransactions();  
      toast.success('Transaction deleted successfully.');  
    } catch (error) {  
      
      toast.error('Error deleting transaction: ' + error.message);  
    } 
    }

    return (
        <div   >
            <Header />
            {
              loading1||loading ? <div style={style}> <SyncLoader color="blue"/></div>:
              <>
            
               
              <Cards 
                currentBalance={currentBalance}
                income={income}
                expense={expense}
                showExpenseModal={showExpenseModal}
                showIncomeModal={showIncomeModal}
                handleBalanceReset={()=>{
                  Modal.confirm({
                    title: 'Are you sure you want to delete all transactions',  
                    content: 'This action cannot be undone.',  
                    okText: 'Yes',  
                    okType: 'danger',  
                 cancelText: 'No',  
      onOk() {  
        handleDeleteAllTransactions();
        // Handle the confirm action here  
      },  
      onCancel() {  
        
      },  
                  })
                }}
            />
            <AddIncomeModal 
             isIncomeModalVisible={isIncomeModalVisible}
             handleIncomeCancel={handleIncomeCancel}
             onFinish={onFinish}
            />
            <AddExpenseModal 
            isExpenseModalVisible={isExpenseModalVisible}
            handleExpenseCancel={handleExpenseCancel}
            onFinish={onFinish}
            />
            <Page transactions={transactions}  />
             <TransactionsTable handleDeleteTransaction={handleDeleteTransaction}  importFromCsv={importFromCsv} transactions={transactions} />
              </>
            }
            
        </div>
    )
}

export default Dashboard
