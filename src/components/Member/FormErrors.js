function FormErrors(props){
    function RenderErrors(){
        let errors= props.errors
        if(Object.keys(errors).length >0){
            return Object.keys(errors).map((key,index) =>{
                return(
                    <li key={index}>{errors[key]}</li>
                )
            })
        }
    }
    return(
        <ul>
            {RenderErrors()}
        </ul>
    )
}
export default FormErrors