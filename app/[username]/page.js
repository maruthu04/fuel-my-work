import React from 'react'
import PaymentPage from '@/components/Paymentpage';

const Username = async ({ params }) => {
  const { username } = await params;  
  return (
   <PaymentPage username={username} />
  )
}

export default Username