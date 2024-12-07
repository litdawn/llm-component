//@ts-ignore
import React, {useState} from "react";

interface inlineInputProps {

}


const InlineInput: React.FC = (props: inlineInputProps) => {
    const [flat, setFlat] = useState(false)
    const littleInput: React.FC = (props:inlineInputProps) => {
        return (
            <>
            </>
        )
    }
    const completeInput: React.FC = (props:inlineInputProps) => {
        return (
            <></>
        )
    }
    return (
        <>
            {
                flat ?
                    littleInput(props) :
                    completeInput(props)
            }
        </>
    );
};

export default InlineInput;