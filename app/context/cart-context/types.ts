export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  codigo: string;
  descricao: string;
}

export interface Product {
  id: number;
  nome: string;
  preco: number;
  imagemURL: string;
  codigo: string;
  descricao: string;
}
