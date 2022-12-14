import Header from "../components/Header";
import { Button, Card, Dropdown } from "flowbite-react/lib/esm/components"
import UserIconImage from "../assets/images/user-icon.jpg"
import { Link } from "react-router-dom";

export default function Users() {
    const fakeUsers = [
        {id:"838092024609", name: "Name 1", cpf: "23423432422", birthDate: "2004-10-01T00:00:00.000" },
        {id:"831092023409", name: "Name 2", cpf: "23423432426", birthDate: "2004-12-01T00:00:00.000" },
        {id:"034092023450", name: "Name 3", cpf: "23423432427", birthDate: "2004-12-01T00:00:00.000" },
        {id:"434092023409", name: "Name 4", cpf: "23423432428", birthDate: "2004-12-01T00:00:00.000" },
        {id:"334092023409", name: "Name da Silva Sauro", cpf: "23423432422", birthDate: "2004-10-01T00:00:00.000" },
        {id:"734092023409", name: "Name 2", cpf: "23423432426", birthDate: "2004-12-01T00:00:00.000" },
        {id:"839052023409", name: "Name 3", cpf: "23423432427", birthDate: "2004-12-01T00:00:00.000" },
        {id:"83409u023409", name: "Name 4", cpf: "23423432428", birthDate: "2004-12-01T00:00:00.000" }
    ]

    return (
        <>
            <Header />
            <div id="users" className="grid grid-cols-5 gap-4 p-20 m-2">
                {
                    fakeUsers.map((user) => {
                        return (

                            <div key={user.id} className="max-w-sm">
                                <Card className="h-full">
                                    <div className="flex justify-end px-4 pt-4">
                                        <Dropdown
                                            inline={true}
                                            label=""
                                        >
                                            <Dropdown.Item>
                                                <Link
                                                    to={`/users/${user.id}/edit`}
                                                    className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                                                >
                                                    Edit
                                                </Link>
                                            </Dropdown.Item>
                                            <Dropdown.Item>
                                                <a
                                                    href="#"
                                                    className="block py-2 px-4 text-sm text-red-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                                                >
                                                    Delete
                                                </a>
                                            </Dropdown.Item>
                                        </Dropdown>
                                    </div>
                                    <div className="flex flex-col items-center pb-10">
                                        <img
                                            className="mb-3 h-24 w-24 rounded-full shadow-lg"
                                            src={UserIconImage}
                                            alt="Bonnie image"
                                        />
                                        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                                            {user.name}
                                        </h5>
                                        <span className="text-sm text-gray-500 dark:text-gray-400">
                                            {user.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")}
                                        </span>
                                        <span className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                                            { new Date(user.birthDate).toLocaleDateString()}
                                        </span>
                                    
                                    </div>
                                </Card>
                            </div>

                        )
                    })

                }
            </div>
        </>
    )
}