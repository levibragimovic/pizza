import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getPizzaItem } from '../redux/slices/pizzasSlice';
import { RootState } from '../redux/store';

const FullPizza: React.FC = () => {
  let { id } = useParams();
  const dispatch = useDispatch();
  const { status, pizzaItem } = useSelector((state: RootState) => state.pizzas);

  useEffect(() => {
    //@ts-ignore
    dispatch(getPizzaItem(id));
  }, [id, dispatch]);

  return (
    <>
      {status === 'loading' && <div>Загрузка...</div>}
      {status === 'success' && (
        <div>
          <img
            //@ts-ignore
            src={pizzaItem.imageUrl}
            //@ts-ignore
            alt={pizzaItem.name}
            style={{ width: '200px' }}
          />
          {/*  @ts-ignore*/}
          <h2>{pizzaItem.name}</h2>
          {/*  @ts-ignore*/}
          <h3>{pizzaItem.price} руб.</h3>
          {/*  @ts-ignore*/}
          <p>{pizzaItem.description}</p>
        </div>
      )}
    </>
  );
};

export default FullPizza;
