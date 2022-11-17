import ReactVirtualizedTable from '../components/Table/Table';
import {MainForm} from '../components/Form/Form';
import Button from '@mui/material/Button';
import { Transition } from 'react-transition-group';
import { useRef } from 'react';
import { handleIsOpenForm } from '../reducers/tableSlice';

import {setRows} from '../reducers/tableSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

const MainLayout = () =>{
    const dispatch = useDispatch();
  
  useEffect(() =>{
    // @ts-ignore
   dispatch(setRows());
   
  },[]);
  
  const rows:any = useSelector(({table}:any) => table.rows);
  const isOpenForm = useSelector(({table}:any) => table.isOpenForm);
  const defaultStyleWrapper = {
    filter: 'blur(0px)',
    transition: 'filter 0.2s ease-in-out'
  }
  const transitionStylesWrapper = {
    entering: {  filter: 'blur(0px)'},
    entered:  {  filter: 'blur(2px)'},
    exiting:  { filter: 'blur(2px)'},
    exited:  {  filter: 'blur(0px)'},
  }
  const defaultStylePopup ={
    bottom:'-200vh',
    display:'none',
    transition:'bottom 0.3s ease-in-out'
  }
  const transitionStylesPopop={
    entering: { display:'block', bottom: '-200vh'},
    entered:  { display:'block',  bottom: 0},
    exiting:  {  display:'block', bottom:'0vh'},
    exited:  {   bottom: '-200vh',display:'block' },
  }
  
  const TableWrapperRef=useRef(null);
    return (
        <>
         <div style={{display: isOpenForm ? 'block' :'none'}} onClick={() => dispatch(handleIsOpenForm())} className="form-open-filter"></div>
       <Transition timeout={0} in={isOpenForm} >
      {state => (
         <div className="popup" style={{
          ...defaultStylePopup,
          // @ts-ignore
          ...transitionStylesPopop[state],
          
          
        }}>
         <MainForm/>
         </div>
      )}
       </Transition>
       <Transition timeout={50} in={isOpenForm}>
    {state => (
      <>
     <div  className="table-wrapper" ref={TableWrapperRef} style={{
          ...defaultStyleWrapper,
          // @ts-ignore
          ...transitionStylesWrapper[state]
        }}>
     <div className="open-form-button">
     <Button onClick={() =>  dispatch(handleIsOpenForm())} variant='contained'>Create New Item</Button>
     </div>
    <div className="table-layout-wrapper"> <ReactVirtualizedTable rows={rows}/></div>
     
     </div>
      </>
    )}
     </Transition>
        </>
    )
}
export default MainLayout;