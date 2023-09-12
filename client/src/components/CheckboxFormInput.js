function CheckboxFormInput ({id, value, className, handleClick, label})
{
    return (
        <>
        <input type="checkbox" id={id} value={value} className={className} onClick={(e) => handleClick(e.target.value, e.target.checked)} />
        <label for={id}>{label}</label>
        </>
    );
}

export default CheckboxFormInput;