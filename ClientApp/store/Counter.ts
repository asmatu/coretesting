import { Action, Reducer } from 'redux';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface CounterState {
    count: number;
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.
// Use @typeName and isActionType for type detection that works even after serialization/deserialization.

interface IncrementCountAction { type: 'INCREMENT_COUNT' }
interface IncrementTenCountAction { type: 'INCREMENTTEN_COUNT' }
interface DecrementCountAction { type: 'DECREMENT_COUNT' }
interface DecrementTenCountAction { type: 'DECREMENTTEN_COUNT' }
interface ResetCountAction { type: 'RESET_COUNT' }

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = IncrementCountAction | IncrementTenCountAction | DecrementCountAction | DecrementTenCountAction| ResetCountAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    increment: () => <IncrementCountAction>{ type: 'INCREMENT_COUNT' },
    incrementTen: () => <IncrementTenCountAction>{ type: 'INCREMENTTEN_COUNT' },
    decrement: () => <DecrementCountAction>{ type: 'DECREMENT_COUNT' },
    decrementTen: () => <DecrementTenCountAction>{ type: 'DECREMENTTEN_COUNT' },
    reset: () => <ResetCountAction>{ type: 'RESET_COUNT' }
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

export const reducer: Reducer<CounterState> = (state: CounterState, action: KnownAction) => {
    switch (action.type) {
        case 'INCREMENT_COUNT':
            return { count: state.count + 1 };
        case 'INCREMENTTEN_COUNT':
                return { count: state.count + 10 };
        case 'DECREMENT_COUNT':
            return { count: state.count - 1 };
        case 'DECREMENTTEN_COUNT':
                return { count: state.count - 10 };
        case 'RESET_COUNT':
            return { count: 0 };
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
    }

    // For unrecognized actions (or in cases where actions have no effect), must return the existing state
    //  (or default initial state if none was supplied)
    return state || { count: 0 };
};
