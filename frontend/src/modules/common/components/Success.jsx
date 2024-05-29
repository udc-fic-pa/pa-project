const Success = ({message, onClose}) => message && (
    <div className="alert alert-success alert-dismissible fade show" role="alert">
        {message}
        <button type="button" className="close" data-dismiss="alert" aria-label="Close" 
            onClick={() => onClose()}>
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
);

export default Success;
