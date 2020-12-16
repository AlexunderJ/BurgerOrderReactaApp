import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSucces = (id,orderData) =>{
    return{
        type: actionTypes.PURCHASE_BURGER_SUCCES,
        orderId: id,
        orderData: orderData
    };
};

export const purchaseBurgerFail = (error) =>{
    return{
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
};
};

export const purchaseBurgerStart = ()=>{
    return{
        type: actionTypes.PURCHACSE_BURGER_START
    };
};

export const purchaseBurger = (orderData,token) =>{
    return dispatch => {
        purchaseBurgerStart();
            axios.post('/orders.json?auth=' + token, orderData)
    .then(response => {
        dispatch(purchaseBurgerSucces(response.data.name, orderData))
    })
   .catch(error =>{
       dispatch(purchaseBurgerFail(error)) ;
   })
};
    };

    export const purchaseInit = () =>{
        return{
            type: actionTypes.PURCHASE_INIT
        }
    }

    export const fetchOrdersSucces = (orders) =>{
        return{
            type: actionTypes.FETCH_ORDERS_SUCCES,
            orders: orders
        }
    };

    export const fetchOrdersFail =(error) =>{
        return{
            type: actionTypes.FETCH_ORDERS_FAIL,
            error: error
        }
    };

    export const fetchOrdersStart = () =>{
        return{
            type: actionTypes.FETCH_ORDERS_START
        }
    };

    export const fetchOrders = (token) =>{
        return dispatch =>{
            dispatch(fetchOrdersStart());
            axios.get('/orders.json?auth=' + token)
            .then(res=>{
                const fechedOrders=[];
                for(let key in res.data){
                    fechedOrders.push({
                        ...res.data[key],
                        id:key
                    });
                }
                dispatch(fetchOrdersSucces(fechedOrders));
            })
            .catch(err=>{
                dispatch(fetchOrdersFail(err));
            })
        }
    }

