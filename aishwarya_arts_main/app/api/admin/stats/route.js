export async function GET() {
  await connectDB();
  const [productCount, orderCount, customerCount, totalSales] = await Promise.all([
    Product.countDocuments(),
    Order.countDocuments(),
    User.countDocuments({ role: "user" }),
    Order.aggregate([{ $group: { _id: null, total: { $sum: "$totalAmount" } } }])
  ]);

  return NextResponse.json({
    products: productCount,
    orders: orderCount,
    customers: customerCount,
    revenue: totalSales[0]?.total || 0
  });
}