import { DISHES } from '../Model/dishes';
import { COMMENTS } from '../Model/comments';
import { PROMOTIONS } from '../Model/promotions';
import { LEADERS } from '../Model/leaders';

export const initialState = {
    dishes: DISHES,
    comments: COMMENTS,
    promotions: PROMOTIONS,
    leaders: LEADERS
};

export const Reducer = (state = initialState, action) => {
    return state;
};