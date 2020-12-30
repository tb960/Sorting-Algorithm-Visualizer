import React, {useState, useEffect} from 'react';
import './SortingAlgoVisualizer.css';

function SortingAlgoVisualizer(props){

    const [array, setArray] = useState([]);

    useEffect(()=>{
        resetArray()
    },[])

    //why need to pass in a second parameters inside the useEffect?

    function resetArray(){
        const Array = [];
        for(let i = 0; i<100; i++){
            Array.push(randomIntFromIntervals(5,1000));
        }
        setArray(Array);
    };

    function randomIntFromIntervals(min, max){
        return Math.floor(Math.random() * (max-min + 1) + min);
    }

    return(
        <div className="hello">
            <div className="hello">
                <button onClick={resetArray}>Generate Array</button>
            </div>
            <div>
                {array.map((value)=>{
                    return <div>{value}</div>
                })}
            </div>
        </div>
    );
}

//why did a map function require a return statement when {} is use while () need not a return statement?

export default SortingAlgoVisualizer