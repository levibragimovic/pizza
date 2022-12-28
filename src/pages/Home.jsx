import React from 'react';
import axios from 'axios';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import { useEffect, useState } from 'react';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';
import { useSelector } from 'react-redux';

const Home = () => {
  const {
    categoryId,
    sortTypeId: sortId,
    currentPage
  } = useSelector((state) => state.filters);
  const { searchValue } = React.useContext(SearchContext);
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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
    window.scrollTo(0, 0);
  }, [categoryId, searchValue, sortId, currentPage]);

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
      <Pagination />
    </>
  );
};

export default Home;
