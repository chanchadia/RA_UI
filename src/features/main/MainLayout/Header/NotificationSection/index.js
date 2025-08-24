// Css Imports
import HeaderCss from '../Header.module.css';

// assets
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

// ==============================|| NOTIFICATION ||============================== //

const NotificationSection = () => {
    return (
        <div className={HeaderCss.HeaderContainer}>
            <span className={HeaderCss.NotifiContainer}>
                <NotificationsNoneIcon />
                <span className={HeaderCss.Notific}>19</span>
            </span>
            <span className={HeaderCss.Bar}></span>
        </div>
    );
};

export default NotificationSection;
