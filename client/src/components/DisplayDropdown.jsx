import "../styles/Style.css"

// "BANANA!!!" take string as input  
function DisplayDropDown(props) {

    function Display(props) {
        return (
            <div class="display" style={{ position: 'relative', fontSize: '22px', color: '#FFAF40', margin: '20px' }}>
                {props.item}
            </div>
        )
    }

    function DropDown() {
        const displayComponents = props.array.map((item) => <Display item={item} />);
        return <div>{displayComponents}</div>;
    }

    return (
        <div style={{ paddingLeft: '50px' }}>
            <h1 className="text" style={{ fontSize: '22px' }}>  {props.title}</h1>
            <div >
                <Display item={props.array} />
            </div>
        </div>
    )
}

export default DisplayDropDown