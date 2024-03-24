import { Request, Response } from 'express';
import Stripe from 'stripe';
import dotenv from "dotenv";

dotenv.config()
const stripe = new Stripe(`${process.env.STRIPE_PK_KEY}`);

export const createCheckoutSession = async (req: Request, res: Response) => {
    try {
      const { items } = req.body;
  
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: items,
        mode: 'payment',
        success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/cancel`,
      });
  
      res.json({ id: session.id });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };