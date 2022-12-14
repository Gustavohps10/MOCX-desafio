import Header from "../components/Header";
import { Button, Card, Dropdown, Modal } from "flowbite-react/lib/esm/components"
import { HiOutlineExclamationCircle } from "react-icons/hi"
import UserIconImage from "../assets/images/user-icon.jpg"
import { Link } from "react-router-dom";
import React, { useState } from "react";

export default function Users() {
    const fakeUsers = [
        { id: "838092024609", name: "Name 1", cpf: "23423432422", birthDate: "2004-10-01T00:00:00.000" },
        { id: "831092023409", name: "Name 2", cpf: "23423432426", birthDate: "2004-12-01T00:00:00.000" },
        { id: "034092023450", name: "Name 3", cpf: "23423432427", birthDate: "2004-12-01T00:00:00.000" },
        { id: "434092023409", name: "Name 4", cpf: "23423432428", birthDate: "2004-12-01T00:00:00.000" },
        { id: "334092023409", name: "Name da Silva Sauro", cpf: "23423432422", birthDate: "2004-10-01T00:00:00.000" },
        { id: "734092023409", name: "Name 2", cpf: "23423432426", birthDate: "2004-12-01T00:00:00.000" },
        { id: "839052023409", name: "Name 3", cpf: "23423432427", birthDate: "2004-12-01T00:00:00.000" },
        { id: "83409u023409", name: "Name 4", cpf: "23423432428", birthDate: "2004-12-01T00:00:00.000" }
    ]

    const [modalVisible, setModalVisible] = useState(false)


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
                                                <button
                                                    onClick={()=>setModalVisible(true)}
                                                    className="block py-2 px-4 text-sm text-red-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                                                >
                                                    Delete
                                                </button>
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
                                            {new Date(user.birthDate).toLocaleDateString()}
                                        </span>

                                    </div>
                                </Card>
                            </div>

                        )
                    })

                }
            </div>
            <React.Fragment>
                <Modal
                    show={modalVisible}
                    size="md"
                    popup={true}
                    
                >
                    <Modal.Body className="pt-6">
                        <div className="text-center">
                            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                Tem certeza que deseja excluir esse usuário?
                            </h3>
                            <div className="flex justify-center gap-4">
                                <Button
                                    color="failure"
                                    onClick={()=>setModalVisible(false)}
                                >
                                    Sim, excluir
                                </Button>
                                <Button
                                    color="gray"
                                    onClick={()=>setModalVisible(false)}
                                >
                                    Não, cancelar
                                </Button>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </React.Fragment>
        </>
    )
}