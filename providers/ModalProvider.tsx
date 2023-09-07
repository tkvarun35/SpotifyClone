"use client";

import { useEffect, useState } from "react";
import AuthModal from "@/components/AuthModal";
const ModalProvider = () => {
  const [isMounted, setisMounted] = useState(false);

  useEffect(() => {
    setisMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <AuthModal />
    </>
  );
};

export default ModalProvider;
