import Adder from "../components/Adder"; 
import RadixCounter from "../components/RadixCounter";
import Temperature from "../components/Temperature";
import Timer from "../components/Timer";
import Value from "../components/Value";
import { useState } from "react";


const Components = () => {
    const [counter, setCounter] = useState(0)
    
    return ( 
    <>
    
    
    <RadixCounter/> 
      
      <Value name={'counter'} value={counter} setValue={setCounter}/>
      
      <Adder/>
      
      <Timer/>

      <Temperature/>
      
      <p className='text-center mt-3'>67173986 อินทัช ชายเพ็ชร</p>
    </> 
    );
}
 
export default Components;