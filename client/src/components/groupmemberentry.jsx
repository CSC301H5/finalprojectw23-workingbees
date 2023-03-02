import leader from '../Assets/leader.png'

function StatusIndicator({ name, status }) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '10px',
          backgroundColor: '#F6F6F6',
          borderRadius: '8px',
          width: '450px',
          margin: '10px',
        }}
      >
        <div
          style={{
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            backgroundColor: '#FFAF40',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: '10px',
          }}
        >
          <span style={{ fontWeight: 'bold' }}></span>
        </div>
        <div>
          <div style={{ fontWeight: 'bold' }}>{name}
          {status === 'teamleader'? (<img src={leader} alt="teamleader" style={{  display: 'inline-flex',
        alignItems: 'center',  marginLeft: '200px'  }}/>):(
          <span
            style={{
              fontWeight: 'bold',
              color: '#FFAF40',
              marginLeft: '200px', 
            }}
          >
            {status}
          </span>)}
          </div>

        </div>
      </div>
    );
  }
  export default StatusIndicator;
