import { Button, Card, Label, TextInput } from "flowbite-react/lib/esm/components"
import Header from "../components/Header"
import "../styles/main.css"
import "../styles/datepicker.css"

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/pt-BR';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import TextField from '@mui/material/TextField';

import React, { FormEvent, useState } from "react";
import {FiUserPlus} from "react-icons/fi"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

export default function Home() {
    const [birthDate, setBirthDate] = useState<Dayjs | null>(null);
    const [name, setName] = useState<string>("")
    const [cpf, setCPF] = useState<string>("")

    function handleSubmit(e: FormEvent) {
        e.preventDefault()

        if(!birthDate?.isValid()){
            toast.error('Selecione uma data válida', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
            return
        }
        

        axios({
            method: 'post',
            url: 'http://localhost:3000/users',
            data: {
                name: name,
                cpf: cpf,
                birthDate: birthDate?.toDate().toISOString()
            }
        }).then(function (response) {
            console.log(response.data.error);
            
            toast.success("Usuário cadastrado com sucesso", {
                position: toast.POSITION.TOP_CENTER
            })
        }).catch(function (error) {
            toast.error(error.response.data.error, {
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
                <FiUserPlus fill="rgba(17,24,39)"/>
                Cadastrar Usuário
            </h1>
            <Card className="max-w-lg my-5 right-0 relative mx-auto">
                <form
                    onSubmit={(e)=>handleSubmit(e)}
                    className="flex flex-col gap-4"
                >
                    <div>
                        <div className="mb-2 block">
                            <Label
                                htmlFor="name"
                                value="Nome"
                            />
                        </div>
                        <TextInput
                            id="name"
                            type="text"
                            placeholder="Joãozinho da Silva"
                            shadow={true}
                            value={name}
                            onChange={(e)=>setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label
                                htmlFor="cpf"
                                value="CPF"
                            />
                        </div>
                        <TextInput
                            id="cpf"
                            type="text"
                            placeholder="123.456.789-10"
                            shadow={true}
                            value={cpf}
                            onChange={(e)=>setCPF(e.target.value)}
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label
                                htmlFor="birthDate"
                                value="Data de Nascimento"
                            />
                        </div>
                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
                            <DatePicker
                                value={birthDate}
                                onChange={(newValue) => {
                                    setBirthDate(newValue);
                                }}
                                renderInput={(params) => <TextField id="birthDate" {...params} className="w-full shadow-none rounded-lg bg-gray-50 text-gray-900 custom-datepicker" />}
                                dayOfWeekFormatter={(day) => `${day}.`}
                            />
                        </LocalizationProvider>
                    </div>

                    <Button type="submit">
                        Cadastrar
                    </Button>
                </form>
            </Card>

        </>
    )
}