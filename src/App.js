import { useEffect, useState, useCallback } from 'react' ;
import SearchIcon from "./search.svg";
import MovieCard from './MovieCard';
import ReactPaginate from 'react-paginate';

const API_URL = 'https://www.omdbapi.com?apikey=b64ba47a'

const App = () => {

  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [pageCount, setPageCount] = useState(0);
  const [currPage, setCurrPage] = useState(0);

  const searchMovies = useCallback(async () => {
    const response = await fetch(`${API_URL}&s=${searchTerm}&page=${currPage+1}`)
    const data = await response.json();
    setMovies(data.Search);
    setPageCount(Math.ceil((data.totalResults > 0 ? data.totalResults : 1) / 10));
  }, [searchTerm, currPage])

  useEffect(() => {
    searchMovies()
  }, [searchMovies])

  const handlePageClick = (event) => {
    setCurrPage(event.selected);
  };

  const callSearchFunction = (event) => {
    setCurrPage(0);
    setSearchTerm(event.target.value)
  }

  return  (
    <div className='app'>
       <h1>Movie Land</h1>

       <div className='search'>
          <input
            placeholder='Search for Movies'
            value={searchTerm}
            onChange={(e) => callSearchFunction(e)}
          />
          <img 
            src={SearchIcon}
            alt='search'
            onClick={() => searchMovies()}
          />
       </div>

        {movies?.length > 0 ? (
          <div className='container'>
            {movies.map((movie, index) => (
              <MovieCard key={index} movie={movie} />
            ))}
          </div>
        ) : (
          <div className='empty'>
            <h2>No movies found</h2>
          </div>
        )}
        <ReactPaginate
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel="<"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
        />
    </div>
  );
}

export default App;
