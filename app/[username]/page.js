import React from 'react'
// import { useRouter } from 'next/navigation';
// import { useParams } from 'next/navigation';
import PaymentPage from '@/components/Paymentpage';

const Username = async ({ params }) => {
  const { username } = await params;  
  return (
   <PaymentPage username={username} />
  )
}

export default Username