import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Header
function Header() {

    const tabs = ["home", "blog", "service", "about"];
    let key = 0;

    return (
        <header>
            <div className="wrapper d-flex flex-wrap justify-content-between w-100 p-3 item-center">
                <div className='logo w-2'>
                    <a href="#">
                        <FontAwesomeIcon icon={faHouse} />
                    </a>
                </div>

                <div className='logo w-2'>
                    <a href="#">
                        <FontAwesomeIcon icon={faUser} />
                    </a>
                    <span className="emp-title ps-3">
                        employee management
                    </span>
                </div>
            </div>
        </header>
    )
}

export default Header;