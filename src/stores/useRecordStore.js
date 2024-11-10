import { create } from "zustand";

const useRecordStore = create((set) => ({
  records: [],
  addRecord: (record) =>
    set((state) => ({ records: [...state.records, record] })),
  removeRecord: (id) =>
    set((state) => ({
      records: state.records.filter((record) => record.id !== id),
    })),
  changeQuantity: (id, quantity) =>
    set((state) => ({
      records: state.records.map((record) =>{
        if (record.product.id === id) {
          const newQuantity = parseInt(record.quantity) + parseInt(quantity);
          const newCost = newQuantity * record.product.price;
          return { ...record, quantity: newQuantity, cost: newCost };
          
        }
        return record;
      }
        
      ),
    })),
  resetRecords: () => set({ records: [] }),
}));

export default useRecordStore;
