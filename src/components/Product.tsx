import { useState } from "react"
import { IProduct } from "../models"

interface IProductProps {
    product: IProduct
}

export function Product({product}: IProductProps) {

    const [visible, setVisible] = useState(false);
    const btnBgClassName = visible ? "bg-blue-400" : "bg-yellow-400";
    const btnClasses = ["py-2 px-4 border", btnBgClassName];
    
    return (
        <div className="border py-2 px-4 rounded flex flex-col items-center mb-2">
            <img src={product.image} alt={product.title} className="w-1/6" />
            <p>{product.title}</p>
            <p className="font-bold">{product.price}</p>
            <button
                className={btnClasses.join(' ')}
                onClick={()=>setVisible(prev => !prev)}
            >
                {visible ? "Hide details" : "Show details" }
            </button>

            {visible && <div>
                <p>{product.description}</p>
            </div>}

        </div>
    )
}