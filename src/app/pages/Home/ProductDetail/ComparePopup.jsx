// import { useState } from "react";

// export default function ComparePopup({ products, onClose }) {
//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl h-full overflow-auto relative">
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 bg-gray-200 px-3 py-1 rounded"
//         >
//           Đóng
//         </button>
//         <h2 className="text-xl font-bold mb-4">So sánh sản phẩm</h2>
//         <div className="grid grid-cols-2 gap-4">
//           {products.map((product, index) => (
//             <div key={index} className="border p-4 rounded">
//               <h3 className="text-lg font-semibold">{product.name}</h3>
//               <p><strong>Giá:</strong> {product.price}</p>
//               <p><strong>Mô tả:</strong> {product.description}</p>
//               <p><strong>Danh mục:</strong> {product.category}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export function CompareButton({ selectedProducts }) {
//   const [isPopupOpen, setPopupOpen] = useState(false);

//   return (
//     <div>
//       <button
//         onClick={() => setPopupOpen(true)}
//         className="bg-blue-500 text-white px-4 py-2 rounded"
//       >
//         Chọn để so sánh
//       </button>
//       {isPopupOpen && (
//         <ComparePopup
//           products={selectedProducts}
//           onClose={() => setPopupOpen(false)}
//         />
//       )}
//     </div>
//   );
// }
