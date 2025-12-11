import Order from "../model/order.model.js";
import Product from "../model/product.model.js";
import ErrorHandler from "../utils/errorHandler.js";
import SuccessHandler from "../utils/successHandler.js";

export const orderController = async (req, res, next) => {
    try {
        const { orderItems, shippingAddress } = req.body
        const userId = req.user._id// Get user ID from auth middleware

        // Validate orderItems
        if (!orderItems || orderItems.length === 0) {
            return next(new ErrorHandler('No order items provided', 400))
        }

        // Validate shippingAddress
        if (!shippingAddress || !shippingAddress.address || !shippingAddress.city ||
            !shippingAddress.postalCode || !shippingAddress.country) {
            return next(new ErrorHandler('Complete shipping address is required', 400))
        }

        let totalPrice = 0 // Changed from totalCost to totalPrice
        const processedOrderItems = []

        for (let item of orderItems) {
            if (!item.productId || !item.quantity) {
                return next(new ErrorHandler('Each item must have productId and quantity', 400))
            }

            const product = await Product.findById(item.productId)

            if (!product) {
                return next(new ErrorHandler(`Product not found: ${item.productId}`, 404))
            }

            if (product.stock < item.quantity) {
                return next(new ErrorHandler(
                    `Insufficient stock for ${product.productName}. Available: ${product.stock}`,
                    400
                ))
            }

            // Calculate price
            const itemTotal = product.price * item.quantity
            totalPrice += itemTotal

            processedOrderItems.push({
                product: product._id,
                name: product.productName,
                quantity: item.quantity,
                price: product.price,
                image: product.productImages?.[0] || ''
            })

            product.stock -= item.quantity
            product.isAvailable = product.stock > 0
            await product.save()
        }

        const newOrder = await Order.create({
            user: userId,
            orderItems: processedOrderItems,
            shippingAddress,
            totalPrice,
            orderStatus: 'pending'
        })

        await newOrder.populate('user', 'fullName email -_id')
        await newOrder.populate('orderItems.product', 'productName -_id')

        return res
            .status(201)
            .json(new SuccessHandler('Order created successfully', newOrder))

    } catch (error) {
        next(error)
    }
}