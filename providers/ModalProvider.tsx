"use client";

import { useEffect, useState } from "react";
import AuthModal from "@/components/AuthModal";
import UploadModal from '@/components/UploadModal';
import SubscribeModal from "@/components/SubscribeModal";
import { ProductsWithPrices } from "@/types";


interface ModalProviderProps{
  products:ProductsWithPrices[]
}
const ModalProvider:React.FC<ModalProviderProps> = ({
  products
}) => {
  const [isMounted, setisMounted] = useState(false);

  useEffect(() => {
    setisMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <AuthModal />
      <UploadModal/>
      <SubscribeModal products={products}/>
      
    </>
  );
};

export default ModalProvider;
