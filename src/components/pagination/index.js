import React, { useEffect, useState } from "react";
import classNames from "classnames";

import style from './pagination.module.scss';
const Pagination = ({
  postsPerPage,
  totalPosts,
  paginate,
  currentPage,
}) => {
  const [showPrev, setPrev] = useState(false);
  const [showNext, setNext] = useState(false);
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const prev = () => (
    <a className={style.prev} onClick={() => paginate(currentPage - 1)} href="!#">
      Назад
    </a>
  );
  const next = () => (
    <a className={style.next} onClick={() => paginate(currentPage + 1)} href="!#">
      Показать еще
    </a>
  );

  React.useEffect(() => {
    if (currentPage - 1 > 0) {
      setPrev(true);
    } else {
      setPrev(false);
    }

    if (currentPage !== pageNumbers.length) {
      setNext(true);
    } else {
      setNext(false);
    }
  }, [currentPage, pageNumbers.length]);

  const liRender = number => (
    <li key={number} className={classNames(style.item, "page-item")}>
      <a onClick={() => paginate(number)} href="!#" className="page-link">
        {number}
      </a>
    </li>
  );

  return (
    <nav className={style.wrapper}>
      {showPrev && prev()}
      <ul className={classNames(style.list, "pagination")}>
        {pageNumbers.map(number => {
          if (currentPage === number) {
            return (
              <li key={number} className={classNames(style.item, "page-item")}>
                <a
                  onClick={() => paginate(number)}
                  href="!#"
                  className="page-link  page-item-active"
                >
                  {number}
                </a>
              </li>
            );
          }

          return liRender(number);
        })}
      </ul>
      {showNext && next()}
    </nav>
  );
};

export default Pagination;