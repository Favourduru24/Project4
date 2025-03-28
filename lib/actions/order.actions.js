"use server"

import Stripe from 'stripe';
import { redirect } from 'next/navigation';
import { handleError } from '../utils';
import { connectToDatabase } from '../database';
import Order from '../database/models/order.model';
import Event from '../database/models/event.model';
import User from '../database/models/user.model';
import {ObjectId} from 'mongodb';

export const checkoutOrder = async (order) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  const price = order.isFree ? 0 : Number(order.price) * 100;

  try {
    const session = await stripe.checkout.sessions.create({
       line_items: [
        {
          price_data: {
            currency: 'usd',
            unit_amount: price,
            product_data: {
              name: order.eventTitle
            }
          },
          quantity: 1
        },
      ],
      metadata: {
        eventId: order.eventId,
        buyerId: order.buyerId,
      },
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/profile`,
      cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
    });

    redirect(session.url)
  } catch (error) {
    throw error;
  }
}

export const createOrder = async (order) => {
  try {
    await connectToDatabase()
    
    const newOrder = await Order.create({
       ...order,
       event:order.eventId,
       buyer: order.buyerId
    })

     return JSON.parse(JSON.stringify(newOrder))
  } catch (error) {
     handleError(error)
  }
}

export async function getOrdersByEvent({ searchString, eventId }) {
  try {
    await connectToDatabase()

    if (!eventId) throw new Error('Event ID is required')

    const orders = await Order.find({ event: eventId })
      .populate({
        path: 'buyer',
        select: 'username ',
      })
      .populate({
        path: 'event',
        select: 'title',
      })
      .select('totalAmount createdAt buyer event')
      .lean()

    // Format response
    const filteredOrders = orders
      .map((order) => ({
        _id: order._id,
        totalAmount: order.totalAmount,
        createdAt: order.createdAt,
        eventTitle: order.event?.title,
        eventId: order.event?._id,
        buyer: `${order.buyer?.username}`,
      }))
      .filter((order) =>
        new RegExp(searchString, 'i').test(order.buyer)
      )

    return filteredOrders
  } catch (error) {
    handleError(error)
  }
}
export async function getOrdersByUser({ userId, limit = 3, page }) {
  try {
    await connectToDatabase()

    const skipAmount = (Number(page) - 1) * limit
    const conditions = { buyer: userId }

    const orders = await Order.distinct('event._id')
      .find(conditions)
      .sort({ createdAt: 'desc' })
      .skip(skipAmount)
      .limit(limit)
      .populate({
        path: 'event',
        model: Event,
        populate: {
          path: 'organizer',
          model: User,
          select: '_id firstName lastName',
        },
      })

    const ordersCount = await Order.distinct('event._id').countDocuments(conditions)

    return { data: JSON.parse(JSON.stringify(orders)), totalPages: Math.ceil(ordersCount / limit) }
  } catch (error) {
    handleError(error)
  }
}