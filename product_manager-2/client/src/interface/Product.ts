export interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    brand: string;
    size: string[];
    color: string[];
    isDeleted: boolean;
}