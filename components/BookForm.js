// 'use client';
// import { useState, useRef, useEffect } from 'react';
// import styles from './ContactModal.module.css';

// export default function BookForm() {
//   const [isOpen, setIsOpen] = useState(false);
//   const modalRef = useRef(null);

//   const handleClose = () => setIsOpen(false);

//   // Close modal when clicking outside of it
//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (modalRef.current && !modalRef.current.contains(event.target)) {
//         handleClose();
//       }
//     }

//     if (isOpen) {
//       document.addEventListener('mousedown', handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [isOpen]);

//   return (
//     <>
//       <button className={styles.openButton} onClick={() => setIsOpen(true)}>
//         Contact Us
//       </button>

//       {isOpen && (
//         <div className={styles.modalOverlay}>
//           <div className={styles.modalContent} ref={modalRef}>
//             <button className={styles.closeButton} onClick={handleClose}>
//               &times;
//             </button>
//             <h2>Contact Us</h2>
//             <form className={styles.form}>
//               <label>
//                 Name:
//                 <input type="text" name="name" required />
//               </label>
//               <label>
//                 Email:
//                 <input type="email" name="email" required />
//               </label>
//               <label>
//                 Message:
//                 <textarea name="message" required></textarea>
//               </label>
//               <button type="submit">Send</button>
//             </form>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }