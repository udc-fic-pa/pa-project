import {useNavigate} from 'react-router-dom';
import {FormattedMessage} from 'react-intl';

const BackLink = () => {

    const navigate = useNavigate();
    
    return (

        <button type="button" className="btn btn-link" 
            onClick={() => navigate(-1)}>

            <FormattedMessage id='project.global.buttons.back'/>

        </button>

    );

};

export default BackLink;
