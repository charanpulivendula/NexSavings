export default addCouponsToFirestore = async (mergedData) => {
    try {
  
      // Loop through each student in the gradebook
        Object.keys(mergedData).forEach(async (coupon) => {
          const couponData = mergedData[coupon];
  
          // Use addDoc to add each student to the 'students' collection
          await addDoc(collection(db, 'coupons'), couponData);
        });
  
  
        console.log('Students added to Firestore successfully!');
      } catch (error) {
        console.error('Error adding students to Firestore:', error);
      }
    };