import React, {useState, useEffect} from 'react';
import classNames from 'classnames';
import axios from 'axios';
import style from './Comment.module.scss';
import { Pagination } from '..';
// import { useSelector, useDispatch } from 'react-redux';

const sideScroll = (
    element: HTMLDivElement,
    speed: number,
    distance: number,
    step: number
  ) => {
    let scrollAmount = 0;
    console.log(scrollAmount)
    const slideTimer = setInterval(() => {
      element.scrollLeft += step;
      scrollAmount += Math.abs(step);
      if (scrollAmount >= distance) {
        clearInterval(slideTimer);
      }
    }, speed);
  };

export default function Сomment({}) {
    const [nameDirty, setNameDirty] = useState(false);
    const [nameError, setNameError] = useState('Имя не может быть пустым');
    const [commentDirty, setCommentDirty] = useState(false);
    const [commentError, setCommentError] = useState('Комментарий не может быть пустым');
    const [formValid, setFormValid] = useState(false);
    const [items, setItems] = React.useState([]);
    const date = new Date().toLocaleString(); // 03.08.2021, 23:05:54
    const lastObj = items[items.length - 1] //last element
    const [name, setAddName] = useState(''); //name user
    const [userComment, setUserComment] = useState(''); //user comment
    const [query, setQuery] = useState("");

    React.useEffect(() => {
        if (nameError || commentError) {
        setFormValid(false);
        } else {
        setFormValid(true);
        }
    }, [nameError, commentError]);

    const updateName = (e)=> {
        e.preventDefault();
        setAddName(e.target.value);
    }

    const nameHandler = (e) => {
        setAddName(e.target.value);
        if (e.target.value.length < 3 || e.target.value.length > 20) {
            setNameError('Имя не должен быть меньше 3 букв и больше 20');
          if (!e.target.value) {
            setNameError('Имя не может быть пустым');
          }
        } else {
            setNameError('');
        }
      };

    const commentHandler = (e) => {
        setUserComment(e.target.value);
        if (e.target.value.length < 1 || e.target.value.length > 100) {
            setCommentError('Комментарий не должен быть меньше 3 букв и больше 100');
          if (!e.target.value) {
            setCommentError('Комментарий не може бути пустим');
          }
        } else {
            setCommentError('');
        }
      };

    React.useEffect(() => { 
        async function fetchData() {
        //   setIsLoading(true);
          const itemsResponse = await axios.get('https://jordan.ashton.fashion/api/goods/30/comments');
        //   setIsLoading(false);
        console.log(itemsResponse.data.data)
          setItems(itemsResponse.data.data);
        }
        fetchData();
      }, []);
    
    const onAddToComment = async (obj) => {
        try {    
            const { data } = await axios.post(
              'https://jordan.ashton.fashion/api/goods/30/comments',
              obj,
            );
            console.log(obj, 'data')
            setItems((prev) => {console.log(prev, 'prev'); return [...prev, obj]});
        } catch(error) {
            if (error.response && error.response.status === 422) {
                if (error.response.data.errors.fname) {
                   console.log('First name errors: '+ error.response.data.errors.fname.join(','));
                } }
            // Error
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                // console.log(error.response.data);
                // console.log(error.response.status);
                // console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            console.log(error.config);
        }finally {
            //очистка формы после отправки
            setAddName('');
            setUserComment('');
            setFormValid(false)
        }
        
      };

    const onClickPlus = () => {
       let objectForm = {
           ' created_at': date,
            'id': lastObj.id + 1,
            'name': name,
            'product_id': 30,
            'text': userComment,
            'updated_at': date,
            'visible': 0
        }
        onAddToComment(objectForm);
      };

      const getComments = (e)=> {
        e.preventDefault();
        setQuery(e.target.value);   
      }

      const blurHandler = (e) => {
        switch (e.target.name) {
          case 'name':
            setNameDirty(true);
            break;
          case 'comment':
            setCommentDirty(true);
            break;
          default:
            break;
        }
      };

    React.useEffect(() => {
        onAddToComment()
    },[query])


//block slider comments
    let listLenght = items.length
    const [isActiveDot, setIsActiveDot] = React.useState(0);
    const contentWrapper = React.useRef(null);

    const plus = () => {
        isActiveDot < items.length && setIsActiveDot(isActiveDot + 1);
    };
    const minus = () => {
        isActiveDot !==0 && setIsActiveDot(isActiveDot - 1) ;
    };

  const stepNext = () =>{
    sideScroll(contentWrapper.current, 10, 300, 20)   
  }

  const stepPrev = () =>{
    sideScroll(contentWrapper.current, 10, 300, -20);
  }

  //pagin bottom
    const [currentPage, setCurrentPage] = React.useState(1);
    const [postsPerPage] = React.useState(5);

    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = items.slice(indexOfFirstPost, indexOfLastPost);
  
    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);
  
      return (
          <section className={"comment"} >
              <div className="container-big">
                  <div className={classNames("comment__inner", "inner")}>
                        <div className={"comment__content-block"}>

                            <form onSubmit={getComments} className="comment__form" >
                                <div className="comment__form-inner">     
                                        {nameDirty && nameError && <div style={{ color: 'red' }}>{nameError}</div>}
                                    <label className="form-label" htmlFor="name">
                                        <span id="name" className="icon-user"></span>
                                        <input className="input-name" onChange={(e) => nameHandler(e)} 
                                        onBlur={(e) => blurHandler(e)}
                                        name="name"
                                        value={name}
                                        type="name"  placeholder="Ваше имя"/>
                                    </label>
                                    
                                        {commentDirty && commentError && <div style={{ color: 'red' }}>{commentError}</div>}
                                    <label className="form-label" htmlFor="user-text">
                                        <textarea id="user-text" className="input-text"
                                        onChange={(e) => commentHandler(e)}
                                        onBlur={(e) => blurHandler(e)}
                                        name="comment"
                                        value={userComment}
                                        type="text"  placeholder="Ваш комментарий"/>
                                    </label>
                                </div>
                                                
                                <button type="submit" className={classNames("comment__btn", formValid ? "button-color":"button-disable")} 
                                onClick={onClickPlus} 
                                disabled={!formValid}
                                 >Отправить</button>
                             
                            </form>

                            <div ref={contentWrapper} className={style.box}>
                                <div className={style.items}>
                                       
                                    {items && (items).map((item, index)=>
                                    <div key={item.id} className={style.item}>
                                        <span className={style.name}><span className={style.label}>Имя</span>:{item.name}</span>
                                        <p className={style.text}><span className={style.label}>текст</span>:{item.text}</p>
                                        <div className={style.createdTime}>{item.created_at}</div>
                                    </div>
                                    )}
                                </div>
                            </div>

                            <div className="paginations">
                                <div className="paginations__dots">
                                 {items && items.map((dot, index)=>
                                    <span key={dot.id} className={classNames("dot", index === isActiveDot ? 'active': '')}>
                                    </span>
                                 )}   
                                </div>
                            
                                    <div className="paginations__left-line">
                                        <span className="prev">назад</span>
                                        <div className={classNames("icon-arrowleft", isActiveDot === 0 && 'disabled')} 
                                        onClick={(e)=>{stepPrev(); minus();}}
                                        disabled={(isActiveDot === 0)}></div>
                                    </div>


                                    <div className="paginations__right-line">
                                      
                                            <div className={classNames("icon-arrowright", isActiveDot === (listLenght-2) && 'disabled')} 
                                            onClick={(e)=>{stepNext(); plus();}} disabled={(isActiveDot=== (listLenght-2))}></div>
                                   
                                        <span className="next">далее</span>
                                    </div>
                            </div>
                        
                            <div className={style.boxBottom}>
                                {currentPosts && (currentPosts).map((item, index)=>
                                <div key={item.id} className={style.itemBottom}>
                                <span className={style.name}><span className={style.label}>Имя</span>:{item.name}</span>
                                <p className={style.textBottom}><span className={style.label}>текст</span>:{item.text}</p>
                                <div className={style.createdTimeBottom}>{item.created_at}</div>
                                </div>
                                )}
                            </div>

                            <Pagination
                                postsPerPage={postsPerPage}
                                totalPosts={items.length}
                                paginate={paginate}
                                currentPage={currentPage}
                            />
                        
                        </div>
                    </div>
              </div>
          </section>
      );
  }