// SIDEBAR
import icon1 from '../Assets/IconAndLogo/01 2.png'
import icon2 from '../Assets/IconAndLogo/uil_analytics.png'
import icon3 from '../Assets/IconAndLogo/tabler_user-cog.png'
import icon4 from '../Assets/IconAndLogo/Group 2.png'
import icon5 from '../Assets/IconAndLogo/tabler_logout 2.png'
import cross from '../Assets/IconAndLogo/Plus.png'
import UserImg from '../Assets/IconAndLogo/Pic.png'
import FacilityLogo from '../Assets/IconAndLogo/Pic copy.png'
// PARTNERS
import partner1 from '../Assets/ActivitiesForm/Hexa Logo.png'
import partner2 from '../Assets/ActivitiesForm/Tech Logo.png'
import partner3 from '../Assets/ActivitiesForm/Real Estate Logo.png'
import partner4 from '../Assets/ActivitiesForm/Real Estate Logo (1).png'
import partner5 from '../Assets/ActivitiesForm/Real Estate Logo (2).png'
// SOCIAL
import social1 from '../Assets/IconAndLogo/Negative copy 2.png'
import social2 from '../Assets/IconAndLogo/Negative copy.png'
import social3 from '../Assets/IconAndLogo/Negative.png'
import social4 from '../Assets/IconAndLogo/Negative copy 4.png'
//REPORT
import Edit from '../Assets/IconAndLogo/tabler_upload.png'
import Profile from '../Assets/IconAndLogo/carbon_data-view.png'
import Share from '../Assets/IconAndLogo/game-icons_share.png'
import Confirm from '../Assets/IconAndLogo/line-md_confirm-circle.png'
import Upload from '../Assets/IconAndLogo/tabler_upload.png'


const SidebarIcon = {
    "FacilityLogo": FacilityLogo,
    "icon1": icon1,
    "icon2": icon2,
    "icon3": icon3,
    "icon4": icon4,
    "icon5": icon5,
    "UserImg": UserImg,
    "cross": cross,
}

const PartnersImg = {
    "partner1": partner1,
    "partner2": partner2,
    "partner3": partner3,
    "partner4": partner4,
    "partner5": partner5
}

const SocialIcon = {
    "social1": social1,
    "social2": social2,
    "social3": social3,
    "social4": social4,
}


const ReportIcon = {
    "edit": Edit,
    "profile": Profile,
    "share": Share,
    "confirm": Confirm,
    "upload": Upload,
}

const BASE_URL = "https://api.cloudequipment.io"

const Debounce = (func, delay) => {
    let timeoutId;
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };



export { SidebarIcon, PartnersImg, SocialIcon, ReportIcon, BASE_URL, Debounce }