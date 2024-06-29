import { FormEvent, useState, ChangeEvent } from "react";
import { IProduct } from "../models";
import axios from "axios";
import { ErrorMessage } from "./ErrorMessage";

const newProductData: IProduct =  {
    title: 'Test product',
    price: 13.5,
    description: 'lorem ipsum set',
    image: 'https://i.pravatar.cc',
    category: 'electronic',
    rating: {
        rate: 4.6,
        count: 85
    }
}

interface ICreateProductProps {
    onCreate: (product: IProduct) => void;
}

export function CreateProduct({onCreate}: ICreateProductProps){

    const [value, setValue] = useState('');
    const [error, setError] = useState('');

    const handlerChange = (evt: ChangeEvent<HTMLInputElement>) => {
        setValue(evt.target.value);
    }

    const handlerSubmit = async (evt: FormEvent) => {
        evt.preventDefault();
        setError('');
        if(value.trim().length === 0) {
            setError('Please enter valid title');
            return;
        }
        newProductData.title = value;
        const response = await axios.post<IProduct>('https://fakestoreapi.com/products', newProductData);
        onCreate(response.data);
    }
    return (
        <form onSubmit={handlerSubmit}>
            <input
                type="text" 
                className="border py-2 px-4 mb-2 w-full outline-0"
                placeholder="Enter product title"
                value={value}
                onChange={handlerChange}
            />

            {error && <ErrorMessage error={error}/>}

            <button type="submit" className="py-2 px-4 border bg-yellow-400 hover:text-white">Create</button>
        </form>
    )
}