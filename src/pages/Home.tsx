import React, { useCallback } from 'react';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import { useEffect, useRef } from 'react';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import {
  FilterSliceStateType,
  selectFiltersState,
  setParams
} from '../redux/slices/filterSlice';
import { fetchPizzas } from '../redux/slices/pizzasSlice';
import { AppDispatch, RootState } from '../redux/store';

const Home: React.FC = () => {
  const isParams = useRef(false);
  const isMounted = useRef(false);

  const { categoryId, sortId, currentPage, searchValue } =
    useSelector(selectFiltersState);
  const { items: pizzas, status } = useSelector(
    (state: RootState) => state.pizzas
  );
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const getPizzas = useCallback(async () => {
    const sortList = ['rating', 'price', 'name'];
    const category = categoryId ? `&category=${categoryId}&` : '&';
    dispatch(
      fetchPizzas({
        currentPage,
        category,
        sortValue: sortList[sortId],
        searchValue
      })
    );
  }, [dispatch, categoryId, currentPage, searchValue, sortId]);

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(
        window.location.search.substring(1)
      ) as unknown as FilterSliceStateType;
      dispatch(setParams({ ...params }));
      if (String(params.sortId) === '0') {
        isParams.current = false;
      } else {
        isParams.current = true;
      }
    }
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!isParams.current) {
      getPizzas();
    }
    isParams.current = false;
  }, [getPizzas, categoryId, sortId]);

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({ sortId, categoryId, currentPage });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortId, currentPage, navigate]);

  const skeletons = [...new Array(4)].map((_, i) => <Skeleton key={i} />);
  const pizzaItems = pizzas.map((pizza: any) => (
    <PizzaBlock key={pizza.id} {...pizza} />
  ));

  return (
    <>
      <div className="content__top">
        <Categories categoryId={categoryId} />
        <Sort sortId={sortId} />
      </div>
      <h2 className="content__title">?????? ??????????</h2>
      <div className="content__items">
        {status === 'loading' && skeletons}
        {status === 'success' && pizzaItems}
        {status === 'error' && <h1>Error!!!</h1>}
      </div>
      <Pagination currentPage={currentPage} />
    </>
  );
};

export default Home;
