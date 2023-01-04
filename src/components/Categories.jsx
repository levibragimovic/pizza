import { useDispatch, useSelector } from 'react-redux';
import { selectFiltersState, setCategoryId } from '../redux/slices/filterSlice';

function Categories() {
  const dispatch = useDispatch();
  const { categoryId } = useSelector(selectFiltersState);
  const onChangeCategory = (i) => {
    dispatch(setCategoryId(i));
  };
  const categories = [
    'Все',
    'Мясные',
    'Вегетарианская',
    'Гриль',
    'Острые',
    'Закрытые'
  ];

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
}

export default Categories;
