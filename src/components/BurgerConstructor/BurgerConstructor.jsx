import { ConstructorElement, Button, DragIcon, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerConstructor.module.css";
import OrderDetails from '../OrderDetails/OrderDetails';
import Modal from '../Modal/Modal';
import { getOrderNumber } from '../../utils/api';
import { useDispatch, useSelector } from 'react-redux';
import { orderActions } from '../../services/order-slice';
import { modalActions } from '../../services/modal-slice';

const BurgerConstructor = () => {
  const ingredients = useSelector((state) => state.ingredients.items);
  const isOpenModal = useSelector((state) => state.modal.IsOpenModal);
  const orderNumber = useSelector((state) => state.order.orderNumber);
  const dispatchAction = useDispatch();

  const filteredIngredientsBuns = ingredients.filter((item) => {
    return item.type === "bun";
  });


  const filteredIngredientsWithoutBuns = ingredients.filter(item => {
    return item.type !== "bun";
  });

  const getIngredientsIds = () => { //получим id ингредиентов
    let ingredIds = [];
    ingredients.forEach(item => {
      ingredIds.unshift(item._id);
    })
    return ingredIds;
  }

  const orderPrice = () => { // сумма заказа
    let price = filteredIngredientsBuns[0].price * 2; //сумма 2х булок
    filteredIngredientsWithoutBuns.forEach(item => {  // ингредиенты без булок
      price += item.price;  //добавим сумму ингедиентов
    })
    return price.toString();
  }


  const getOrderNum = async () => {
    return await getOrderNumber(getIngredientsIds())
      .then((res) =>
        dispatchAction(orderActions.setOrderNumber(res.order.number)))
      .catch((err) =>
        console.err(err));
  }

  const OnOpenModal = () => {  //при открытии
    dispatchAction(modalActions.toggleModal()); //указываем состояние isOpenModal = true
    getOrderNum(); //получаем номер заказа
  }

  const onCloseModal = () => {
    dispatchAction(orderActions.setOrderNumber(0));
    dispatchAction(modalActions.toggleModal()); //указываем состояние isOpenModal = false
  };

  return (
    <section className={`${styles['burger-constructor']}`}>
      {isOpenModal && orderNumber !== 0 &&
        <Modal onCloseModal={onCloseModal}>
          <OrderDetails />
        </Modal>
      }
      {filteredIngredientsBuns.length > 0 && (
        <div className={`${styles['burger-constructor__item']} pl-8 mb-4`}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={filteredIngredientsBuns[0].name + '\n(верх)'}
            price={filteredIngredientsBuns[0].price}
            thumbnail={filteredIngredientsBuns[0].image}
          />
        </div>
      )}

      <ul className={`${styles['burger-constructor__list']}`}>
        {filteredIngredientsWithoutBuns.map((item) => (
          <li className={`${styles['burger-constructor__item']}`} key={item._id} >
            <DragIcon type="primary" />
            <ConstructorElement
              text={item.name}
              price={item.price}
              thumbnail={item.image}
            />
          </li>
        ))}
      </ul>

      {filteredIngredientsBuns.length > 0 && (
        <div className={`${styles['burger-constructor__item']} pl-8 mt-4`}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={filteredIngredientsBuns[0].name + '\n(низ)'}
            price={filteredIngredientsBuns[0].price}
            thumbnail={filteredIngredientsBuns[0].image}
          />
        </div>
      )}

      < div className={`${styles['burger-constructor__order']} mt-10`}>
        <div className={`${styles['burger-constructor__order-price']}`}>
          <p className="text text_type_digits-medium">{orderPrice()}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button htmlType="button" type="primary" size="large" onClick={OnOpenModal}>
          Оформить заказ
        </Button>
      </div>

    </section >
  )
}


export default BurgerConstructor;