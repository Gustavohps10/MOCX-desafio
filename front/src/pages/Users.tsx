import Header from "../components/Header";
import { Button, Card, Dropdown, Modal } from "flowbite-react/lib/esm/components"
import { HiOutlineExclamationCircle } from "react-icons/hi"
import UserIconImage from "../assets/images/user-icon.jpg"
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {FaUsers} from "react-icons/fa"
import axios, {isCancel, AxiosError} from 'axios';
import { toast, ToastContainer } from "react-toastify";

type User = {
    id: string,
    name: string,
    cpf: string,
    birthDate: Date
}

export default function Users() {
    const [modalVisible, setModalVisible] = useState(false)
    const [users, setUsers] = useState<User[]>([])
    const [userId, setUserId] = useState<string>("")

    useEffect(()=>{
        axios.get('http://localhost:3000/users')
        .then(function (response: any) {
            setUsers(response.data)
        })
        .catch(function (error) {
            // handle error
        console.log(error);
        })
        .finally(function () {
            // always executed
        });
    }, [])
    
    function handleUserSelection(id: string) { 
        setUserId(id)
        setModalVisible(true)
    }

    function handleUserDeleteConfirmation() {
        axios({
            method: 'delete',
            url: 'http://localhost:3000/users/' + userId,
        }).then(function (response) {
            toast.success("Usuário excluido com sucesso", {
                position: toast.POSITION.TOP_CENTER
            })

            setUsers(users.filter((data) => data.id !== userId))
            
        }).catch(function (error) { 
            toast.error("Ocorreu um erro inesperado", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
        })

        setModalVisible(false)
    }

    return (
        <>
            <Header />

            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />

            <h1 className="my-10 text-3xl flex items-center justify-center gap-4 font-bold text-gray-900">
                <FaUsers fill="rgba(17,24,39)"/>
                Usuarios Cadastrados
            </h1>
            
            <div id="users" className="grid grid-cols-5 gap-4 px-20">
                {
                    users.map((user) => {
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
                                                    Editar
                                                </Link>
                                            </Dropdown.Item>
                                            <Dropdown.Item>
                                                <button
                                                    onClick={()=>handleUserSelection(user.id)}
                                                    className="block py-2 px-4 text-sm text-red-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                                                >
                                                    Deletar
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
                                    onClick={handleUserDeleteConfirmation}                               >
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