import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const [message, setMessage] = useState('Processing payment...');

    useEffect(() => {
        if (!sessionId) {
            return;
        }

        const updatePayment = async () => {
            try {
                const res = await fetch(`http://localhost:3000/payment-success?session_id=${sessionId}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                });

                const text = await res.text();
                let data = null;

                if (text) {
                    data = JSON.parse(text);
                }

                console.log(data);
                setMessage('Payment processed successfully!');
            } catch (err) {
                console.error(err);
                setMessage('Payment failed. Please try again.');
            }
        };

        updatePayment();
    }, [sessionId]);

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h2>{message}</h2>
        </div>
    );
};

export default PaymentSuccess;
