import { memo } from 'react';
import { useDispatch } from 'react-redux';
import { setCategoryId } from '../redux/slices/filterSlice';

const categories = [
  'Все',
  'Мясные',
  'Вегетарианская',
  'Гриль',
  'Острые',
  'Закрытые'
];

interface ICategoryProps {
  categoryId: number;
}

const Categories: React.FC<ICategoryProps> = memo(({ categoryId }) => {
  const dispatch = useDispatch();
  const onChangeCategory = (i: number) => {
    dispatch(setCategoryId(i));
  };

  return (
    <div className="categories">
      <ul>
        {categories.map((item, i) => (
          <li
            key={i}
            onClick={() => onChangeCategory(i)}
            className={categoryId === i ? 'active' : ''}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
});

export default Categories;
