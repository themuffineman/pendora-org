import { useEffect } from 'react';

const StripePricingTable = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://js.stripe.com/v3/pricing-table.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <stripe-pricing-table
      pricing-table-id={process.env.PRICING_TABLE_ID}
      publishable-key={process.env.STRIPE_TABLE_PUBLISHABLE_KEY}
    ></stripe-pricing-table>
  );
};

export default StripePricingTable;
