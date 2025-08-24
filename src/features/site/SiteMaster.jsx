import React from 'react'
import { useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSite } from '../../slice/AuthSlice';



const SiteMaster = () => {
   const dispatch = useDispatch();
   //const _Selector = useSelector((state) => state.practice);
     const [data, setData] = useState([]);
     const [headers, setHeaders] = useState([]);


      useEffect(() => {
      dispatch(getSite("")).then((action, state)=>{

        if(action.payload!=null && action.payload.data.length>0)
        {
          setData(action.payload.data)
          setHeaders(Object.keys(action.payload.data[0]));
        }
      });
    }, []);
      
  return (
 <>
 <table>
          <thead>
            <tr>
              {headers.map((header,idx) => (
                <th key={idx}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex}> {/* Use a unique key for each row */}
                {headers.map((header) => (
                  <td key={`${rowIndex}-${header}`}>{row[header]}</td> // Unique key for each cell
                ))}
              </tr>
            ))}
          </tbody>
        </table>
 </>
  )
}

export default SiteMaster
