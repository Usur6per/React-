import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const AppNavbar = () => {
    return (
        <div className="d-flex justify-content-center gap-2 bg-info">

            <Link to={'home'}>
                <Button variant="outline-primary">Home</Button>
            </Link>

            <Link to={'components'}>
                <Button variant="outline-primary">Components</Button>
            </Link>

            <Link to={'animation'}>
                <Button variant="outline-primary">Animation</Button>
            </Link>


            <Link to={'calculator'}>
                <Button variant="outline-primary">Calculator</Button>
            </Link>



        </div>
    );
}

export default AppNavbar;