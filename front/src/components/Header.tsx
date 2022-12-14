import { Navbar } from "flowbite-react";
import { Button } from "flowbite-react/lib/esm/components";
import { Link } from "react-router-dom";

export default function Header() {
    return (
        <Navbar
            fluid={true}
            rounded={true}
            className="border-b-2 border-gray-100"
        >
            <Navbar.Brand href="https://flowbite.com/">
                <img
                    src="https://flowbite.com/docs/images/logo.svg"
                    className="mr-3 h-6 sm:h-9"
                    alt="Flowbite Logo"
                />
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                    MOCX Desafio
                </span>
            </Navbar.Brand>
            <div className="flex md:order-2">
                <Button>
                    Button
                </Button>
                <Navbar.Toggle />
            </div>
            <Navbar.Collapse>
                <Link
                    to="/"
                    className="text-base"
                >
                    Cadastro
                </Link>
                <Link 
                    to="/users"
                    className="text-base"
                >
                    Usuários
                </Link>  
            </Navbar.Collapse>
        </Navbar>
    )
}