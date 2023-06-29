

export interface IIngredient {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile?: string;
  image_large?: string;
  __v?: number;
};

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

