import React from 'react';
import classNames from 'classnames';
import AppContext from '../../context';

export default function ClosedButton({isOpen, setIsOpen}) {
  const{setPopupContent} = React.useContext(AppContext);

    function removeOverflowForBody(){
        document.body.classList.remove('overflowe');
      }
  return (
    <>
     <button className={classNames("closed-btn")} onClick={(e)=>{removeOverflowForBody(); setPopupContent(isOpen);}}><span className="closed-btn__line"></span></button>
    </>
  );
}
