

export interface IIngredient {
  _id: string;
  name: string;
  type: string;
  proteins?: number;
  fat?: number;
  carbohydrates?: number;
  calories?: number;
  price: number;
  image: string;
  image_mobile?: string;
  image_large?: string;
  __v?: number;
};

export interface IBun extends IIngredient {
  counter: number;
}

export interface ICartItem extends IIngredient {
  counter: number;
  key: number | string;
}


export interface IWsOrder {
  _id: string;
  status: string | "pending" | "done";
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
  ingredients: string[];
};

export interface IWebSocketActions {
  wsInitialize: string;
  wsInitializeCurrentUser: string;
  onOpen: string;
  onClose: string;
  onError: string;
  onMessage: string;
  wsCloseConnect: string;
}

export interface IUserData {
  name?: string;
  email: string;
  password: string;
}

export interface IUserState {
  userInfo: IUserData | null;
  // accessToken: string;
  // refreshToken:string;
  isLogged: boolean;
}
