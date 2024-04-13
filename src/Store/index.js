import { createSlice, configureStore } from "@reduxjs/toolkit";

const token = localStorage.getItem("token");
const userIsLoggedIn = !!token;
const initialAuthState = { isLoggedIn: userIsLoggedIn, token: token };

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
      setTimeout(() => {
        localStorage.removeItem("token");
      }, 5 * 60 * 1000);
    },
    logOut(state) {
      state.isLoggedIn = false;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
});

const initialExpenseState = { expenseCart: [], totalAmount: 0}

const expenseSlice = createSlice({
    name: 'expenses',
    initialState: initialExpenseState,
    reducers: {
        
        addExpense(state, action) {
            // checking if the same id already exist
            const existingExpenseIndex = state.expenseCart.findIndex(
                (expense) => expense.id === action.payload.id
            );

            if (existingExpenseIndex !== -1) {
                // replacing if the same id exist
                state.expenseCart[existingExpenseIndex] = action.payload;
            } else {
                // pushing it in if it doesn't exist.
                state.expenseCart.push(action.payload);
            }
        }, 

        removeExpense(state, action){
            state.expenseCart = state.expenseCart.filter((prev) => prev.id !== action.payload)
            },

        totalExpense(state){
            const grandTotal = state.expenseCart.reduce((acc, curr) => {
                return acc  = Number(acc) + Number(curr.amount)   
            }, 0)
            state.totalAmount = grandTotal;
        }
    }
})

const initialPremiumState = { darkModeToggle: false, darkButtonOpenClose: false, downloadButton: false }

const premiumSlice = createSlice({
        name: 'premium',
        initialState: initialPremiumState,
        reducers: {
            darkModeToggler(state){
                state.darkModeToggle = !state.darkModeToggle
            },
            darkButtonToggler(state){
                state.darkButtonOpenClose = !state.darkButtonOpenClose
            },
            downloadToggler(state){
                state.downloadButton = !state.downloadButton
            }
        }

})


export const expenseActions = expenseSlice.actions;
export const authActions = authSlice.actions;
export const premiumActions = premiumSlice.actions;

const store = configureStore({
  reducer: { auth: authSlice.reducer, expenses: expenseSlice.reducer, premium: premiumSlice.reducer },
});

export default store;