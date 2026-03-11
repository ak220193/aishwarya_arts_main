
export const downloadCSV = (data) => {
  const headers = ["S.No,Patron,Email,OrderID,Artwork,Amount,Status,Date\n"];
  const rows = data.map(item => 
    `${item.sNo},"${item.name}",${item.email},${item.orderId},"${item.artwork}",${item.amount.replace('₹', '')},${item.paymentStatus},${item.date}`
  );
  
  const blob = new Blob([headers + rows.join("\n")], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.setAttribute("href", url);
  a.setAttribute("download", `Aishwarya_Arts_Sales_${new Date().toLocaleDateString()}.csv`);
  a.click();
};

// Function to handle Printing
export const handlePrint = () => {
  window.print();
};

// API Bridge for Deleting a Record
export const deleteOrder = async (orderId) => {
  if (confirm("Are you sure you want to remove this transaction record?")) {
    const res = await fetch(`/api/admin/sales/${orderId}`, { method: 'DELETE' });
    return res.ok;
  }
  return false;
};