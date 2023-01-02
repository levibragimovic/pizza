import React, { useCallback } from 'react';
import axios from 'axios';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import { useEffect, useState, useRef } from 'react';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { setParams } from '../redux/slices/filterSlice';

const Home = () => {
  const { categoryId, sortId, currentPage } = useSelector(
    (state) => state.filters
  );
  const isParams = useRef(false);
  const isMounted = useRef(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { searchValue } = React.useContext(SearchContext);
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPizzas = useCallback(() => {
    const sortList = ['rating', 'price', 'name'];
    const category = categoryId ? `&category=${categoryId}&` : '&';

    setIsLoading(true);
    axios
      .get(
        `https://63a08129e3113e5a5c3f9cd7.mockapi.io/items?page=${currentPage}&limit=4${category}sortBy=${sortList[sortId]}&order=asc&filter=${searchValue}`
      )
      .then((res) => {
        setPizzas(res.data);
        setIsLoading(false);
      });
  }, [categoryId, currentPage, searchValue, sortId]);

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({ sortId, categoryId, currentPage });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortId, currentPage, navigate]);

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      dispatch(setParams({ ...params }));
      isParams.current = true;
    }
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!isParams.current) {
      fetchPizzas();
    }
    isParams.current = false;
  }, [fetchPizzas]);

  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(4)].map((_, i) => <Skeleton key={i} />)
          : pizzas.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />)}
      </div>
      <Pagination currentPage={currentPage} />
    </>
  );
};

export default Home;
