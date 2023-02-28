import { useRef } from "react";
import { interpretInput } from "../logic/inputInterpretation";
import { useAppDispatch } from "../store/hooks";
import { updateMultiple } from "../store/noteCircleSlice";



export function RequestInput() {
    const dispatch = useAppDispatch()
    const inputVal = useRef(null)
    
    const onFormSubmit = (e: any) => {
        e.preventDefault();
        if (inputVal.current !== null) {
            // const val: string = inputVal.current.value
            // @ts-ignore
            const newNotes = interpretInput(inputVal.current.value)
            dispatch(updateMultiple(newNotes))
        }
      }

    return (

        <form onSubmit={onFormSubmit}>
            <input id='text-input' type='text' ref={inputVal}/>
            {/* <button id='text-submit-button' type="submit">Submit</button> */}
            <input
                type="button"
                value="Focus the text input"
                onClick={onFormSubmit}
            />
        </form>
    )
}

export {}