import React from "react";
import PropTypes from "prop-types";

function NavPage({ page, pages, setPage }) {
   const nextPage = () => {
      if (page < pages) setPage(page + 1);
   };

   const prevPage = () => {
      if (page > 1) setPage(page - 1);
   };

   const goToPage = (p) => {
      if (p >= 1 && p <= pages) setPage(p);
   };

   return (
      <nav aria-label="Page navigation example ">
         <ul className="pagination justify-content-center mb-5">
            <li className="page-item">
               <button
                  className="page-link"
                  aria-label="Previous"
                  disabled={page == 1}
                  onClick={() => prevPage()}
               >
                  <span aria-hidden="true">&laquo;</span>
               </button>
            </li>
            <li className="page-item">
               <button className="page-link" onClick={() => goToPage(1)}>
                  1
               </button>
            </li>
            <li className="page-item">
               <a className="page-link disabled" href="#">
                  ... {page} of {pages} ...
               </a>
            </li>
            <li className="page-item">
               <button className="page-link" onClick={() => goToPage(pages)}>
                  {pages}
               </button>
            </li>

            <li className="page-item">
               <button
                  className="page-link"
                  href="#"
                  aria-label="Next"
                  disabled={page == pages}
                  onClick={() => nextPage()}
               >
                  <span aria-hidden="true">&raquo;</span>
               </button>
            </li>
         </ul>
      </nav>
   );
}

NavPage.propTypes = {};

export default NavPage;
