import './App.css'
import Sign from './assets/signs.jsx'
import NumberPad from './assets/number.jsx'
import {useRef, useState} from "react"
export default function App(){
    
    let inputTime=useRef(0)
    let holdPev=useRef(null)
    let nextCur=useRef(null)
    let operation=useRef('')
    let operationClicked=useRef(false);
   const[count,setCount]=useState('0')
  
  
   function handleCount(key) {
  if (key === "AC") {
    setCount('0');
    nextCur.current=null
    holdPev.current=null
    operationClicked.current=false
  } else if (/^[0-9]$/.test(key)) {
    setCount(prevCount=>(prevCount==='0'||operationClicked.current)?""+key:prevCount+key )
  } else if (key === '.') {
    if(operationClicked.current){
      holdPev.current===Number(count)?setCount('0.'):setCount(prevCount=>prevCount+key)
      operationClicked.current=false
    }// fixed but not working well with 0.1 + 1
    setCount(prevCount=>(prevCount.includes('.'))?prevCount:prevCount+key)
  } else if (key === '%') {
    setCount(prevCount => '' + (Number(prevCount) / 100));
  } else if (key === '+/-') {
    setCount(prevCount => '' + (Number(prevCount) * -1));
  }
}

   function handleOperation(key){
     if(count==='0'){
      operationClicked.current=false
      return 
     }
     inputTime.current++
     operationClicked.current=true

     
     if(key==='+'){
       operation.current=key
       if(holdPev.current===null){
        holdPev.current=Number(count)
       }else if(holdPev.current!==null && !nextCur.current){
        nextCur.current=Number(count)
       }
     }else if(key==='_'){
       operation.current=key
       if(holdPev.current===null){
        holdPev.current=Number(count)
       }else if(holdPev.current!==null && nextCur.current===null){
        nextCur.current=Number(count)
       }else if(holdPev.current!==null && operation.current){
        calculate()
       }
     }else if(key==='÷'){
       operation.current='/'
       if(holdPev.current===null){
        holdPev.current=Number(count)
       }else if(holdPev.current!==null && nextCur.current===null){
        nextCur.current=Number(count)
       }
     }else if(key==='x'){
      operation.current='*'
       if(holdPev.current===null){
        holdPev.current=Number(count)
       }else if(holdPev.current!==null && nextCur.current===null){
        nextCur.current=Number(count)
       }
     }else if(key==='='){
      if(inputTime.current>1){
           calculate()
          operation.current=[]
      }
 
     }

     function calculate(){
         nextCur.current=Number(count)
        let result=operation.current==='+'?(holdPev.current+nextCur.current):operation.current==='_'?(holdPev.current-nextCur.current):operation.current==='*'?(holdPev.current*nextCur.current):operation.current==='/'?(holdPev.current/nextCur.current):''+holdPev.current

        setCount(Number.isFinite(result)?String(Number(result.toPrecision(15))):String(result))// fixing the points in floats
         
        console.log(nextCur.current+"  "+holdPev.current)
        nextCur.current=null
        holdPev.current=null
        operationClicked.current=true
     }
   }

  return(
    <div className='container'>
    <input id='input' value={count} readOnly/>
    <div className='numberAndSigns'>
      <NumberPad onKeyPress={handleCount}/>
      <Sign onKeyPress={handleOperation}/>
    </div>
    </div>
  )
}