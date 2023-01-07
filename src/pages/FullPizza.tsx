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
    dispatch(getPizzaItem(id));
  }, [id, dispatch]);

  return (
    <>
      {status === 'loading' && <div>Загрузка...</div>}
      {status === 'success' && (
        <div>
          <img
            src={pizzaItem.imageUrl}
            alt={pizzaItem.name}
            style={{ width: '200px' }}
          />
          <h2>{pizzaItem.name}</h2>
          <h3>{pizzaItem.price} руб.</h3>
          <p>{pizzaItem.description}</p>
        </div>
      )}
    </>
  );
};

export default FullPizza;
