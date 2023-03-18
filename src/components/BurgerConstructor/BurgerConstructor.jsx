import { ConstructorElement, Button, DragIcon, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerConstructor.module.css";

function BurgerConstructor(props) {

  const filteredIngredientsBuns = props.ingredients.filter(item => {
    return item.type === "bun";
  });

  const filteredIngredientsWithoutBuns = props.ingredients.filter(item => {
    return item.type !== "bun";
  });

  return (
    <section className={`${styles['burger-constructor']}`}>
      <div className={`${styles['burger-constructor__item']} pl-8 mb-4`}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={filteredIngredientsBuns[0].name + '\n(верх)'}
          price={filteredIngredientsBuns[0].price}
          thumbnail={filteredIngredientsBuns[0].image}
        />
      </div>
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
      <div className={`${styles['burger-constructor__item']} pl-8 mt-4`}>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={filteredIngredientsBuns[0].name + '\n(низ)'}
          price={filteredIngredientsBuns[0].price}
          thumbnail={filteredIngredientsBuns[0].image}
        />
      </div>
      <div className={`${styles['burger-constructor__order']}`}>
        <div className={`${styles['burger-constructor__order-price']}`}>
          <p className="text text_type_digits-medium">610</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button htmlType="button" type="primary" size="large">
          Оформить заказ
        </Button>
      </div>

    </section>
  )
}


export default BurgerConstructor;