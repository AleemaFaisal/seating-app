import {useState} from 'react';

function FormTextInput({label, type})
{
    const [text, setText] = useState('');
    
    return (
        <label>
            {label}
            <input required name={type} type={type} placeholder={'enter ' + label} value={text} onChange={(e) => setText(e.target.value)} />
        </label>
    )
}

export default FormTextInput;