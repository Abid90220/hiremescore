import {Link} from "react-router";
import {assetPath} from "~/lib/utils";

const Navbar = () => {
    return (
        <nav className="navbar">
            <Link to="/" aria-label="HireMeScore home">
                <img
                    src={assetPath("images/hiremescore-logo.png")}
                    alt="HireMeScore"
                    className="h-12 w-auto max-w-[220px] object-contain max-sm:max-w-[170px]"
                />
            </Link>
            <Link to="/upload" className="primary-button w-fit">
                Upload Resume
            </Link>
        </nav>
    )
}
export default Navbar
