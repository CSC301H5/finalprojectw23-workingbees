import "./Style.css"

// ["option1", "option3"] take array as input  
function DisplayMultiselect(props) {

    function Display(props) {
        return (
            <div class="display" style={{ position: 'relative', fontSize: '22px', color: '#FFAF40 ', margin: '20px' }}>
                {props.item}
            </div>
        )
    }

    function Multiselect() {
        const displayComponents = props.array.map((item) => <Display item={item} />);
        return <div>{displayComponents}</div>;
    }

    return (
        <div >
            <h1 className="text" style={{ fontSize: '22px' }}> {props.question} </h1>
            <div >
                <Multiselect />
            </div>
        </div>
    )
}

export default DisplayMultiselect