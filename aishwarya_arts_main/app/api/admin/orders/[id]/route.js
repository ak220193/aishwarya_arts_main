export async function PATCH(req, { params }) {
  const { id } = params;
  const { status } = await req.json(); // e.g., "Shipped"

  await connectDB();
  const updatedOrder = await Order.findByIdAndUpdate(id, { status }, { new: true });
  
  return NextResponse.json(updatedOrder);
}