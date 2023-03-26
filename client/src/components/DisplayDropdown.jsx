import "./Style.css"
import ScheduleSelector from 'react-schedule-selector';
import { useEffect, useState } from "react";
import { flushSync } from "react-dom";

// "BANANA!!!" take string as input  
// [{er}]
function DisplayDropDown(props) {


    function Display(props){
       
        return(
             
            <div class="display" style={{ position: 'relative', fontSize: '22px', color: '#FFAF40',margin: '20px'} }>
           { props.item}
            </div>
        )
    }
    function DropDown() {
        console.log("DROP DOWN Porps: " , props.array)
        const displayComponents = props.array.map((item) => <Display item={item} />);
       return <div>{displayComponents}</div>;
      }


    return(
        <div >
             <h1 className="text" style={ {fontSize: '22px' }}>  {props.title}</h1>
             
             <div >

         <Display item={props.array} />
         </div>
      </div>

    )

}
export default DisplayDropDown