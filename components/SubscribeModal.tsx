"use client"

import { Price, ProductsWithPrices } from "@/types"
import Modal from "./Modal"
import Button from "./Button"
import { useState } from "react"
import { useUser } from "@/hooks/useUser"
import toast from "react-hot-toast"
import { postData } from "@/libs/helpers"
import { getStripe } from "@/libs/stripeClient"
import useSubscribeModal from "@/hooks/useSubscribeModal"

interface SubscribeModalProps{
    products:ProductsWithPrices[]
}

const formatPrice=(price:Price)=>{
    const priceString=new Intl.NumberFormat('en-US',{
        style:'currency',
        currency:price.currency,
        minimumFractionDigits:0
    }).format((price?.unit_amount||0)/100);

    return priceString
}



const SubscribeModal:React.FC<SubscribeModalProps >=({
    products
})=>{

    const subscribeModal=useSubscribeModal();
    const onChange=(open:boolean)=>{
        if(!open){
            subscribeModal.onClose()
        }
    }
    const {user,isLoading,subscription}=useUser();

    const [priceIdLoading,setPriceIdLoading]=useState<string>()

    const handleCheckOut=async (price:Price)=>{
        setPriceIdLoading(price.id);

        if(!user){
            setPriceIdLoading(undefined);
            return toast.error('Must be logged in')
        }

        if(subscription){
            setPriceIdLoading(undefined)
            return toast('Already Subscribed')
        }

        try {
            const {session:sessionId } = await postData({
                url: '/api/create-checkout-session',
                data: { price }
              });
              console.log(sessionId);              
            const stripe=await getStripe();
            stripe?.redirectToCheckout({sessionId})
             
        }
        catch(error){
            toast.error((error as Error)?.message)
        }finally{
            setPriceIdLoading(undefined);
        }
    }

    let content=(
        <div className="text-center">
            No products available
        </div>
    )

    if(products.length){
        content=(
            <div>
                {products.map((product)=>{
                    if(!product.prices?.length){
                        return (
                            <div key={product.id}>
                                No prices available
                            </div>
                        )
                    }
                    return  product.prices.map((price)=>(
                        <Button key={price.id} 
                        onClick={()=>handleCheckOut(price)}
                        disabled={isLoading || price.id===priceIdLoading}
                        className="mb-4"
                        
                        >
                            {`Subscribe for ${formatPrice(price)} a ${price.interval} `}
                        </Button>
                    ))
                })}
            </div>
        )
    }

    if(subscription){
        content=(
            <div className="text-center">
                Already Subscribed
            </div>
        )
    }


    return <Modal
    title="Only For Premium users"
    description="Listen to music with spotify"
    isOpen={subscribeModal.isOpen}
    onChange={onChange}
    >
        {content}
    </Modal>
}

export default SubscribeModal